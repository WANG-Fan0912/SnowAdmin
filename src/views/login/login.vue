<template>
  <div class="container">
    <div class="login">
      <LoginBanner />
      <div class="login_box">
        <div class="login_title">Welcome Back</div>
        <div class="login_title_desc">国际化，路由配置，状态管理应有尽有</div>
        <div class="login_title_desc">丰富的的页面模板，覆盖大多数典型业务场景</div>
        <LoginForm />
        <div class="author">by 兔子先森</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginBanner from "@/views/login/components/login-banner.vue";
import LoginForm from "@/views/login/components/login-form.vue";
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  position: relative;
  overflow: hidden;
  .login {
    width: 1000px;
    height: 500px;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    box-shadow: 0 0 8px 1px $color-fill-2;

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
      .author {
        color: $color-text-4;
        font-size: $font-size-body-1;
        position: absolute;
        bottom: 30px;
      }
    }
  }
}
</style>
