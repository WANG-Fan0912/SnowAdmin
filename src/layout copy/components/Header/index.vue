<template>
  <a-layout-header class="header">
    <HeaderLeft />
    <HeaderRight />
  </a-layout-header>
</template>
<script setup lang="ts">
import HeaderLeft from "@/layout/components/Header/components/header-left/index.vue";
import HeaderRight from "@/layout/components/Header/components/header-right/index.vue";
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 0 $padding;
  box-sizing: border-box;
  border-bottom: $border-1 solid $color-border-2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
