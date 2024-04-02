<template>
  <a-layout-sider collapsible breakpoint="xl" @collapse="onCollapse">
    <div class="logo_head">
      <img :src="Logo" class="logo" />
      <span class="logo_title" v-if="!collapse">dc admin</span>
    </div>
    <a-scrollbar outer-class="aside_scroll">
      <a-menu :default-open-keys="['0']" :default-selected-keys="['0_2']" breakpoint="xl" :collapsed="collapse">
        <a-sub-menu key="0">
          <template #icon><icon-apps></icon-apps></template>
          <template #title>Navigation 1</template>
          <a-menu-item key="0_0">Menu 1</a-menu-item>
          <a-menu-item key="0_1">Menu 2</a-menu-item>
          <a-menu-item key="0_2">Menu 3</a-menu-item>
          <a-menu-item key="0_3">Menu 4</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="1">
          <template #icon><icon-bug></icon-bug></template>
          <template #title>Navigation 2</template>
          <a-menu-item key="1_0">Menu 1</a-menu-item>
          <a-menu-item key="1_1">Menu 2</a-menu-item>
          <a-menu-item key="1_2">Menu 3</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="2">
          <template #icon><icon-bulb></icon-bulb></template>
          <template #title>Navigation 3</template>
          <a-menu-item key="2_0">Menu 1</a-menu-item>
          <a-menu-item key="2_1">Menu 2</a-menu-item>
          <a-sub-menu key="2_2" title="Navigation 4">
            <a-menu-item key="2_2_0">Menu 1</a-menu-item>
            <a-menu-item key="2_2_1">Menu 2</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </a-scrollbar>
  </a-layout-sider>
</template>

<script setup lang="ts">
import Logo from "@/assets/img/logo.jpg";
import { Message } from "@arco-design/web-vue";

const collapse = ref<boolean>(false);
const onCollapse = (val: boolean, type: string) => {
  console.log("收缩", val, type);
  collapse.value = val;
  const content = type === "responsive" ? "触发响应式收缩" : "点击触发收缩";
  Message.info({
    content,
    duration: 2000
  });
};
</script>

<style lang="scss" scoped>
.logo_head {
  height: 60px;
  box-shadow: inset 0 0 0 1px red;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .logo {
    width: 50px;
  }
  .logo_title {
    font-weight: bold;
    font-size: $font-size-title-2;
  }
}

.aside_scroll {
  width: 100%;
  height: calc(100% - 60px);
  box-shadow: inset 0 0 0 1px black;
}
</style>
