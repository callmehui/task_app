<template>
  <div>
    <div class="page_desc">
      <div class="desc">制定新目标</div>
      <div class="sub_desc">
        请根据实际情况制定目标，建议遵循一定的方法，如：<a
          class="link"
          target="_blank"
          href="https://baike.baidu.com/item/SMART%E5%8E%9F%E5%88%99/8575850?fr=aladdin"
          >smart原则</a
        >等。
      </div>
    </div>
    <div class="page_container">
      <el-form
        class="form"
        ref="formRef"
        :model="targetfForm"
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="目标名称" prop="name" :rules="formRules.name">
          <el-input
            v-model="targetfForm.name"
            placeholder="请输入目标的简短描述(15字以内)"
          />
        </el-form-item>
        <el-form-item label="目标描述" prop="desc" :rules="formRules.desc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4 }"
            v-model="targetfForm.desc"
            placeholder="请输入目标的具体描述，包括：
1. 我想要实现什么？达成什么？
2. 为什么要实现（原因、动机）？
3. 大概的实现方法？
4. 大概的实现时限？
"
          />
        </el-form-item>
        <el-form-item label="目标时限" required>
          <div class="timing-wrap">
            <el-form-item prop="timingValue" :rules="formRules.timingValue">
              <el-input
                class="timing-value"
                v-model="targetfForm.timingValue"
                type="number"
                placeholder="请输入完成目标的最长时间"
              />
            </el-form-item>
            <el-form-item prop="timingUnit" :rules="formRules.timingUnit">
              <el-select
                class="timing-unit"
                v-model="targetfForm.timingUnit"
                placeholder="请选择"
              >
                <el-option
                  v-for="unit in timingUnits"
                  :key="unit.value"
                  :label="unit.text"
                  :value="unit.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item class="completions-container" label="达成情况" required>
          <div
            class="completions-container"
            v-for="(completion, index) in targetfForm.completions"
            :key="index"
          >
            <Separator :type="transformCompletionType(completion.type)" />
            <div class="completions-wrap">
              <el-form-item
                class="value"
                :prop="`completions[${index}].value`"
                :rules="completionRules.value"
              >
                <el-input
                  class="input"
                  v-model="completion.value"
                  type="number"
                  size="mini"
                  placeholder="达成情况百分比数字"
                />
                <div class="unit">%</div>
              </el-form-item>
              <el-form-item
                class="desc"
                :prop="`completions[${index}].desc`"
                :rules="completionRules.desc"
              >
                <el-input
                  v-model="completion.desc"
                  size="mini"
                  placeholder="达成情况描述"
                />
              </el-form-item>
              <el-form-item
                class="reward-or-punish"
                :prop="`completions[${index}].rewardAndPunishDesc`"
                :rules="completionRules.rewardAndPunishDesc"
              >
                <el-input
                  v-model="completion.rewardAndPunishDesc"
                  size="mini"
                  placeholder="奖惩情况描述(15字以内)"
                />
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="可修改次数"
          prop="modifyTime"
          :rules="formRules.modifyTime"
          required
        >
          <el-input
            v-model="targetfForm.modifyTime"
            placeholder="请输入可修改目标次数(不得超过10)"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :class="{ 'not-allowed': loading }"
            @click="handleSubmit"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { TargetForm, TargetTimingUnit } from "./interface";
