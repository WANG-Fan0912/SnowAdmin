<template>
  <div>
    <div class="login_form_box">
      <a-form :rules="rules" :model="form" layout="vertical" @submit="onSubmit">
        <a-form-item field="username" :hide-asterisk="true">
          <a-input v-model="form.username" allow-clear placeholder="请输入账号">
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="password" :hide-asterisk="true">
          <a-input-password v-model="form.password" allow-clear placeholder="请输入密码">
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item field="verifyCode" :hide-asterisk="true">
          <div class="verifyCode">
            <a-input style="width: 160px" v-model="form.verifyCode" allow-clear placeholder="请输入验证码" />
            <VerifyCode :content-height="30" :content-width="100" @verify-code-change="verifyCodeChange" />
          </div>
        </a-form-item>
        <a-form-item field="remember">
          <div class="remember">
            <a-checkbox v-model="form.remember">记住密码</a-checkbox>
            <div class="forgot-password">忘记密码</div>
          </div>
        </a-form-item>
        <a-form-item>
          <a-button long type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="register">注册账号</div>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "@/store/modules/user-info";
const router = useRouter();
const form = ref({
  username: "admin",
  password: "123456",
  verifyCode: null,
  remember: false
});
const rules = ref({
  username: [
    {
      required: true,
      message: "请输入账号"
    },
    {
      validator: (value: string, cb: any) => {
        if (value !== verify.value.username) {
          cb("请输入正确的账号");
        } else {
          cb();
        }
      }
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码"
    },
    {
      validator: (value: string, cb: any) => {
        if (value !== verify.value.password) {
          cb("请输入正确的密码");
        } else {
          cb();
        }
      }
    }
  ],
  verifyCode: [
    {
      required: true,
      message: "请输入验证码"
    },
    {
      validator: (value: string, cb: any) => {
        if (value !== verify.value.verifyCode) {
          cb("请输入正确的验证码");
        } else {
          cb();
        }
      }
    }
  ]
});
const verify = ref({
  username: "admin",
  password: "123456",
  verifyCode: ""
});
const verifyCodeChange = (code: string) => (verify.value.verifyCode = code);

const onSubmit = ({ errors }: any) => {
  if (errors) return;
  // 存储用户信息
  let stores = useUserInfoStore();
  let account = {
    username: form.value.username,
    roles: ["admin"]
  };
  stores.setAccount(account);
  stores.setToken("DC-Admin");
  Message.success("登录成功");
  router.replace("/home");
};
</script>

<style lang="scss" scoped>
.login_form_box {
  margin-top: 28px;
  .verifyCode {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .remember {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .forgot-password {
      color: $color-primary;
      cursor: pointer;
    }
  }
}
.register {
  text-align: center;
  color: $color-text-3;
  font-size: $font-size-body-1;
  cursor: pointer;
}
</style>
