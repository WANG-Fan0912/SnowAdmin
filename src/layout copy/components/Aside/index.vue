<template>
  <div :class="asideDark ? 'aside dark' : 'aside'">
    <Logo />
    <a-layout-sider :collapsed="collapsed" breakpoint="xl" class="layout_side" :width="220">
      <a-scrollbar style="height: 100%; overflow: auto" outer-class="scrollbar"><Menu :route-tree="routeTree" /></a-scrollbar>
    </a-layout-sider>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/layout/components/Logo/index.vue";
import Menu from "@/layout/components/Menu/index.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
import { useRoutesListStore } from "@/store/modules/route-list";
const themeStore = useThemeConfig();
const { collapsed, asideDark } = storeToRefs(themeStore);
const routerStore = useRoutesListStore();
const { routeTree } = storeToRefs(routerStore);
</script>

<style lang="scss" scoped>
.aside {
  height: 100vh;
}
.dark {
  background: #232324;
}

.layout_side {
  height: calc(100% - 60px);
  .scrollbar {
    height: 100%;
  }
}
// 修改左侧滚动条宽度
:deep(.arco-scrollbar-thumb-direction-vertical .arco-scrollbar-thumb-bar) {
  width: 4px;
  margin-left: 8px;
}
// 去掉右侧阴影并替换为边线
:deep(.arco-layout-sider-light) {
  box-shadow: unset;
  border-right: $border-1 solid $color-border-2;
}

// 解决折叠菜单的icon不居中问题
:deep(.arco-menu-vertical.arco-menu-collapsed) {
  // 消除icon的自带padding值，并且让元素居中
  .arco-menu-has-icon {
    padding: 0;
    justify-content: center;
  }
  // 消除icon的自带margin-right值，并且设置icon的padding值以保留icon空隙
  .arco-menu-icon {
    margin-right: 0;
    padding: 10px 0;
  }
  // 消除title占位
  .arco-menu-title {
    display: none;
  }
}

// 去掉sider背景
.arco-layout-sider {
  background: unset;
}
</style>
