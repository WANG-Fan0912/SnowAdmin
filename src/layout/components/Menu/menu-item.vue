<template>
  <template v-for="item in props.routeTree" :key="item.name">
    <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.name">
      <template #icon v-if="item.meta.svgIcon || item.meta.icon">
        <IconCommon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
      </template>
      <template #title>{{ item.meta.title }}</template>
      <MenuItem :route-tree="item.children" />
    </a-sub-menu>
    <a-menu-item v-else :key="item.name">
      <template #icon v-if="item.meta.svgIcon || item.meta.icon">
        <IconCommon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
      </template>
      <div>{{ item.meta.title }}</div>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import IconCommon from "@/layout/components/Menu/icon-common.vue";
defineOptions({ name: "MenuItem" });

interface Props {
  routeTree: Menu.MenuOptions[];
}
// type类型参考：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<Props>(), {
  routeTree: () => []
});
</script>

<style lang="scss" scoped></style>
