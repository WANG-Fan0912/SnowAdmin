<template>
  <a-layout-content class="content">
    <a-scrollbar style="height: 100%; overflow: auto" outer-class="scrollbar">
      <div style="height: 2000px; background: #eee"></div>
    </a-scrollbar>
  </a-layout-content>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 60px - 30px); // 动态切类名-去掉footer
}
.scrollbar {
  height: 100%;
}
// 修改左侧滚动条宽度
:deep(.arco-scrollbar-thumb-direction-vertical .arco-scrollbar-thumb-bar) {
  width: 4px;
  margin-left: 8px;
}
</style>
