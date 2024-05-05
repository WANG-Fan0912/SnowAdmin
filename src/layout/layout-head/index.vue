<template>
  <a-layout class="layout">
    <a-layout>
      <a-layout-header class="header">
        <div class="header_left">
          <div class="logo_head">
            <img :src="Logo" class="logo" />
            <span class="logo_title">dc admin</span>
          </div>
          <HeadMenu />
        </div>
        <HeaderRight />
      </a-layout-header>
      <Main />
      <Footer v-if="isFooter" />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Logo from "@/assets/img/logo.jpg";
import HeadMenu from "@/layout/components/head-menu/index.vue";
import HeaderRight from "@/layout/components/Header/components/header-right/index.vue";
import Main from "@/layout/components/Main/index.vue";
import Footer from "@/layout/components/Footer/index.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
const themeStore = useThemeConfig();
defineOptions({ name: "LayoutHead" });
let { isFooter } = storeToRefs(themeStore);
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}
.header {
  height: 60px;
  padding: 0 $padding;
  box-sizing: border-box;
  border-bottom: $border-1 solid $color-border-2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 头部
  .logo_head {
    min-width: 150px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .logo {
      width: 30px;
    }
    .logo_title {
      font-weight: bold;
      font-size: $font-size-title-2;
    }
  }
  .header_left {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 100%;
  }
}
// 去掉横向菜单的padding
:deep(.arco-menu-horizontal .arco-menu-inner) {
  padding: unset;
}
// 去掉单级横向菜单的line-height,解决icon和标题的横向对齐问题
:deep(.arco-menu-horizontal .arco-menu-item) {
  line-height: unset;
}
// 去掉多级横向菜单的line-height,解决icon和标题的横向对齐问题
:deep(.arco-menu-horizontal .arco-menu-pop-header) {
  line-height: unset;
}
:deep(.arco-menu-selected-label) {
  bottom: -16px;
}
</style>
