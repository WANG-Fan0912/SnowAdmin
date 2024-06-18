<template>
  <div class="dc-page">
    <div class="my_avatar">
      <a-avatar :size="100">
        <img alt="avatar" :src="myImage" />
      </a-avatar>
      <div class="my_name">
        <div class="my_title title_1">兔子先森</div>
        <div class="my_local"><icon-location />浙江杭州</div>
      </div>
    </div>
    <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :col-gap="16" :row-gap="16">
      <a-grid-item>
        <div class="title_1">👋关于我</div>
      </a-grid-item>
      <a-grid-item>
        <div class="title_1">💬联系我</div>
      </a-grid-item>
      <a-grid-item>
        <div class="title_1">🐾其它</div>
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script setup lang="ts">
import myImage from "@/assets/img/my-image.jpg";
</script>

<style lang="scss" scoped>
.my_avatar {
  display: flex;
  align-items: center;
  margin-bottom: calc($margin * 2);
  .my_name {
    height: 60px;
    margin-left: $margin;
    .my_title {
      height: 30px;
    }
    .my_local {
      font-size: $font-size-body-3;
      height: 30px;
      display: flex;
      align-items: end;
    }
  }
}

.title_1 {
  font-size: $font-size-title-1;
  font-weight: bold;
}
</style>
