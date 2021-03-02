<template>
  <el-row class="container">
    <el-col :xs="24" :sm="24" :md="11" :lg="14" :xl="14"></el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="9" :xl="9">
      <el-form
        class="form"
        ref="formRef"
        :model="formValue"
        :rules="formRules"
        @keyup.enter="handleLogin"
      >
        <div class="form-title">
          用户登录
        </div>
        <el-form-item prop="account">
          <el-input
            v-model="account"
            placeholder="请输入登录账号（手机号）"
            type="text"
          >
            <template #prefix>
              <i class="el-input__icon iconfont icon-mobile"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="password"
            placeholder="请输入登录密码"
            type="password"
          >
            <template #prefix>
              <i class="el-input__icon iconfont icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit-btn"
            :class="{ 'not-allowed': loading }"
            type="primary"
            @click="handleLogin"
            >登录</el-button
          >
        </el-form-item>
        <router-link class="link" to="/register">注册</router-link>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { apis } from "@/api";
import { md5 } from "@/common/js/hooks/useMd5";
import { http } from "@/common/js/http";
import { validateMobile } from "@/common/js/validator";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserLogin } from "./interface";

export default defineComponent({
  name: "login",
  setup() {
    const router = useRouter();
    const store = useStore();

    /** 表单ref */
    const formRef = ref<any>(null);

    /** 表单元素 */
    const formValue = reactive({
      account: "",
      password: "",
    });

    /** 自定义手机号校验规则 */
    const validatePhone = (
      _rule: any,
      value: any,
      callback: (error: string | string[] | void | Error) => void
    ) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!validateMobile(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };

    /** 表单校验规则 */
    const formRules = {
      account: [{ validator: validatePhone, trigger: "blur" }],
      password: [
        { required: true, message: "请输入登录密码", trigger: "blur" },
      ],
    };

    /** 表单提交处理逻辑 */
    const formSubmit = reactive({
      loading: false,
      handleLogin: () => {
        formRef.value?.validate(async (valid: boolean) => {
          if (valid) {
            if (formSubmit.loading === false) {
              formSubmit.loading = true;
              /** 执行登录逻辑 */
              const result = await http<UserLogin>({
                method: "post",
                url: apis.login,
                data: {
                  account: formValue.account,
                  password: md5(formValue.password),
                },
              });
              formSubmit.loading = false;
              if (typeof result !== "boolean") {
                store.commit("user/setUserInfo", result.userInfo);
                store.commit("token/setToken", result.token);
              }
              result && router.push("/home");
            }
          }
        });
      },
    });

    return {
      formRef,
      ...toRefs(formValue),
      formValue,
      formRules,
      ...toRefs(formSubmit),
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  background: url(./image/login-bg.png) 0 0 no-repeat;
  background-size: cover;
  height: 100vh;
}
.form {
  max-width: 100%;
  padding: 4.5vh;
  margin: calc(50vh - 190px) 5vw 5vw;
  overflow: hidden;
  background-color: #fff;
  border-radius: 4px;
  .form-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #409eff;
    margin-bottom: 1.5rem;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #409eff;
  }
  :deep() .el-input__prefix {
    width: 30px;
    left: 0;
  }
  .submit-btn {
    width: 100%;
  }
  .not-allowed {
    cursor: not-allowed;
    &:active {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
  }
  .link {
    color: #409eff;
    text-align: left;
    display: block;
    text-decoration: none;
  }
}
</style>
