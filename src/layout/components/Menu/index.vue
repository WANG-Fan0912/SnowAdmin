<template>
  <a-menu breakpoint="xl" :collapsed="collapsed" @menu-item-click="onMenuItem">
    <MenuItem :route-tree="routeTree" />
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/theme-config";
import { useRoutesListStore } from "@/store/route-list";
import { useRouter } from "vue-router";
const router = useRouter();
const routerStore = useRoutesListStore();
const { routeTree, routeList } = storeToRefs(routerStore);
const themeStore = useThemeConfig();
const { collapsed } = storeToRefs(themeStore);

console.log("路由树", routeTree.value);

const onMenuItem = (key: string) => {
  let find = routeList.value.find((item: Menu.MenuOptions) => item.name === key);
  console.log("当前", find);
  if (find) {
    routerStore.setTagsList(find);
    router.push(find.path);
  } else {
    router.push("/404");
  }
};
</script>

<style lang="scss" scoped></style>
