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
            <VerifyCode :content-height="30" :font-size-max="30" :content-width="110" @verify-code-change="verifyCodeChange" />
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
import { useRouter } from "vue-router";
import { useUserInfoStore } from "@/store/modules/user-info";
import { loginAPI, getUserInfoAPI } from "@/api/modules/user/index";
import { useRoutesConfigStore } from "@/store/modules/route-config";
import { useSystemStore } from "@/store/modules/system";
const routeStore = useRoutesConfigStore();
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
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码"
    }
  ],
  verifyCode: [
    {
      required: true,
      message: "请输入验证码"
    },
    {
      validator: (value: string, cb: any) => {
        if (value !== verifyCode.value) {
          cb("请输入正确的验证码");
        } else {
          cb();
        }
      }
    }
  ]
});
const verifyCode = ref("");
const verifyCodeChange = (code: string) => (verifyCode.value = code);

const onSubmit = async ({ errors }: any) => {
  if (errors) return;
  // 登录
  let res = await loginAPI(form.value);
  let stores = useUserInfoStore();
  await stores.setToken(res.data.token);
  let account = await getUserInfoAPI();
  stores.setAccount(account.data); // 存储用户信息
  arcoMessage("success", "登录成功");
  // 设置字典
  let system = useSystemStore();
  system.setDictData();
  // 加载路由信息
  await routeStore.initSetRouter();
  router.replace("/home");
};
</script>

<style lang="scss" scoped>
.login_form_box {
  margin-top: 28px;
  .verifyCode {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .remember {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .forgot-password {
      color: $color-primary;
      cursor: pointer;
    }
  }
}
.register {
  font-size: $font-size-body-1;
  color: $color-text-3;
  text-align: center;
  cursor: pointer;
}
</style>
