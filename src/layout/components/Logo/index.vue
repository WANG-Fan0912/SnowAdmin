<template>
  <div :class="layoutType == 'layoutHead' ? 'logo_head no-border' : 'logo_head'">
    <div class="logo_box" :class="(collapsed || layoutType == 'layoutHead') && 'padding-unset'">
      <SvgIcon name="snow" :size="30" />
      <span :class="isDark ? 'logo_title dark' : 'logo_title'" v-if="isTitle">{{ title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
const themeStore = useThemeConfig();
const { collapsed, asideDark, layoutType } = storeToRefs(themeStore);

// 全局title
const title = import.meta.env.VITE_GLOB_APP_TITLE;

// 黑暗模式的文字渲染
const isDark = computed(() => {
  if (asideDark.value && layoutType.value != "layoutHead") {
    return true;
  } else {
    return false;
  }
});

// 是否展示标题
const isTitle = computed(() => {
  if (!collapsed.value || layoutType.value == "layoutHead") {
    return true;
  } else {
    return false;
  }
});
</script>

<style lang="scss" scoped>
// 头部
.logo_head {
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  border-right: $border-1 solid $color-border-2;

  .logo_box {
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 $padding;
    column-gap: $padding;
  }

  // 折叠或者是横向布局-去掉padding，logo居中
  .padding-unset {
    padding: unset;
    justify-content: space-around;
  }

  .logo_title {
    max-width: 140px;
    box-sizing: border-box;
    text-align: left;
    font-weight: bold;
    font-size: $font-size-title-2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dark {
    color: #fff;
  }
}
.no-border {
  border: unset;
}
</style>
