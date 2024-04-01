<template>
  <a-layout class="layout">
    <Aside />
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import Aside from "@/layout/components/Aside/index.vue";
defineOptions({ name: "LayoutDefaults" });
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}
</style>
