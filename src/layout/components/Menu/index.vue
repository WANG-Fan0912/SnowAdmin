<template>
  <a-menu breakpoint="xl" :collapsed="collapsed">
    <MenuItem :route-tree="routeTree" />
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import { storeToRefs } from "pinia";
import { useRoutesListStore } from "@/store/route-list";
import { useThemeConfig } from "@/store/theme-config";

const routerStore = useRoutesListStore();
const { routeTree } = storeToRefs(routerStore);
const themeStore = useThemeConfig();
const { collapsed } = storeToRefs(themeStore);

console.log("路由树", routeTree.value);
</script>

<style lang="scss" scoped></style>
