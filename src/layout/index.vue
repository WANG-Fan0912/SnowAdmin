<template>
  <div>
    <component :is="layouts['defaults']"></component>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
console.log("页面查看路由", route);

// 引入组件-异步组件
const layouts = {
  defaults: defineAsyncComponent(() => import("@/layout/LayoutDefaults/index.vue")),
  mixing: defineAsyncComponent(() => import("@/layout/LayoutMixing/index.vue"))
};
</script>

<style lang="scss" scoped></style>
