<template>
  <div class="banner_box">
    <div class="banner_title">
      <SvgIcon name="snow" size="25" />
      DC-Admin
    </div>
    <div class="banner_img">
      <SvgIcon name="数据时代" size="100%" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
