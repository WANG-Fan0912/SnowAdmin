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
    <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }" :col-gap="16" :row-gap="16">
      <a-grid-item>
        <div class="title_1">👋关于我</div>
        <div class="type_row" v-for="item in list.aboutMe" :key="item.label">
          <div class="column_title">{{ item.label }}：</div>
          <div v-for="(type, index) in item.value" :key="index">
            <a-tag :color="item.theme">
              {{ type }}
            </a-tag>
          </div>
        </div>
      </a-grid-item>
      <a-grid-item>
        <div class="title_1">💬联系我</div>
        <div class="type_row" v-for="item in list.callMe" :key="item.label">
          <div class="column_title_2">{{ item.label }}：</div>
          <div>{{ item.value }}</div>
        </div>
      </a-grid-item>
      <a-grid-item>
        <div class="title_1">🐾其它</div>
        <div class="type_row" v-for="item in list.other" :key="item.label">
          <div class="column_title_2">{{ item.label }}：</div>
          <div>{{ item.value }}</div>
        </div>
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script setup lang="ts">
import myImage from "@/assets/img/my-image.jpg";

const list = reactive({
  aboutMe: [
    { label: "🐦我用语雀", value: ["知识管理", "记录生活"], theme: "green" },
    { label: "💫个性性格", value: ["天秤座", "INFJ-T"], theme: "blue" },
    { label: "💼职业工作", value: ["互联网", "前端开发"], theme: "orangered" },
    { label: "🏠现居城市", value: ["杭州"], theme: "magenta" },
    { label: "💙兴趣爱好", value: ["读书", "音乐", "狗狗🐕"], theme: "purple" }
  ],
  callMe: [
    { label: "📧邮箱", value: "2547096351@qq.com" },
    { label: "📠微信", value: "fanction-w" },
    { label: "📚思否", value: "兔子先森" },
    { label: "🛰️博客", value: "兔子先森Ace" },
    { label: "✒️掘金", value: "兔子先森Ace" }
  ],
  other: [
    { label: "🧭公众号", value: "DCodes" },
    { label: "🌟公众号二维码", value: "xxx" }
  ]
});
console.log(list);
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

.type_row {
  height: 25px;
  margin-top: $margin;
  display: flex;
  align-items: center;
  column-gap: $margin;
  .column_title {
    min-width: 90px;
  }
  .column_title_2 {
    min-width: 62px;
  }
}

.title_1 {
  font-size: $font-size-title-1;
  font-weight: bold;
}
</style>
