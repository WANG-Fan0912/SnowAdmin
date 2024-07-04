<template>
  <FillPage>
    <div class="container">
      <div class="container-main">
        <div class="left-box">
          <div class="box-title">文件库</div>
          <a-divider margin="0" />
          <FileTree class="file-tree-style" />
        </div>
        <div class="right-box">
          <div class="box-title">
            <a-breadcrumb>
              <a-breadcrumb-item>总公司</a-breadcrumb-item>
              <a-breadcrumb-item>行政部</a-breadcrumb-item>
              <a-breadcrumb-item>人力资源部</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <a-divider margin="0" />
          <FileTable class="file-table-style" />
        </div>
      </div>
    </div>
  </FillPage>
</template>

<script setup lang="ts">
import FileTree from "@/views/file-management/document-library/components/file-tree.vue";
import FileTable from "@/views/file-management/document-library/components/file-table.vue";
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

    .file-tree-style {
      height: calc(100% - 40px);
    }
  }
  .right-box {
    margin-left: $padding;
    width: calc(100% - 220px - $padding);
    height: 100%;
    background: $color-bg-1;
    .file-table-style {
      height: calc(100% - 40px);
    }
  }
}

.box-title {
  height: 40px;
  line-height: 40px;
  font-size: $font-size-title-1;
  text-align: left;
  padding: 0 $margin;
}
</style>
