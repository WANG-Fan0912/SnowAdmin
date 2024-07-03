<template>
  <div>
    <a-input class="search-tree" v-model="searchKey" placeholder="请输入搜索关键词">
      <template #prefix>
        <icon-search />
      </template>
    </a-input>
    <a-tree :data="treeData" :show-line="true">
      <template #icon="node">
        <SvgIcon name="folder-close" :size="16" v-if="!node.isLeaf && !node.expanded"></SvgIcon>
        <SvgIcon name="folder-open" :size="16" v-if="!node.isLeaf && node.expanded"></SvgIcon>
        <SvgIcon name="txt" :size="16" v-if="node.isLeaf"></SvgIcon>
      </template>
    </a-tree>
  </div>
</template>

<script setup lang="ts">
import { fileTreeData } from "@/views/file-management/document-library/components/file-tree-data.js";
const searchKey = ref("");

const treeData = computed(() => {
  if (!searchKey.value) return sourceTree.value;
  return searchData(searchKey.value);
});

// 搜索树
const searchData = (keyword: string) => {
  const loop = (tree: any) => {
    const result: any = []; // 存储搜索结果
    tree.forEach((item: any) => {
      // 匹配节点
      if (item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        result.push({ ...item });
      } else if (item.children) {
        // 不匹配，但是有children，深层遍历
        // filterData 存储遍历结果
        const filterData = loop(item.children);
        // 如果在深层遍历中，匹配到
        if (filterData.length) {
          // 将结果存储到children中
          result.push({
            ...item,
            children: filterData
          });
        }
      }
    });
    return result;
  };
  // 开始递归
  return loop(sourceTree.value);
};

const sourceTree = ref(fileTreeData.tree);
</script>

<style lang="scss" scoped>
.search-tree {
  margin-bottom: $margin;
}
</style>
