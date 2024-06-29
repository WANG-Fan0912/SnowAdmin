<template>
  <FillPage>
    <iframe :src="link" class="iframe-size"> </iframe>
  </FillPage>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const link = ref<string>(route.meta.link as string);
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
