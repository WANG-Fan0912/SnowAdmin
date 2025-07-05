<template>
  <s-full-page>
    <s-fold-page v-model:width="siderWidth">
      <template #sider>
        <a-menu :style="{ width: '100%', height: '100%' }" :selected-keys="[currentMenu]">
          <a-menu-item v-for="item in menuData" :key="item.id">{{ item.title }}</a-menu-item>
        </a-menu>
      </template>
      <template #content>
        <div class="content">
          <FoldPage v-if="currentMenu == 1" />
        </div>
      </template>
    </s-fold-page>
  </s-full-page>
</template>

<script setup lang="ts">
import FoldPage from "@/views/component/common-layouts/fold-page.vue";
interface MenuData {
  id: number;
  title: string;
}
const siderWidth = ref<number>(250);
const menuData = ref<MenuData[]>([{ id: 1, title: "可折叠布局" }]);
const currentMenu = ref<number>(1);
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
}
:deep(.arco-menu-vertical .arco-menu-inner) {
  padding: 0;
}
</style>
