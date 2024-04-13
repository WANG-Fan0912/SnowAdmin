<template>
  <template v-for="item in props.routeTree" :key="item.name">
    <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.name">
      <template #icon><SvgIcon :name="item.meta.icon" :size="25" /></template>
      <template #title>{{ item.meta.title }}</template>
      <MenuItem :route-tree="item.children" />
    </a-sub-menu>
    <a-menu-item v-else :key="item.name">
      <template #icon><SvgIcon :name="item.meta.icon" :size="25" /></template>
      <div>{{ item.meta.title }}</div>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
defineOptions({ name: "MenuItem" });
// 通过defineProps接收父组件的值
const props = defineProps({
  routeTree: {
    type: Array,
    default: () => []
  }
});
</script>

<style lang="scss" scoped></style>
