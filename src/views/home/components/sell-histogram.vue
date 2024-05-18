<template>
  <div style="height: 100%" ref="sellHistogram"></div>
</template>

<script setup lang="ts">
import { default as VChart } from "@visactor/vchart";
onMounted(() => {
  init();
});

const sellHistogram = ref();
const init = () => {
  const spec = {
    type: "bar",
    data: [
      {
        id: "sellHistogramData",
        values: [
          { month: "1月", sales: 226 },
          { month: "2月", sales: 136 },
          { month: "3月", sales: 101 },
          { month: "4月", sales: 147 },
          { month: "5月", sales: 108 },
          { month: "6月", sales: 147 },
          { month: "7月", sales: 114 },
          { month: "8月", sales: 131 },
          { month: "9月", sales: 118 },
          { month: "10月", sales: 111 },
          { month: "11月", sales: 117 },
          { month: "12月", sales: 120 }
        ]
      }
    ],
    xField: "month",
    yField: "sales",
    barWidth: 10,
    title: {
      visible: true,
      textType: "text",
      text: "销售额趋势",
      subtext: "单位：万元"
    },
    barGapInGroup: 0
  };
  let dom = sellHistogram.value;
  console.log("dom", dom);

  const vchart = new VChart(spec as any, { dom: dom });
  vchart.renderSync();
};
</script>

<style lang="scss" scoped></style>
