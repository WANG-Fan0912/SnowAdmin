<template>
  <a-layout-content class="content">
    <Tabs />
    <a-scrollbar style="height: 100%; overflow: auto" outer-class="scrollbar">
      <div class="main">
        <router-view v-slot="{ Component }">
          <MainTransition>
            <keep-alive :include="cacheRoutes">
              <component :is="Component" />
            </keep-alive>
          </MainTransition>
        </router-view>
      </div>
    </a-scrollbar>
  </a-layout-content>
</template>

<script setup lang="ts">
import Tabs from "@/layout/components/Tabs/index.vue";
import { storeToRefs } from "pinia";
import { useRoutesListStore } from "@/store/route-list";
const routerStore = useRoutesListStore();
const { cacheRoutes } = storeToRefs(routerStore);
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 60px - 30px); // 动态切类名-去掉footer
}
.scrollbar {
  height: calc(100% - 40px);
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
