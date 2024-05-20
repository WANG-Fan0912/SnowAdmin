<template>
  <div>
    <LangProvider>
      <component :is="layouts[layoutType]" />
    </LangProvider>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
import { loadingPage } from "@/utils/loading-page";

const themeStore = useThemeConfig();
const { layoutType } = storeToRefs(themeStore);

// 引入组件-异步组件
const layouts: any = {
  layoutDefaults: defineAsyncComponent(() => import("@/layout/layout-defaults/index.vue")),
  layoutHead: defineAsyncComponent(() => import("@/layout/layout-head/index.vue")),
  layoutMixing: defineAsyncComponent(() => import("@/layout/layout-mixing/index.vue"))
};

onMounted(() => {
  // 页面渲染完毕，结束loading
  loadingPage.done(200);
});

// 页面加载前
onBeforeMount(() => {
  onLayoutResize();
  window.addEventListener("resize", onLayoutResize);
});

// 监听页面大小
const onLayoutResize = () => {
  let clientWidth = document.body.clientWidth;
  console.log("窗口大小", clientWidth);
};
</script>

<style lang="scss" scoped></style>
