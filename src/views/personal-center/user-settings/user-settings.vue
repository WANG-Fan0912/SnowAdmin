<template>
  <div class="dc-page">
    <a-row>
      <a-col :span="4">
        <div>
          <a-avatar :size="100">
            <img alt="avatar" :src="myImage" />
          </a-avatar>
        </div>
      </a-col>
      <a-col :span="6">
        <div>头像</div>
      </a-col>
      <a-col :span="6">
        <div>头像</div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import myImage from "@/assets/img/my-image.jpg";
</script>

<style lang="scss" scoped></style>
