<template>
  <div class="container">
    <div class="login">
      <div class="banner_box"></div>
      <div class="login_box">
        <div class="login_title">DC Admin</div>
        <div class="login_title_desc">丰富的的页面模板，覆盖大多数典型业务场景</div>
        <div class="login_title_desc">国际化，路由配置，状态管理应有尽有</div>
        <div class="login_form_box">
          <a-form :model="form" layout="vertical">
            <a-form-item field="username">
              <a-input v-model="form.username" placeholder="请输入账号" />
            </a-form-item>
            <a-form-item field="password">
              <a-input v-model="form.password" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item field="verifyCode">
              <div class="verifyCode">
                <a-input style="width: 160px" v-model="form.verifyCode" placeholder="请输入验证码" />
                <VerifyCode :content-height="32" :content-width="100" />
              </div>
            </a-form-item>
            <a-form-item field="remember">
              <div class="remember">
                <a-checkbox v-model="form.remember">记住密码</a-checkbox>
                <div class="forgot-password">忘记密码</div>
              </div>
            </a-form-item>
            <a-form-item>
              <a-button long type="primary">登录</a-button>
            </a-form-item>
          </a-form>
        </div>
        <div class="register">注册账号</div>
        <div class="desc">DC-Admin by 兔子先森</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  username: "admin",
  password: "123456",
  verifyCode: null,
  remember: false
});
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  position: relative;
  .login {
    width: 1000px;
    height: 500px;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    box-shadow: 0 0 8px 1px $color-fill-1;
    .banner_box {
      width: 650px;
      height: 100%;
      background: linear-gradient(45deg, #3d65f9, #ffffff);
    }
    .login_box {
      width: 350px;
      height: 100%;
      box-sizing: border-box;
      padding: 40px 30px 30px 30px;
      position: relative;
      .login_title {
        font-size: $font-size-title-2;
        color: $color-text-1;
        margin-bottom: $margin-text;
      }
      .login_title_desc {
        font-size: $font-size-body-1;
        color: $color-text-3;
      }
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
      .desc {
        color: $color-text-4;
        font-size: $font-size-body-1;
        position: absolute;
        bottom: 30px;
      }
    }
  }
}
</style>
