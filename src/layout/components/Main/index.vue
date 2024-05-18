<template>
  <a-watermark :content="watermark" v-bind="watermarkConfig">
    <a-layout-content :class="isFooter ? 'content' : 'content-no-footer'">
      <Tabs v-if="isTabs" />
      <a-scrollbar style="height: 100%; overflow: auto" :outer-class="isTabs ? 'scrollbar' : 'scrollbar-no-tabs'">
        <div class="main">
          <router-view v-slot="{ Component, route }">
            <MainTransition>
              <keep-alive :include="cacheRoutes">
                <component :is="Component" :key="route.name" v-if="refreshPage" />
              </keep-alive>
            </MainTransition>
          </router-view>
        </div>
      </a-scrollbar>
    </a-layout-content>
  </a-watermark>
</template>

<script setup lang="ts">
import Tabs from "@/layout/components/Tabs/index.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
import { useRoutesListStore } from "@/store/modules/route-list";
const themeStore = useThemeConfig();
let { refreshPage, isTabs, isFooter, watermark, watermarkStyle, watermarkRotate, watermarkGap } = storeToRefs(themeStore);
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
.content {
  height: calc(100vh - 60px - 30px); // 动态切类名-去掉header、footer
}
.content-no-footer {
  height: calc(100vh - 60px); // 动态切类名-去掉footer
}

.scrollbar {
  height: calc(100% - 40px); // 去掉tabs的高度
  background: $color-fill-1; // 背景颜色
}
.scrollbar-no-tabs {
  height: 100%;
  background: $color-fill-1; // 背景颜色
}

.main {
  padding: $padding;
}

// 修改左侧滚动条宽度
:deep(.arco-scrollbar-thumb-direction-vertical .arco-scrollbar-thumb-bar) {
  width: 4px;
  margin-left: 8px;
}
</style>