import {
  validateTimingValue,
  validateTimingUnit,
  validateModifyTime,
} from "./validator";
import { completionRules } from "./formRules";
import Separator from "./components/separator/index.vue";
import { useStore } from "vuex";
import { UserInfo } from "../../../login/interface";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "new-target",
  components: {
    Separator,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userInfo = store.state.user.userInfo as UserInfo;

    const timingUnits: TargetTimingUnit[] = [
      { text: "年", value: "year" },
      { text: "月", value: "month" },
      { text: "天", value: "day" },
    ];

    /** 表单ref */
    const formRef = ref<any>(null);

    const targetfForm: TargetForm = reactive({
      name: "测试",
      desc: "测试描述",
      timingValue: 30,
      timingUnit: "day",
      completions: [
        {
          type: "reached",
          value: "60",
          desc: "达成目标",
          rewardAndPunishDesc: "基本达成目标",
        },
        {
          type: "overReached",
          value: "80",
          desc: "超额达成目标",
          rewardAndPunishDesc: "超出预期，奖励一百元零花钱",
        },
        {
          type: "unreached",
          value: "40",
          desc: "目标未实现",
          rewardAndPunishDesc: "达成目标率过低，惩罚上交一百元零花钱",
        },
      ],
      modifyTime: 10,
      isShelve: false,
    });

    // 表单校验规则
    const formRules = {
      name: [
        {
          required: true,
          message: "请输入目标名称",
          trigger: ["blur", "change"],
        },
        {
          max: 15,
          message: "目标名称应该在15字以内",
          trigger: ["blur", "change"],
        },
      ],
      desc: [
        {
          required: true,
          message: "请输入目标描述",
          trigger: ["blur", "change"],
        },
      ],
      timingValue: [
        {
          validator: validateTimingValue(formRef),
          trigger: ["blur", "change"],
        },
      ],
      timingUnit: [
        { validator: validateTimingUnit(formRef), trigger: "change" },
      ],
      completions: [],

      modifyTime: [
        {
          validator: validateModifyTime,
          trigger: ["blur", "change"],
        },
      ],
    };

    const transformCompletionType = (type: string) => {
      if (type === "overReached") {
        return "reward";
      } else if (type === "unreached") {
        return "punish";
      }
      return "reached";
    };

    const formSubmit = reactive({
      loading: false,
      handleSubmit: () => {
        formRef.value.validate(async (valid: boolean) => {
          if (valid) {
            if (formSubmit.loading === false) {
              formSubmit.loading = true;
              /** 执行存储新目标的逻辑 */
              const formData = {
                userId: userInfo.id,
                name: targetfForm.name,
                desc: targetfForm.desc,
                timeValue: targetfForm.timingValue,
                timeUnit: targetfForm.timingUnit,
                completions: targetfForm.completions,
                defaultModifyTime: targetfForm.modifyTime,
                isShelve: targetfForm.isShelve,
              };
              const result = await http({
                method: "post",
                url: apis.createTarget,
                data: formData,
              });
              formSubmit.loading = false;
              console.log("result", result);
              result && router.push("/target/targetfocus");
            }
          }
        });
      },
    });

    return {
      formRef,
      targetfForm,
      formRules,
      completionRules,
      timingUnits,
      transformCompletionType,
      ...toRefs(formSubmit),
    };
  },
});
</script>

<style lang="scss" scoped>
.page_desc {
  background-color: #fff;
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 2px;
  .desc {
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
  }
  .sub_desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    .link {
      color: #66b1ff;
      text-decoration: none;
      padding: 0 2px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
.page_container {
  background-color: #fff;
  padding: 24px 16px;
  border-radius: 2px;
  .form {
    max-width: 800px;
    .timing-wrap {
      display: flex;
      align-items: center;
      width: 100%;
      .timing-value {
        width: 240px;
        margin-right: 16px;
      }
      .timing-unit {
        width: 60px;
        border: none;
        :deep() .el-input__inner {
          border: none;
        }
      }
    }
    .completions-container {
      padding-top: 8px;
      .completions-wrap {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 24px;
        .value {
          width: 180px;
          box-sizing: border-box;
          margin-right: 16px;
          display: flex;
          align-items: center;
          :deep() .el-form-item__content {
            display: flex;
            align-items: center;
            .input {
              flex: 1;
              .el-input__inner {
                text-align: center;
              }
            }
            .unit {
              margin-left: 10px;
            }
          }
        }
        .desc {
          margin-right: 16px;
          width: 200px;
          box-sizing: border-box;
        }
        .reward-or-punish {
          flex: 1;
          box-sizing: border-box;
        }
      }
    }
    .not-allowed {
      cursor: not-allowed;
      &:active {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff;
      }
    }
  }
}
</style>
