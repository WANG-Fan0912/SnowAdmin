<template>
  <div>
    <a-space direction="vertical">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="item.path">
          <span v-if="index === breadcrumb.length - 1" class="main_button">{{ $t(`language.${item?.meta?.title || ""}`) }}</span>
          <span v-else class="route_button" @click="onBreadcrumb(item as RouteLocationMatched)">{{
            $t(`language.${item?.meta?.title || ""}`)
          }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationMatched } from "vue-router";
const route = useRoute();
const router = useRouter();

/**
 * 获取面包屑
 * 根据当前路由信息获取，route.matched可以获取当前路由的所有父级路由信息
 * 如果当前路由是顶层的重定向路由，则只返回当前路由信息(说明当前就是顶层)
 * 否则返回所有父级路由信息，顶层路由重写为首页
 */
const breadcrumb = computed(() => {
  if (route.path === route.matched[0].redirect) {
    return [route];
  }
  return route.matched.map((item: RouteLocationMatched) => {
    if (item.name == "/") {
      return item.children[0];
    } else {
      return item;
    }
  });
});

// 面包屑跳转
const onBreadcrumb = (route: RouteLocationMatched) => {
  let path = route.redirect ? route.redirect : route.path;
  router.replace((path as string) || "");
};
</script>

<style lang="scss" scoped>
.main_button {
  color: $color-text-1;
  cursor: pointer;
}
.route_button {
  color: $color-text-2;
  cursor: pointer;
  &:hover {
    color: $color-primary;
  }
}
</style>
