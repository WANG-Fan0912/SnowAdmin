<template>
  <div class="snow-page" style="padding: 100px">
    <div class="my-avatar">
      <a-avatar :size="100">
        <img alt="avatar" :src="myImage" />
      </a-avatar>
      <div class="my-name">
        <div class="my-title">王马Verge</div>
        <div class="my-local">素材投稿：2547096351@qq.com</div>
      </div>
    </div>
    <div class="btn-box">
      <a-button type="outline" style="width: 100px">转发</a-button>
      <a-button type="primary" style="width: 100px" color="#00aeec">关注</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import myImage from "@/assets/img/my-image.jpg";
</script>

<style lang="scss" scoped>
.my-avatar {
  display: flex;
}
.my-name {
  height: 100%;
  margin-left: 10px;
  .my-title {
    font-weight: bold;
    font-size: 20px;
    margin-top: 15px;
  }
  .my-local {
    margin-top: 25px;
  }
}

.btn-box {
  width: 220px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0 0;
}
</style>
