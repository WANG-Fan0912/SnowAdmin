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
    <!-- 对于奇数的响应式系统来说，普通横向栅格或许满足不了
    这里使用响应式网格系统，根据网格系统来分配每行的空间占比
    这里xl大小每行5个、lg大小每行3个，依此类推，这样可以完美解决奇数的响应式布局
    另外也可以设置横、纵向的网格间距(默认单位px) -->
    <a-grid class="finance-card" :cols="{ xs: 1, sm: 2, lg: 3, xl: 5 }" :col-gap="16" :row-gap="16">
      <a-grid-item v-for="(item, index) in financeData" :key="index">
        <a-card hoverable class="finance-a-card" :class="'animated-fade-up-' + index">
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
      </a-grid-item>
    </a-grid>
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
  .finance-a-card {
    .finance-nav {
      display: flex;
      align-items: center;
      .tag-dot {
        box-sizing: border-box;
        width: 8px;
        height: 8px;
        margin-right: $margin-text;
        border-radius: 50%;
      }
      .finance-nav-title {
        font-size: $font-size-body-1;
      }
    }
  }
}
.box-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: $font-size-body-3;
  color: $color-text-1;
}
.margin-left-text {
  margin-left: $margin-text;
}
</style>
