<template>
  <div class="target-box">
    <div class="box-title">
      <div>第三板指标</div>
    </div>
    <a-divider :margin="16" />
    <div class="row-start-center">
      <div class="target-grade" :class="'animated-fade-up-0'">
        <div class="target-grade-innerbox">
          <div class="grade-value">{{ targetData.all.value }}</div>
          <div class="target-title">{{ targetData.all.title }}</div>
        </div>
      </div>
      <div v-for="(item, index) in targetData.list" :key="index" class="target-other" :class="'animated-fade-up-' + index">
        <div>
          <div>
            <span class="other-value">{{ item.value }}</span>
            <span>
              <icon-play-arrow-fill class="target-up" v-if="item.type === 'up'" />
              <icon-play-arrow-fill class="target-down" v-else />
            </span>
          </div>
          <div class="target-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
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
  margin-top: calc($padding * 2);
  .target-grade {
    width: 180px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &::before {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      content: "";
      height: 30px;
      width: 1px;
      background: $color-border-2;
    }
    .target-grade-innerbox {
      text-align: center;
      .grade-value {
        font-family: "AliFangYuanTi";
        font-size: $font-size-title-2;
        font-weight: bold;
        color: $color-danger;
      }
    }
  }
  .target-other {
    width: 180px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    .other-value {
      font-family: "AliFangYuanTi";
      font-weight: bold;
      margin-right: $margin-text;
    }
    .target-up {
      transform: rotate(-90deg);
      color: $color-danger;
    }
    .target-down {
      transform: rotate(90deg);
      color: $color-success;
    }
  }
  .target-title {
    margin-top: $margin-text;
    color: $color-text-3;
  }
}

.box-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: $font-size-body-3;
  color: $color-text-1;
}
</style>
