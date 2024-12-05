<template>
  <div class="target-box">
    <div class="box-title">
      <div>第三板指标</div>
    </div>
    <a-divider :margin="16" />
    <a-row>
      <a-col :xs="24" :sm="12" :lg="8" :xl="4" class="target-grade" :class="'animated-fade-up-0'">
        <div class="target-grade-innerbox">
          <div class="grade-value">{{ targetData.all.value }}</div>
          <div class="target-title">{{ targetData.all.title }}</div>
        </div>
      </a-col>
      <a-col
        :xs="24"
        :sm="12"
        :lg="8"
        :xl="4"
        v-for="(item, index) in targetData.list"
        :key="index"
        class="target-other"
        :class="'animated-fade-up-' + index"
      >
        <div class="target-other-innerbox">
          <div>
            <span class="other-value">{{ item.value }}</span>
            <span>
              <icon-play-arrow-fill class="target-up" v-if="item.type === 'up'" />
              <icon-play-arrow-fill class="target-down" v-else />
            </span>
          </div>
          <div class="target-title">{{ item.title }}</div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
const targetData = reactive({
  all: {
    title: "综合评分",
    value: 9.9
  },
  list: [
    {
      title: "资产负债率",
      value: "78%",
      type: "up"
    },
    {
      title: "毛利率",
      value: "88%",
      type: "down"
    },
    {
      title: "营业收入增长率",
      value: "58%",
      type: "up"
    },
    {
      title: "净利润增长率",
      value: "76%",
      type: "up"
    },
    {
      title: "净资产收益率",
      value: "76%",
      type: "down"
    }
  ]
});
</script>

<style lang="scss" scoped>
.target-box {
  margin-top: $padding;
  .target-grade {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 60px;
    &::before {
      position: absolute;
      top: 50%;
      right: 0;
      width: 1px;
      height: 30px;
      content: "";
      background: $color-border-2;
      transform: translateY(-50%);
    }
    .target-grade-innerbox {
      text-align: center;
      .grade-value {
        font-family: AliFangYuanTi;
        font-size: $font-size-title-2;
        font-weight: bold;
        color: $color-danger;
      }
    }
  }
  .target-other {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 60px;
    .target-other-innerbox {
      width: 100px;
    }
    .other-value {
      margin-right: $margin-text;
      font-family: AliFangYuanTi;
      font-weight: bold;
    }
    .target-up {
      color: $color-danger;
      transform: rotate(-90deg);
    }
    .target-down {
      color: $color-success;
      transform: rotate(90deg);
    }
  }
  .target-title {
    margin-top: $margin-text;
    color: $color-text-3;
  }
}
.box-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: $font-size-body-3;
  color: $color-text-1;
}
</style>
