<template>
  <FillPage>
    <div class="container">
      <div class="container-main">
        <div class="left-box">
          <FileTree />
        </div>
        <div class="right-box"></div>
      </div>
    </div>
  </FillPage>
</template>

<script setup lang="ts">
import FileTree from "@/views/file-management/document-library/components/file-tree.vue";
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: $padding;
  box-sizing: border-box;
  overflow: hidden;
}
.container-main {
  height: 100%;
  display: flex;
  overflow: hidden;
  .left-box {
    width: 300px;
    height: 100%;
    background: $color-bg-1;
  }
  .right-box {
    margin-left: $padding;
    width: calc(100% - 220px - $padding);
    height: 100%;
    background: $color-bg-1;
  }
}
</style>
