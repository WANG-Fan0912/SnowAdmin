<template>
  <a-layout-footer class="footer">
    <div class="footer_title" @click="onFooter">{{ currentYear }} © SnowAdmin by 兔子先森</div>
  </a-layout-footer>
</template>

<script setup lang="ts">
import dayjs from "dayjs"

const currentYear = dayjs().format("YYYY")

const onFooter = () => {
  window.open("https://github.com/WANG-Fan0912/SnowAdmin", "_blank");
};
</script>

<style lang="scss" scoped>
.footer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 30px;
  border-top: $border-1 solid $color-border-2;
}
.footer_title {
  margin: 0 auto;
  color: $color-text-4;
  text-align: center;
  cursor: pointer;
}
</style>
