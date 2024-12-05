<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { loadingPage } from "@/utils/loading-page";
import { useThemeMethods } from "@/hooks/useThemeMethods";

let a = "12345323";

// 初始化主题
const onTheme = () => {
  let { initTheme } = useThemeMethods();
  initTheme();
};
onTheme();

// 加载动画
loadingPage.start();
onMounted(() => {
  loadingPage.done(200);
});
</script>

<style lang="scss" scoped></style>
