<template>
  <div class="fill-page-size" :style="{ height: viewportHeight }">
    <slot></slot>
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
  } else if (isTabs.value && !isFooter.value) {
    // 有tabs，无footer
    return `calc(100vh - 60px - 40px)`;
  } else {
    // 无tabs、无footer，直接减去顶部head
    return `calc(100vh - 60px)`;
  }
});
</script>

<style lang="scss" scoped>
.fill-page-size {
  box-sizing: border-box;

  // box-shadow: $shadow-border-1;
}
</style>
