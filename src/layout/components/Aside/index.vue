<template>
  <a-layout-sider :width="220">
    <div class="logo_head"></div>
    <a-scrollbar outer-class="aside_scroll">
      <div class="aside_menu"></div>
    </a-scrollbar>
  </a-layout-sider>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.logo_head {
  height: 60px;
  box-shadow: inset 0 0 0 1px red;
}

.aside_scroll {
  height: 100%;
  box-shadow: inset 0 0 0 1px black;
  .aside_menu {
    box-shadow: inset 0 0 0 1px cyan;
  }
}
</style>
