<template>
  <div class="banner_box">
    <div class="banner_title">
      <SvgIcon name="snow" size="25" @click="onMock" />
      {{ title }}
    </div>
    <div class="banner_img">
      <SvgIcon name="数据时代" size="100%" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { mockTestAPI } from "@/api/modules/test/index";
// 全局title
const title = import.meta.env.VITE_GLOB_APP_TITLE;

const onMock = async () => {
  console.log("模拟数据");
  let res = await mockTestAPI();
  console.log("数据在这", res);
};
</script>

<style lang="scss" scoped>
.banner_box {
  width: 650px;
  height: 100%;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  .banner_title {
    position: absolute;
    display: flex;
    align-items: center;
    column-gap: $margin-text;
    font-size: $font-size-title-1;
    color: $color-primary;
    font-weight: bold;
  }
  .banner_img {
    flex: 1;
  }
}
</style>
