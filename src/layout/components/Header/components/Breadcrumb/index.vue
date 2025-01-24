<template>
  <div id="system-breadcrumb" class="breadcrumb" v-if="!isMobile && isBreadcrumb">
    <a-space direction="vertical">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="item.path" :class="transition">
          <span v-if="index === breadcrumb.length - 1" class="main_button">{{ $t(`menu.${item?.meta?.title || ""}`) }}</span>
          <span v-else class="route_button" @click="onBreadcrumb(item)">{{ $t(`menu.${item?.meta?.title || ""}`) }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
import { useRoutesConfigStore } from "@/store/modules/route-config";
import { useDevicesSize } from "@/hooks/useDevicesSize";
import { HOME_PATH } from "@/config/index";
const themeStore = useThemeConfig();
const { isBreadcrumb, transitionPage } = storeToRefs(themeStore);
const routesConfigStore = useRoutesConfigStore();
const { routeList } = storeToRefs(routesConfigStore);
const { isMobile } = useDevicesSize();
const route = useRoute();
const router = useRouter();

/**
 * 获取面包屑
 * 根据当前路由信息获取，route.matched可以获取当前路由的所有父级路由信息
 * 如果当前路由是home路由，则只返回当前路由信息(说明当前就是顶层)
 * 否则返回所有父级路由信息，顶层路由重写为首页
 */
const breadcrumb = computed(() => {
  // 如果是首页则直接返回当前路由信息
  if (route.path === HOME_PATH) return [route];

  // 否则返回路径信息
  return route.matched.map((item: any) => {
    if (item.name == "layout") {
      return routeList.value.find((item: any) => item.path == HOME_PATH);
    } else {
      return item;
    }
  });
});

// 页面过渡
const transition = computed(() => {
  if (transitionPage.value === "fadeInOut") {
    return "fadeInOut-enter-active";
  } else if (transitionPage.value === "cardInOut") {
    return "cardInOut-enter-active";
  } else {
    return "fadeOut-enter-active";
  }
});

// 面包屑跳转
const onBreadcrumb = (route: any) => {
  let path = route.redirect || route.path;
  router.replace((path as string) || HOME_PATH);
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-left: $margin;
  overflow: auto;
  .main_button {
    color: $color-text-1;
    white-space: nowrap;
    cursor: pointer;
  }
  .route_button {
    color: $color-text-2;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      color: $color-primary;
    }
  }
}
</style>
