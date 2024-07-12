<template>
  <FillPage>
    <div class="scope-page">
      <div class="my-page" v-my-directive="'red'">防抖</div>
    </div>
  </FillPage>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.scope-page {
  box-sizing: border-box;
  height: 100%;
  padding: $padding;
  .my-page {
    height: 100%;
    padding: $padding;
    box-sizing: border-box;
    background: $color-bg-1;
  }
}
</style>
