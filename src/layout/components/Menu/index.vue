<template>
  <a-menu
    :breakpoint="layoutType === 'layoutDefaults' ? undefined : 'xl'"
    :mode="'vertical'"
    :collapsed="collapsed"
    :auto-scroll-into-view="true"
    :auto-open-selected="true"
    :accordion="isAccordion"
    :selected-keys="[currentRoute.name]"
    @menu-item-click="onMenuItem"
  >
    <MenuItem :route-tree="routeTree" />
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
import { useRoutesListStore } from "@/store/modules/route-list";
import { useRouter } from "vue-router";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
const router = useRouter();
const routerStore = useRoutesListStore();
const { routeTree, currentRoute } = storeToRefs(routerStore);
const themeStore = useThemeConfig();
const { collapsed, isAccordion, layoutType } = storeToRefs(themeStore);

/**
 * @description 菜单点击事件
 * @param {String} key
 */
const onMenuItem = (key: string) => {
  const { findLinearArray } = useRoutingMethod();
  const find = findLinearArray(key);
  // 路由存在则存入并跳转，不存在则跳404
  if (find) {
    router.push(find.path);
  } else {
    router.push("/404");
  }
};

// const mode = computed(() => {
//   if (layoutType.value === "layoutDefaults") {
//     return "vertical";
//   } else {
//     return "horizontal";
//   }
// });
</script>

<style lang="scss" scoped></style>
