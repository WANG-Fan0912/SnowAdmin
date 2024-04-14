<template>
  <a-menu breakpoint="xl" :collapsed="collapsed">
    <MenuItem :route-tree="routeTree" />
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/theme-config";
import { useRoutesListStore } from "@/store/route-list";

const routerStore = useRoutesListStore();
const { routeTree } = storeToRefs(routerStore);
const themeStore = useThemeConfig();
const { collapsed } = storeToRefs(themeStore);

console.log("路由树", routeTree.value);
</script>

<style lang="scss">
:deep(.arco-menu-pop .arco-menu-pop-header .arco-menu-has-icon) {
  padding: 0 !important;
}
:deep(.arco-menu-vertical .arco-menu-pop-header) {
  padding: 0 !important;
}
:deep(.arco-menu-vertical .arco-menu-item) {
  padding: 0 !important;
}
</style>
