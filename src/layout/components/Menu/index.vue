<template>
  <a-menu
    breakpoint="xl"
    :collapsed="collapsed"
    :auto-open-selected="true"
    :accordion="true"
    :selected-keys="[currentRoute.name]"
    @menu-item-click="onMenuItem"
  >
    <MenuItem :route-tree="routeTree" />
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/theme-config";
import { useRoutesListStore } from "@/store/route-list";
import { useRouter } from "vue-router";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
const router = useRouter();
const routerStore = useRoutesListStore();
const { routeTree, currentRoute } = storeToRefs(routerStore);
const themeStore = useThemeConfig();
const { collapsed } = storeToRefs(themeStore);

const onMenuItem = (key: string) => {
  const { findLinearArray } = useRoutingMethod();
  const find = findLinearArray(key);
  if (find) {
    routerStore.setTabs(find);
    router.push(find.path);
  } else {
    router.push("/404");
  }
};
</script>

<style lang="scss" scoped></style>
