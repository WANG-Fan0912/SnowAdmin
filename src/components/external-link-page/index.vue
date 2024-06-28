<template>
  <FillPage>
    <div class="external-link-page">
      <div>
        <div class="star-emoji">🌍</div>
        <div class="docs-text">外链页面已经在新窗口中打开</div>
        <div class="to-page"><a-button type="primary" @click="openPage">立即前往</a-button></div>
      </div>
    </div>
  </FillPage>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const openPage = () => {
  window.open(route.meta.link as string, "_blank");
};
</script>

<style lang="scss" scoped>
.external-link-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .star-emoji {
    text-align: center;
    font-size: 100px;
  }
  .docs-text {
    text-align: center;
    color: $color-text-3;
    margin: $margin 0;
  }
  .to-page {
    text-align: center;
    display: flex;
    justify-content: center;
  }
}
</style>
