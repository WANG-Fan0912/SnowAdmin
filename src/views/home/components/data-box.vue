<template>
  <div class="data-box">
    <div class="sell-histogram">
      <div>
        <span class="data-title">销售额趋势</span>
        <span class="data-subtext">单位：元</span>
      </div>
      <HistogramChart />
    </div>
    <div class="monthly-analysis">
      <div>
        <span class="data-title">现金分析</span>
        <span class="data-subtext">单位：元</span>
      </div>
      <AnalysisChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import HistogramChart from "@/views/home/components/histogram-chart.vue";
import AnalysisChart from "@/views/home/components/analysis-chart.vue";
</script>

<style lang="scss" scoped>
.data-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: calc($padding * 2);
  .data-title {
    font-size: $font-size-body-3;
    color: $color-text-1;
  }
  .data-subtext {
    margin-left: $margin-text;
    font-size: $font-size-body-2;
    color: $color-text-2;
  }
}
</style>
