<template>
  <div class="dc-page">
    <a-row align="center">
      <a-col :span="2">
        <div>
          <a-avatar :size="100" @click="toast" trigger-type="mask">
            <img alt="avatar" :src="myImage" />
            <template #trigger-icon>
              <IconEdit />
            </template>
          </a-avatar>
        </div>
      </a-col>
      <a-col :span="12">
        <a-space direction="vertical" size="large">
          <a-descriptions :data="data" title="用户资料" :align="{ label: 'right' }" />
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import myImage from "@/assets/img/my-image.jpg";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const data = ref([
  {
    label: "用户名：",
    value: "admin"
  },
  {
    label: "昵称：",
    value: "兔子先森"
  },
  {
    label: "邮箱：",
    value: "2547096351@qq.com"
  },
  {
    label: "手机号：",
    value: "15888888888"
  },
  {
    label: "地址：",
    value: "浙江杭州"
  }
]);

const toast = () => {
  proxy.$message.info("This is an info message");
};
</script>

<style lang="scss" scoped></style>
