<template>
  <FillPage>
    <div class="container">
      <div class="container-main">
        <div class="left-box">
          <a-scrollbar style="height: 100%; overflow: auto" outer-class="scrollbar">
            <div class="left-tree-box">
              <a-tree :data="treeData" :show-line="true"> </a-tree>
            </div>
          </a-scrollbar>
        </div>
        <div class="right-box"></div>
      </div>
    </div>
  </FillPage>
</template>

<script setup lang="ts">
const treeData = ref([
  {
    title: "Trunk 1",
    key: "0-0",
    children: [
      {
        title: "Trunk 1-0",
        key: "0-0-0",
        children: [
          { title: "leaf", key: "0-0-0-0" },
          {
            title: "leaf",
            key: "0-0-0-1",
            children: [{ title: "leaf", key: "0-0-0-1-0" }]
          },
          { title: "leaf", key: "0-0-0-2" }
        ]
      },
      {
        title: "Trunk 1-1",
        key: "0-0-1"
      },
      {
        title: "Trunk 1-2",
        key: "0-0-2",
        children: [
          { title: "leaf", key: "0-0-2-0" },
          {
            title: "leaf",
            key: "0-0-2-1"
          }
        ]
      }
    ]
  },
  {
    title: "Trunk 2",
    key: "0-1"
  },
  {
    title: "Trunk 3",
    key: "0-2",
    children: [
      {
        title: "Trunk 3-0",
        key: "0-2-0",
        children: [
          { title: "leaf", key: "0-2-0-0" },
          { title: "leaf", key: "0-2-0-1" }
        ]
      }
    ]
  }
]);
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
    .scrollbar {
      height: 100%;
    }
    .left-tree-box {
      padding: $padding;
    }
  }
  .right-box {
    margin-left: $padding;
    width: calc(100% - 220px - $padding);
    height: 100%;
    background: $color-bg-1;
  }
}
</style>
