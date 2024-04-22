<template>
  <div>
    <a-space direction="vertical">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <icon-home />
          首页
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <icon-at />
          常用组件
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <icon-at />
          文件上传
        </a-breadcrumb-item>
      </a-breadcrumb>
    </a-space>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
console.log("路由信息", route.matched);
</script>

<style lang="scss" scoped></style>
