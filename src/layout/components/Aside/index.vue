<template>
  <div class="aside">
    <div class="logo_head">
      <img :src="Logo" class="logo" />
      <span class="logo_title" v-if="!collapsed">dc admin</span>
    </div>
    <a-layout-sider :collapsed="collapsed" breakpoint="xl" class="layout_side" :width="220">
      <a-scrollbar style="height: 100%; overflow: auto" outer-class="scrollbar">
        <a-menu show-collapse-button breakpoint="xl" @collapse="onCollapse">
          <a-menu-item key="0_0_0" data-obj="1">Menu 1</a-menu-item>
          <a-sub-menu :key="item" v-for="item in 20">
            <template #icon><icon-apps></icon-apps></template>
            <template #title>Navigation 1</template>
            <a-menu-item key="0_0">Menu 1</a-menu-item>
            <a-menu-item key="0_1">Menu 2</a-menu-item>
            <a-menu-item key="0_2" disabled>Menu 3</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-scrollbar>
    </a-layout-sider>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/assets/img/logo.jpg";

const collapsed = ref<boolean>(false);
const onCollapse = (type: boolean) => {
  collapsed.value = type;
};
</script>

<style lang="scss" scoped>
.aside {
  height: 100vh;
}
// 头部
.logo_head {
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  border-right: $border-1 solid $color-border-2;
  .logo {
    width: 30px;
  }
  .logo_title {
    font-weight: bold;
    font-size: $font-size-title-2;
  }
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
</style>
