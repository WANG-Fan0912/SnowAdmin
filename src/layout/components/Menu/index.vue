<template>
  <a-menu
    :breakpoint="layoutType != 'layoutHead' ? 'xl' : undefined"
    :mode="'vertical'"
    :theme="asideDark ? 'dark' : 'light'"
    :collapsed="collapsed"
    :auto-scroll-into-view="true"
    :auto-open-selected="true"
    :accordion="isAccordion"
    :selected-keys="[currentRoute.name]"
    @menu-item-click="onMenuItem"
  >
    <MenuItem :route-tree="props.routeTree" />
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
import { useRoutesListStore } from "@/store/modules/route-list";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
const router = useRouter();
const routerStore = useRoutesListStore();
const { currentRoute } = storeToRefs(routerStore);
const themeStore = useThemeConfig();
const { collapsed, isAccordion, layoutType, asideDark } = storeToRefs(themeStore);

interface Props {
  routeTree: Menu.MenuOptions[];
}
// props的数据类型
// type类型参考：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<Props>(), {
  routeTree: () => []
});

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
</script>

<style lang="scss" scoped></style>
