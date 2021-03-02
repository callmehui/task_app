<template>
  <el-row class="container">
    <el-col :xs="24" :sm="24" :md="11" :lg="14" :xl="14"></el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="9" :xl="9">
      <el-form
        class="form"
        :model="formValue"
        :rules="formRules"
        ref="formRef"
        @keyup.enter="handleLogin"
      >
        <div class="form-title">
          用户注册
        </div>
        <el-form-item prop="nickname">
          <el-input v-model="nickname" placeholder="请输入用户昵称" type="text">
            <template #prefix>
              <i class="el-input__icon iconfont icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
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
            placeholder="请输入登陆密码"
            type="password"
          >
            <template #prefix>
              <i class="el-input__icon iconfont icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input
            v-model="rePassword"
            placeholder="请确认密码后，再次输入"
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
            >注册</el-button
          >
        </el-form-item>
        <router-link class="link" to="/login">登录</router-link>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { validateMobile } from "@/common/js/validator";
import { http } from "@/common/js/http";
import { apis } from "@/api";
import { useRouter } from "vue-router";
import { md5 } from "@/common/js/hooks/useMd5";

export default defineComponent({
  name: "register",
  setup() {
    const router = useRouter();

    /** 表单ref */
    const formRef = ref<any>(null);

    /** 表单元素 */
    const formValue = reactive({
      nickname: "",
      account: "",
      password: "",
      rePassword: "",
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

    /** 自定义校验器：校验密码 */
    const validatePass = (
      _rule: any,
      value: any,
      callback: (error: string | string[] | void | Error) => void
    ) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (formValue.rePassword !== "") {
          formRef.value?.validateField("rePassword");
        }
        callback();
      }
    };

    /** 自定义校验器：校验验证密码 */
    const validateRePass = (
      _rule: any,
      value: any,
      callback: (error: string | string[] | void | Error) => void
    ) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== formValue.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    /** 表单校验规则 */
    const formRules = reactive({
      nickname: [
        { required: true, message: "请输入用户昵称", trigger: "blur" },
        {
          min: 2,
          max: 10,
          message: "用户昵称长度在 2 到 10 个字符",
          trigger: "blur",
        },
      ],
      account: [{ validator: validatePhone, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      rePassword: [{ validator: validateRePass, trigger: "blur" }],
    });

    /** 表单提交处理逻辑 */
    const formSubmit = reactive({
      loading: false,
      handleLogin: () => {
        formRef.value?.validate(async (valid: boolean) => {
          if (valid) {
            if (formSubmit.loading === false) {
              formSubmit.loading = true;
              /** 执行注册逻辑 */
              const result = await http({
                method: "post",
                url: apis.register,
                data: {
                  nickname: formValue.nickname,
                  account: formValue.account,
                  password: md5(formValue.password),
                },
              });
              formSubmit.loading = false;
              result && router.push("/login");
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
