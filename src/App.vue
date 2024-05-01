<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { loadingPage } from "@/utils/loading-page";
import { useRoutingMethod } from "@/hooks/useThemeMethods";

// 初始化主题
const onTheme = () => {
  let { darkMode } = useRoutingMethod();
  darkMode();
};
onTheme();

// 加载动画
loadingPage.start();
onMounted(() => {
  loadingPage.done(200);
});
</script>

<style lang="scss" scoped></style>
