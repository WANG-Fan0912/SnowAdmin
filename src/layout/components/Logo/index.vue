<template>
  <div :class="layoutType == 'layoutHead' ? 'logo_head no-border' : 'logo_head'">
    <img :src="Logo" class="logo" />
    <span :class="isDark ? 'logo_title dark' : 'logo_title'" v-if="!collapsed">dc admin</span>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/assets/img/logo.jpg";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
const themeStore = useThemeConfig();
const { collapsed, asideDark, layoutType } = storeToRefs(themeStore);

const isDark = computed(() => {
  if (asideDark.value && layoutType.value != "layoutHead") {
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

  .logo {
    width: 30px;
  }

  .logo_title {
    max-width: 150px;
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
