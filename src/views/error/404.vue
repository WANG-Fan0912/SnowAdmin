<template>
  <div class="page-404">
    <div>
      <SvgIcon name="内容加载失败" :size="500" />
    </div>
    <div class="prompt">
      <div class="title">404</div>
      <div class="text">抱歉，访问的页面不存在~</div>
      <a-button type="primary" @click="onBack">立即返回</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const onBack = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.page-404 {
  height: 100vh;
  box-sizing: border-box;
  padding: $padding;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .prompt {
    width: 250px;
    row-gap: $padding;
  }
  .title {
    font-size: 80px;
    color: $color-text-1;
  }
  .text {
    font-size: $font-size-body-3;
    color: $color-text-2;
    margin-bottom: $padding;
  }
}
</style>
