<template>
  <div class="layout-head">
    <div class="layout-head-top">
      <a-layout-header class="header">
        <div class="header-logo">
          <Logo />
        </div>
        <div class="layout-head-menu">
          <a-menu
            v-if="drawing"
            mode="horizontal"
            :selected-keys="[currentRoute.name]"
            @menu-item-click="onMenuItem"
            :popup-max-height="600"
          >
            <template v-for="item in routeTree" :key="item.name">
              <a-sub-menu v-if="menuShow(item)" :key="item.name" :popup-max-height="600">
                <template #icon v-if="item.meta.svgIcon || item.meta.icon">
                  <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
                </template>
                <template #title>{{ $t(`language.${item.meta.title}`) }}</template>
                <MenuItem :route-tree="item.children" />
              </a-sub-menu>
              <a-menu-item v-else-if="aMenuShow(item)" :key="item?.name">
                <template #icon v-if="item.meta.svgIcon || item.meta.icon">
                  <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
                </template>
                <span>{{ $t(`language.${item.meta.title}`) }}</span>
              </a-menu-item>
            </template>
          </a-menu>
        </div>

        <HeaderRight />
      </a-layout-header>
      <Main />
      <Footer v-if="isFooter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/layout/components/Logo/index.vue";
import HeaderRight from "@/layout/components/Header/components/header-right/index.vue";
import Main from "@/layout/components/Main/index.vue";
import Footer from "@/layout/components/Footer/index.vue";
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import MenuItemIcon from "@/layout/components/Menu/menu-item-icon.vue";
import { storeToRefs } from "pinia";
import { useRoutesListStore } from "@/store/modules/route-list";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
import { useThemeConfig } from "@/store/modules/theme-config";
import { useMenuMethod } from "@/hooks/useMenuMethod";
defineOptions({ name: "LayoutHead" });
const router = useRouter();
const routerStore = useRoutesListStore();
const themeStore = useThemeConfig();
const { routeTree, currentRoute } = storeToRefs(routerStore);
const { isFooter, language } = storeToRefs(themeStore);

const { menuShow, aMenuShow } = useMenuMethod();

const drawing = ref<boolean>(true);
watch(language, () => {
  drawing.value = false;
  nextTick(() => (drawing.value = true));
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

<style lang="scss" scoped>
.layout-head {
  height: 100vh;
  &-top {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
}

.header {
  padding: 0 $padding;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: $border-1 solid $color-border-2;
  display: flex;
  align-items: center;
  overflow: hidden;
  .header-logo {
    max-width: 180px;
  }
  .layout-head-menu {
    flex: 1;
    display: flex;
    overflow: hidden;
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
