<template>
  <div>
    <a-dropdown trigger="hover" :popup-max-height="false">
      <div class="setting"><icon-loop :size="18" /></div>
      <template #content>
        <a-doption v-for="item in tabsMenu.list" :key="item.type" @click="(ev: MouseEvent) => onMenu(ev, item)">
          <template #icon>
            <component :is="item.icon"></component>
          </template>
          <template #default>{{ item.title }}</template>
        </a-doption>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
const tabsMenu = reactive<TabsMenu.list>({
  list: [
    { type: 1, icon: "icon-refresh", title: "refresh" },
    { type: 2, icon: "icon-close", title: "close-current" },
    { type: 3, icon: "icon-left", title: "close-left" },
    { type: 4, icon: "icon-right", title: "close-right" },
    { type: 5, icon: "icon-close-circle", title: "close-other" },
    { type: 6, icon: "icon-folder-delete", title: "close-all" }
  ]
});

const onMenu = (ev: MouseEvent, item: TabsMenu.menu) => {
  console.log("点击", ev, item);
  contextmenuClick(item);
};
// 悬浮菜单点击
const contextmenuClick = (item: TabsMenu.menu) => {
  switch (item.type) {
    case 1:
      // 刷新当前

      break;
    case 2:
      // 关闭当前

      break;
    case 3:
      // 关闭左侧

      break;
    case 4:
      // 关闭右侧

      break;
    case 5:
      // 关闭其它

      break;
    default:
      // 关闭全部

      break;
  }
};
</script>

<style lang="scss" scoped>
.setting {
  margin-right: $margin;
  color: $color-text-2;
}
</style>
