<template>
  <a-watermark :content="watermark" v-bind="watermarkConfig">
    <a-layout-content class="layout-main-content">
      <Tabs v-if="isTabs" />
      <router-view v-slot="{ Component, route }">
        <MainTransition>
          <keep-alive :include="cacheRoutes">
            <component :is="Component" :key="route.name" v-if="refreshPage" />
          </keep-alive>
        </MainTransition>
      </router-view>
    </a-layout-content>
  </a-watermark>
</template>

<script setup lang="ts">
import Tabs from "@/layout/components/Tabs/index.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
import { useRoutesListStore } from "@/store/modules/route-list";
const themeStore = useThemeConfig();
let { refreshPage, isTabs, watermark, watermarkStyle, watermarkRotate, watermarkGap } = storeToRefs(themeStore);
const routerStore = useRoutesListStore();
const { cacheRoutes } = storeToRefs(routerStore);

// 水印配置
const watermarkConfig = computed(() => {
  return {
    font: watermarkStyle.value,
    rotate: watermarkRotate.value,
    gap: watermarkGap.value
  };
});

watch(watermarkConfig, newv => {
  console.log(newv);
});
</script>

<style lang="scss" scoped>
.layout-main-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

// 修改左侧滚动条宽度-主要针对main窗口内的滚动条
:deep(.arco-scrollbar-thumb-direction-vertical .arco-scrollbar-thumb-bar) {
  width: 4px;
  margin-left: 8px;
}
</style>
