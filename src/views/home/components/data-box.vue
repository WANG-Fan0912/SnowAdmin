<template>
  <div class="data-box">
    <div class="sell-histogram">
      <div>
        <span class="data-title">销售额趋势</span>
        <span class="data-subtext">单位：元</span>
      </div>
      <SellHistogram />
    </div>
    <div class="monthly-analysis">
      <div>
        <span class="data-title">现金分析</span>
        <span class="data-subtext">单位：元</span>
      </div>
      <MonthlyAnalysis />
    </div>
  </div>
</template>

<script setup lang="ts">
import SellHistogram from "@/views/home/components/sell-histogram.vue";
import MonthlyAnalysis from "@/views/home/components/monthly-analysis.vue";
</script>

<style lang="scss" scoped>
.data-box {
  margin-top: calc($padding * 2);
  display: flex;
  justify-content: space-between;
  .data-title {
    font-size: $font-size-body-3;
    color: $color-text-1;
  }
  .data-subtext {
    font-size: $font-size-body-2;
    color: $color-text-2;
    margin-left: $margin-text;
  }
  .sell-histogram {
    width: calc(100% - 600px - $padding);
    height: 400px;
    padding-bottom: $padding;
  }
  .monthly-analysis {
    margin-left: $padding;
    width: 600px;
    height: 400px;
    padding-bottom: $padding;
  }
}
</style>
