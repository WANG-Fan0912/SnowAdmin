<template>
  <a-layout class="layout">
    <div :class="asideDark ? 'aside dark' : 'aside'">
      <Logo />
      <a-layout-sider :collapsed="collapsed" breakpoint="xl" class="layout_side" :width="220">
        <a-scrollbar style="height: 100%; overflow: auto" outer-class="scrollbar"><Menu :route-tree="routeList" /></a-scrollbar>
      </a-layout-sider>
    </div>
    <a-layout>
      <div class="layout-head">
        <div class="layout-head-top">
          <a-layout-header class="header">
            <div class="menu_fold">
              <a-button size="mini" type="text" class="menu_fold_icon" @click="onCollapsed">
                <template #icon>
                  <icon-menu-fold :size="18" v-if="!collapsed" />
                  <icon-menu-unfold :size="18" v-if="collapsed" />
                </template>
              </a-button>
            </div>

            <a-menu mode="horizontal" :selected-keys="[aciveRoute]" @menu-item-click="onMenuItem">
              <a-menu-item v-for="item in routeTree" :key="item.name">
                <template #icon v-if="item.meta.svgIcon || item.meta.icon">
                  <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
                </template>
                <span>{{ $t(`language.${item.meta.title}`) }}</span>
              </a-menu-item>
            </a-menu>
            <HeaderRight />
          </a-layout-header>
          <Main />
          <Footer v-if="isFooter" />
        </div>
      </div>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Logo from "@/layout/components/Logo/index.vue";
import Main from "@/layout/components/Main/index.vue";
import Footer from "@/layout/components/Footer/index.vue";
import Menu from "@/layout/components/Menu/index.vue";
import HeaderRight from "@/layout/components/Header/components/header-right/index.vue";
import MenuItemIcon from "@/layout/components/Menu/menu-item-icon.vue";
import { useRouter } from "vue-router";
import { useRoutesListStore } from "@/store/modules/route-list";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
defineOptions({ name: "LayoutMixing" });
const route = useRoute();
const router = useRouter();
const routerStore = useRoutesListStore();
const themeStore = useThemeConfig();
const { isFooter, collapsed, asideDark } = storeToRefs(themeStore);
const { routeTree } = storeToRefs(routerStore);

// 折叠
const onCollapsed = () => {
  themeStore.setCollapsed(!collapsed.value);
};

console.log("路由信息", route);

// 由于刷新后，路由信息丢失，所以需要重新获取
// 混合布局的横向菜单为顶层路由下的一级菜单
// 这里通过当前路由信息直接获取
const aciveRoute = computed(() => {
  getAsideMenu(route.matched[1].name as string);
  return route.matched[1].name;
});

// 横向菜单点击事件
// 将一级菜单下的children给左侧菜单
// 如果没有children则直接自身菜单给左侧菜单
const routeList = ref<any>([]);
const onMenuItem = (key: string) => {
  const { findLinearArray } = useRoutingMethod();
  const find = findLinearArray(key);
  // 路由存在则存入并跳转，不存在则跳404
  if (find) {
    setAsideMenu(find);
    router.push(find.path);
  } else {
    router.push("/404");
  }
};

// 给左侧树赋值
const setAsideMenu = (find: Menu.MenuOptions) => {
  // 将父级的chindren给左侧树
  if (find.children && find.children.length > 0) {
    routeList.value = find.children;
  } else {
    // 如果没有则直接将父级给左侧树，做一级兜底
    routeList.value = [find];
  }
};

// 首次进入，获取左侧菜单
const getAsideMenu = (key: string) => {
  const { findLinearArray } = useRoutingMethod();
  const find = findLinearArray(key);
  setAsideMenu(find);
};
// getAsideMenu(aciveRoute.value as string);
</script>

<style lang="scss" scoped>
.layout {
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

.layout-head {
  height: 100%;
  display: flex;
  align-items: stretch; // 如果（多个）元素的组合大小小于容器的大小，其中自动调整大小的元素将等量增大，以填满容器，同时这些元素仍然保持其宽高比例的约束。
  overflow: hidden;
  .header-logo {
    width: 150px;
  }
  &-top {
    flex: 1; // 按比例分配大小
    display: flex;
    flex-direction: column; // flex 容器的主轴和块轴相同。主轴起点与主轴终点和书写模式的前后点相同
    overflow: hidden;
  }
}

.header {
  padding: 0 $padding;
  height: 60px;
  box-sizing: border-box;
  border-bottom: $border-1 solid $color-border-2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  .menu_fold {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .menu_fold_icon {
      color: $color-text-1;
      border-radius: $radius-box;
    }
  }
}

:deep(.arco-menu-pop) {
  white-space: nowrap;
}
// 横向菜单样式修改
:deep(.arco-menu-horizontal) {
  flex: 1;
  overflow: hidden;
  .arco-menu-inner {
    padding-left: 0; // 横向排列，禁用左padding
    .arco-menu-overflow-wrap {
      white-space: nowrap; // 禁用换行，否则会导致菜单换行闪烁
    }
  }
}
</style>
