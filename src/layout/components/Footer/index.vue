<template>
  <a-layout-footer class="footer">
    <div class="footer_title" @click="onFooter">2024 © SnowAdmin by 兔子先森</div>
  </a-layout-footer>
</template>

<script setup lang="ts">
const onFooter = () => {
  window.open("https://github.com/WANG-Fan0912/SnowAdmin", "_blank");
};
</script>

<style lang="scss" scoped>
.footer {
  height: 30px;
  box-sizing: border-box;
  border-top: $border-1 solid $color-border-2;
  display: flex;
  align-items: center;
}
.footer_title {
  text-align: center;
  margin: 0 auto;
  color: $color-text-4;
  cursor: pointer;
}
</style>
