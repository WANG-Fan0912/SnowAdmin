<template>
  <div
    class="fill-page-size"
    :style="{
      height: viewportHeight
    }"
  >
    <div class="fill-page-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
const themeStore = useThemeConfig();
let { isTabs, isFooter } = storeToRefs(themeStore);
// footer: 30px
// tabs: 40px
// head: 60px
const viewportHeight = computed(() => {
  // 有tabs、有footer
  if (isTabs.value && isFooter.value) {
    return `calc(100vh - 60px - 30px - 40px)`;
  } else if (!isTabs.value && isFooter.value) {
    // 无tabs，有footer
    return `calc(100vh - 60px - 30px)`;
  } else {
    // 无tabs、无footer，直接减去顶部head
    return `calc(100vh - 60px)`;
  }
});
</script>

<style lang="scss" scoped>
.fill-page-size {
  padding: $padding;
  box-sizing: border-box;
}
.fill-page-inner {
  height: 100%;
  box-sizing: border-box;
  padding: $padding;
  background: $color-bg-1;
  overflow: hidden;
}
</style>
