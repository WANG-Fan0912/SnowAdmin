<template>
  <div class="finance-box">
    <div class="box-title">
      <div>财务指标</div>
      <div>
        <span><icon-edit /></span>
        <span class="margin-left-text">自定义</span>
      </div>
    </div>
    <a-divider :margin="16" />
    <div class="finance-card">
      <a-card
        hoverable
        v-for="(item, index) in financeData"
        :key="index"
        class="finance-a-card"
        :class="'animated-fade-up-' + index"
      >
        <div class="finance-nav">
          <div class="tag-dot" :style="{ border: `3px solid ${item.color}` }"></div>
          <span class="finance-nav-title">{{ item.title }}</span>
        </div>
        <a-statistic
          :value-style="{
            fontSize: '13px',
            marginLeft: '16px',
            marginTop: '12px'
          }"
          :value="item.value"
          :value-from="0"
          :start="true"
          animation
          show-group-separator
        />
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const financeData = ref([
  {
    id: 1,
    title: "利润总额",
    value: 100000,
    color: "#ff8625"
  },
  {
    id: 2,
    title: "现金",
    value: 750420,
    color: "#165DFF"
  },
  {
    id: 3,
    title: "银行存款",
    value: 100000,
    color: "#39cbab"
  },
  {
    id: 4,
    title: "存贷",
    value: 100000,
    color: "#6c73ff"
  },
  {
    id: 5,
    title: "应收账款",
    value: 100000,
    color: "#2fd0ff"
  }
]);
</script>

<style lang="scss" scoped>
.finance-box {
  margin-top: calc($padding * 2);
  .finance-card {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: $padding;
    grid-row-gap: 0px;
    .finance-a-card {
      .finance-nav {
        display: flex;
        align-items: center;
        .tag-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: $margin-text;
          box-sizing: border-box;
        }
        .finance-nav-title {
          font-size: $font-size-body-1;
        }
      }
    }
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
