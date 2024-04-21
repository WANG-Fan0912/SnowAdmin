<template>
  <div class="tabs">
    <a-tabs
      :editable="true"
      :hide-content="true"
      :active-key="currentRoute.name"
      size="medium"
      type="line"
      @tab-click="onTabs"
      @delete="onDelete"
    >
      <a-tab-pane v-for="item of tabsList" :key="item.name" :title="item.meta.title" :closable="!item.meta.affix" />
    </a-tabs>
    <div class="tabs_setting">
      <a-dropdown trigger="hover" :popup-max-height="false">
        <div class="setting"><icon-loop :size="18" /></div>
        <template #content>
          <a-doption @click="refresh">
            <template #icon><icon-refresh /></template>
            <template #default>刷新</template>
          </a-doption>
          <a-doption @click="closeCurrent">
            <template #icon><icon-close /></template>
            <template #default>关闭当前</template>
          </a-doption>
          <a-doption @click="closeSides('left')">
            <template #icon><icon-left /></template>
            <template #default>关闭左侧</template>
          </a-doption>
          <a-doption @click="closeSides('right')">
            <template #icon><icon-right /></template>
            <template #default>关闭右侧</template>
          </a-doption>
          <a-doption @click="closeOther('other')">
            <template #icon><icon-close-circle /></template>
            <template #default>关闭其它</template>
          </a-doption>
          <a-doption @click="closeOther('all')">
            <template #icon><icon-folder-delete /></template>
            <template #default>全部关闭</template>
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useRoutesListStore } from "@/store/route-list";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
import { useThemeConfig } from "@/store/theme-config";
const router = useRouter();
const routerStore = useRoutesListStore();
const { tabsList, currentRoute } = storeToRefs(routerStore);

// 点击标签页，如果标签页存在，则跳转
const onTabs = (key: string) => {
  const { findTagsList } = useRoutingMethod();
  const find = findTagsList(key);
  if (find != undefined) {
    router.push(find.path);
  }
};

// 删除当前标签页并跳转到最后一个标签页
const onDelete = (key: string) => {
  routerStore.removeTabsList(key);
  routerStore.removeRouteName(key);
  if (tabsList.value.length == 0) return;
  router.push(tabsList.value.at(-1).path);
};

// 刷新当前页
const refresh = () => {
  const themeStore = useThemeConfig();
  themeStore.setRefreshPage(false);
  currentRoute.value.meta.keepAlive && routerStore.removeRouteName(currentRoute.value.name);
  setTimeout(() => {
    themeStore.setRefreshPage(true);
    currentRoute.value.meta.keepAlive && routerStore.setRouteNames(currentRoute.value.name);
  }, 0);
};

// 关闭当前
const closeCurrent = () => {
  onDelete(currentRoute.value.name);
};

// 关闭右侧&关闭左侧
const closeSides = (type: string) => {
  // 获得当前index
  let currentIndex = tabsList.value.findIndex((item: Menu.MenuOptions) => item.name === currentRoute.value.name);
  // 过滤出两侧可关闭的 affix: false 表示可关闭
  let rightList = tabsList.value.filter((item: Menu.MenuOptions, index: number) => {
    if (type == "right") {
      if (index > currentIndex && !item.meta.affix) return item;
    } else {
      if (index < currentIndex && !item.meta.affix) return item;
    }
  });
  // 返回可关闭名称
  let rightNames = rightList.map((item: Menu.MenuOptions) => item.name);
  // 删除右侧
  tabsList.value = tabsList.value.filter((item: Menu.MenuOptions) => !rightNames.includes(item.name));
  // 删除缓存
  routerStore.removeRouteNames(rightNames);
};

// 关闭其它&关闭全部
const closeOther = (type: string) => {
  // 过滤出可关闭项 affix: false 表示可关闭
  let list = tabsList.value.filter((item: Menu.MenuOptions) => {
    if (type == "other") {
      if (item.name != currentRoute.value.name && !item.meta.affix) {
        return item;
      }
    } else {
      if (!item.meta.affix) {
        return item;
      }
    }
  });
  // 返回可关闭名称
  let rightNames = list.map((item: Menu.MenuOptions) => item.name);
  // 删除可关闭项
  tabsList.value = tabsList.value.filter((item: Menu.MenuOptions) => !rightNames.includes(item.name));
  // 删除缓存
  routerStore.removeRouteNames(rightNames);
  // 关闭全部，跳转最后一个
  if (tabsList.value.length != 0 && !currentRoute.value.meta.affix && type == "all") {
    router.push(tabsList.value.at(-1).path);
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  height: 40px;
  box-sizing: border-box;
  border-bottom: $border-1 solid $color-border-2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tabs_setting {
    margin: 0 0 0 $margin;
    .setting {
      margin-right: $margin;
      color: $color-text-2;
    }
  }
}
:deep(.arco-tabs-nav-tab) {
  // 移入展示关闭icon
  .arco-tabs-tab-closable {
    svg {
      width: 0px;
      transition: all 0.2s;
    }
    &:hover {
      svg {
        width: 1em;
      }
    }
  }
  // 消除tab移入的背景色
  &:hover .arco-tabs-tab-title::before {
    background: unset;
  }
}
// 消除tabs底部边线
:deep(.arco-tabs-nav) {
  &::before {
    background: unset;
  }
}
</style>
