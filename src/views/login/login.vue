<template>
  <div class="container">
    <div class="logo_box">
      <img :src="myImage" alt="logo" class="logo margin-right-text" />
      DC Admin
    </div>
    <div class="banner">
      <a-carousel
        :style="{
          width: '100%',
          height: '100%'
        }"
        :default-current="2"
        :auto-play="true"
        animation-name="fade"
        indicator-type="dot"
        show-arrow="hover"
        class="banner_box"
      >
        <a-carousel-item v-for="item in banner" :key="item.id">
          <div class="banner_inner"></div>
        </a-carousel-item>
      </a-carousel>
    </div>
    <div class="login">登录</div>
  </div>
</template>

<script setup lang="ts">
import myImage from "@/assets/img/my-image.jpg";
const banner = ref([
  {
    id: 1,
    title: "开箱即用的高质量模板",
    desc: "丰富的的页面模板，覆盖大多数典型业务场景",
    src: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp"
  },
  {
    id: 2,
    title: "内置了常见问题的解决方案",
    desc: "国际化，路由配置，状态管理应有尽有",
    src: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp"
  },
  {
    id: 3,
    title: "接入可视化增强工具",
    desc: "实现灵活的区块式开发",
    src: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp"
  }
]);
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  position: relative;
  .banner {
    width: 550px;
    height: 100%;
    background: #eee;
    .banner_box {
      height: 100%;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
      .banner_inner {
        height: 100%;
      }
    }
  }
  .login {
    width: 100%;
    height: 100%;
  }
}
.logo_box {
  position: absolute;
  left: $margin;
  top: $margin;
  margin: $margin;
  color: #fff;
  font-size: $font-size-title-2;
  display: flex;
  align-items: center;
  z-index: 1000;
  .logo {
    width: 50px;
    border-radius: 50%;
  }
}
</style>
