<template>
  <div class="snow-fill">
    <div class="snow-fill-inner">
      <div class="left-box">
        <a-input placeholder="请输入部门名称">
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
        <div class="tree-box">
          <a-tree :data="treeData" show-line> </a-tree>
        </div>
      </div>
      <div class="right-box"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const treeData = [
  {
    title: "Trunk",
    key: "node1",
    children: [
      {
        title: "Leaf",
        key: "node2"
      }
    ]
  },
  {
    title: "Trunk",
    key: "node3",
    children: [
      {
        title: "Leaf",
        key: "node4"
      },
      {
        title: "Leaf",
        key: "node5"
      }
    ]
  },
  {
    title: "Trunk",
    key: "node3",
    children: [
      {
        title: "Leaf",
        key: "node4"
      },
      {
        title: "Leaf",
        key: "node5"
      }
    ]
  },
  {
    title: "Trunk",
    key: "node3",
    children: [
      {
        title: "Leaf",
        key: "node4"
      },
      {
        title: "Leaf",
        key: "node5"
      }
    ]
  },
  {
    title: "Trunk",
    key: "node3",
    children: [
      {
        title: "Leaf",
        key: "node4"
      },
      {
        title: "Leaf",
        key: "node5"
      }
    ]
  },
  {
    title: "Trunk",
    key: "node3",
    children: [
      {
        title: "Leaf",
        key: "node4"
      },
      {
        title: "Leaf",
        key: "node5"
      }
    ]
  },
  {
    title: "Trunk",
    key: "node3",
    children: [
      {
        title: "Leaf",
        key: "node4"
      },
      {
        title: "Leaf",
        key: "node5"
      }
    ]
  },
  {
    title: "Trunk",
    key: "node3",
    children: [
      {
        title: "Leaf",
        key: "node4"
      },
      {
        title: "Leaf",
        key: "node5"
      }
    ]
  },
  {
    title: "Trunk",
    key: "node3",
    children: [
      {
        title: "Leaf",
        key: "node4"
      },
      {
        title: "Leaf",
        key: "node5"
      }
    ]
  },
  {
    title: "Trunk",
    key: "node3",
    children: [
      {
        title: "Leaf",
        key: "node4"
      },
      {
        title: "Leaf",
        key: "node5"
      }
    ]
  }
];
</script>

<style lang="scss" scoped>
.container {
  height: 100%;

  // flex: 1;

  // overflow: hidden;
  border: 1px solid blue;

  // .left-box {
  //   display: flex;
  //   flex: 1;
  //   flex-direction: column;
  //   width: 300px;
  //   padding: $padding;
  //   background: $color-bg-1;
  //   border: 1px solid red;
  //   .tree-box {
  //     flex: 1;
  //     overflow: auto;
  //   }
  // }
  // .right-box {
  //   width: calc(100% - 220px - $padding);
  //   height: 100%;
  //   margin-left: $padding;
  //   background: $color-bg-1;
  // }
}
</style>
