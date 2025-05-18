<template>
  <div class="snow-page">
    <div class="snow-inner">
      <a-card title="路由测试页">
        <a-space direction="vertical" fill>
          <div>路由：{{ route.path }}</div>
          <div>参数：{{ JSON.stringify(route.query) }}</div>
        </a-space>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "test-common-route" });
const route = useRoute();
</script>

<style lang="scss" scoped></style>
