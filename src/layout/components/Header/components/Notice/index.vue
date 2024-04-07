<template>
  <a-tabs default-active-key="1">
    <a-tab-pane v-for="item in noticeData" :key="item.id">
      <template #title>{{ `${item.title}(${item.data.length})` }}</template>
      <div class="notice" v-for="content in item.data" :key="content.id">
        <a-image width="36" height="36" fit="cover" :src="Tom" class="notice_img" />
        <div class="content margin-left-text">
          <div>
            <span>{{ content.nickname }}</span>
            <span>{{ content.time }}</span>
          </div>
          <div></div>
        </div>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import Tom from "@/assets/img/tom.jpg";
const data = ref([
  { id: 100, img: "", time: "1分钟前", nickname: "兔子先森", content: "一键三连" },
  { id: 120, img: "", time: "1小时前", nickname: "Crazy Cat's Eye", content: "中午吃什么？" },
  { id: 130, img: "", time: "2小时前", nickname: "forever", content: "forever you" }
]);
const noticeData = ref([
  {
    id: 1,
    title: "通知",
    data: data.value
  },
  { id: 2, title: "消息", data: data.value },
  { id: 3, title: "代办", data: [] }
]);
</script>

<style lang="scss" scoped>
.notice {
  margin-bottom: $margin;
  display: flex;
  align-items: center;
  border: 1px solid red;
  .notice_img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .content {
    width: 200px;
    border: 1px solid blue;
  }
}
// 解决tabs宽度异常的bug
:deep(.arco-tabs-content .arco-tabs-content-list) {
  display: unset;
}
</style>
