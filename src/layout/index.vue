<template>
  <div>
    <component :is="layouts['defaults']"></component>
  </div>
</template>

<script setup lang="ts">
// 引入组件-异步组件
const layouts = {
  defaults: defineAsyncComponent(() => import("@/layout/layout-defaults/index.vue")),
  mixing: defineAsyncComponent(() => import("@/layout/layout-mixing/index.vue"))
};
</script>

<style lang="scss" scoped></style>
