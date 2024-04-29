<template>
  <div>
    <LangProvider>
      <component :is="layouts['defaults']" />
    </LangProvider>
  </div>
</template>

<script setup lang="ts">
import { loadingPage } from "@/utils/loading-page";
// 引入组件-异步组件
const layouts = {
  defaults: defineAsyncComponent(() => import("@/layout/layout-defaults/index.vue")),
  mixing: defineAsyncComponent(() => import("@/layout/layout-mixing/index.vue"))
};

onMounted(() => {
  // 页面渲染完毕，结束loading
  loadingPage.done(200);
});
</script>

<style lang="scss" scoped></style>
