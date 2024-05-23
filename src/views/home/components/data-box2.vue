<template>
  <div class="data-box">
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="24" :xl="16">
        <div>
          <span class="data-title">销售额趋势</span>
          <span class="data-subtext">单位：元</span>
        </div>
        <SellHistogram />
      </a-col>
      <a-col :xs="24" :sm="24" :xl="8">
        <div>
          <span class="data-title">现金分析</span>
          <span class="data-subtext">单位：元</span>
        </div>
        <MonthlyAnalysis />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import SellHistogram from "@/views/home/components/sell-histogram.vue";
import MonthlyAnalysis from "@/views/home/components/monthly-analysis.vue";
</script>

<style lang="scss" scoped>
.data-box {
  margin-top: calc($padding * 2);
  // border: 1px solid red;
  .data-title {
    font-size: $font-size-body-3;
    color: $color-text-1;
  }
  .data-subtext {
    font-size: $font-size-body-2;
    color: $color-text-2;
  }
}
</style>
