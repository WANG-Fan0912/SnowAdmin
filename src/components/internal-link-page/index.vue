<template>
  <FillPage>
    <div v-if="!isLoading" class="loading-page">
      <div class="dc-loader"></div>
    </div>
    <iframe v-show="isLoading" :src="link" class="iframe-size" id="internalLinkPage"> </iframe>
  </FillPage>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const link = ref<string>(route.meta.link as string);

const isLoading = ref(false); // iframe是否加载完成
onMounted(() => {
  let iframe = document.getElementById("internalLinkPage") as HTMLElement;
  if (iframe) {
    // 加载完成
    iframe.onload = () => {
      isLoading.value = true;
    };
  }
});
</script>

<style lang="scss" scoped>
.iframe-size {
  width: 100%;
  height: 100%;
  border: 0;
  box-sizing: border-box;
  position: absolute; // 设置绝对定位，解决边框滚动条显示问题
}
</style>
