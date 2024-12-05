<template>
  <div>
    <div class="header_crumb">
      <div class="menu_fold">
        <a-button size="mini" type="text" class="menu_fold_icon" id="system-collapsed" @click="onCollapsed">
          <template #icon>
            <icon-menu-fold :size="18" v-if="!collapsed" />
            <icon-menu-unfold :size="18" v-if="collapsed" />
          </template>
        </a-button>
      </div>
      <div class="breadcrumb" v-if="isBreadcrumb">
        <Breadcrumb id="system-breadcrumb" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "@/layout/components/Header/components/Breadcrumb/index.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
const themeStore = useThemeConfig();
const { collapsed, isBreadcrumb } = storeToRefs(themeStore);

// 折叠
const onCollapsed = () => {
  themeStore.setCollapsed(!collapsed.value);
};
</script>

<style lang="scss" scoped>
.header_crumb {
  display: flex;
  align-items: center;
  width: 100%;
  .menu_fold {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 32px;
    height: 32px;
    .menu_fold_icon {
      color: $color-text-1;
      border-radius: $radius-box-1;
    }
  }
  .breadcrumb {
    margin-left: $margin;
  }
}
</style>
