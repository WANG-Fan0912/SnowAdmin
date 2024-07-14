<template>
  <div class="dc-page">
    <div class="title">自定义防抖指令，连续点击按钮，0.5s后执行一次</div>
    <div class="button-box"><a-button type="primary" style="width: 100px" v-antiShake="onClick">防抖</a-button></div>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
const onClick = () => {
  Message.success("0.5s后执行了");
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  color: $color-text-1;
  font-size: $font-size-title-1;
}
.button-box {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
