<template>
  <div>
    <div>二级-菜单 页面缓存</div>
    <a-input :style="{ width: '320px' }" placeholder="请输入内容" allow-clear v-model="form" />
  </div>
</template>

<script setup lang="ts">
const form = ref("");
</script>

<style lang="scss" scoped></style>
