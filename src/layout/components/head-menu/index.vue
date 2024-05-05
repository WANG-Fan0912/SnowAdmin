<template>
  <a-menu mode="horizontal" :selected-keys="[currentRoute.name]" @menu-item-click="onMenuItem">
    <template v-for="item in routeTree" :key="item.name">
      <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.name">
        <template #icon v-if="item.meta.svgIcon || item.meta.icon">
          <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
        </template>
        <template #title>{{ $t(`language.${item.meta.title}`) }}</template>
        <MenuItem :route-tree="item.children" />
      </a-sub-menu>
      <a-menu-item v-else :key="item?.name">
        <template #icon v-if="item.meta.svgIcon || item.meta.icon">
          <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
        </template>
        <span>{{ $t(`language.${item.meta.title}`) }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import MenuItemIcon from "@/layout/components/Menu/menu-item-icon.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useRoutesListStore } from "@/store/modules/route-list";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
const router = useRouter();
const routerStore = useRoutesListStore();
const { routeTree, currentRoute } = storeToRefs(routerStore);

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
