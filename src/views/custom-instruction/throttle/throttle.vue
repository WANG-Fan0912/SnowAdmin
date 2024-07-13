<template>
  <div class="dc-page">
    <div class="my-page">
      <div class="title">自定义节流指令，连续点击按钮，每间隔1s执行一次</div>
      <div class="button-box">
        <a-button type="primary" style="width: 100px" v-throttle="onClick">1s节流</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
const onClick = () => {
  Message.info("节流执行了");
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
