<template>
  <div>
    <a-space direction="vertical">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="item in breadcrumb" :key="item.path">
          {{ item.label }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationMatched } from "vue-router";
const route = useRoute();
console.log("路由信息", route);

/**
 * 获取面包屑
 * 根据当前路由信息获取，route.matched可以获取当前路由的所有父级路由信息
 * 如果当前路由是重定向路由，则只返回当前路由信息
 * 否则返回所有父级路由信息，顶层路由重写为首页
 */
const breadcrumb = computed(() => {
  if (route.path === route.matched[0].redirect) {
    return [{ label: route.meta.title, path: route.path }];
  }
  return route.matched.map((item: RouteLocationMatched) => {
    if (item.name == "/") {
      return {
        label: item.children[0].meta?.title || "",
        path: item.children[0].path
      };
    } else {
      return { label: item.meta.title, path: item.path };
    }
  });
});
</script>

<style lang="scss" scoped></style>
