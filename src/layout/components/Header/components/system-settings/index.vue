<template>
  <a-drawer :width="340" :visible="props.systemOpen" @ok="handleOk" @cancel="handleCancel" unmount-on-close>
    <template #title> 系统设置 </template>
    <div>
      <div>
        <div class="title">界面设置</div>
        <div class="flex-row">
          <div>菜单折叠</div>
          <a-switch v-model="collapsed" />
        </div>
        <div class="flex-row">
          <div>面包屑</div>
          <a-switch v-model="isBreadcrumb" />
        </div>
        <div class="flex-row">
          <div>标签栏</div>
          <a-switch v-model="isTabs" />
        </div>
        <div class="flex-row">
          <div>底部栏</div>
          <a-switch v-model="isFooter" />
        </div>
      </div>
      <div>
        <div class="title">水印设置</div>
        <div class="flex-row">
          <div>水印颜色</div>
          <a-switch />
        </div>
        <div class="flex-row">
          <div>水印文案</div>
          <a-input :style="{ width: '100px' }" default-value="content" placeholder="请输入" allow-clear />
        </div>
        <div class="flex-row">
          <div>水印大小</div>
          <a-slider :default-value="50" :style="{ width: '100px' }" />
        </div>
        <div class="flex-row">
          <div>水印角度</div>
          <a-slider :default-value="50" :style="{ width: '100px' }" />
        </div>
        <div class="flex-row">
          <div>水印间隙</div>
          <a-slider :default-value="50" :style="{ width: '100px' }" />
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
const themeStore = useThemeConfig();
const { collapsed, isBreadcrumb, isTabs, isFooter } = storeToRefs(themeStore);
const props = defineProps({
  systemOpen: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(["systemCancel"]);
const handleOk = () => {
  emits("systemCancel");
};
const handleCancel = () => {
  emits("systemCancel");
};
</script>

<style lang="scss" scoped>
.title {
  color: $color-text-1;
  font-size: $font-size-title-1;
  font-weight: bold;
  margin-bottom: $margin;
}
.flex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $margin;
}
</style>
