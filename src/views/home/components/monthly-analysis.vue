<template>
  <div style="height: 100%" ref="monthlyAnalysis"></div>
</template>

<script setup lang="ts">
import { default as VChart } from "@visactor/vchart";
onMounted(() => {
  init();
});

const monthlyAnalysis = ref();
const init = () => {
  const spec = {
    type: "pie",
    data: [
      {
        id: "monthlyAnalysisData",
        values: [
          { type: "固定资产", value: "46.60" },
          { type: "无形资产", value: "27.72" },
          { type: "长期待摊", value: "8.13" },
          { type: "投资性房产", value: "5" },
          { type: "流动资产", value: "3.63" },
          { type: "其它", value: "2.83" }
        ]
      }
    ],
    outerRadius: 0.8,
    innerRadius: 0.5,
    padAngle: 0.6,
    valueField: "value",
    categoryField: "type",
    pie: {
      style: {
        cornerRadius: 0
      },
      state: {
        hover: {
          outerRadius: 0.85,
          stroke: "#fff",
          lineWidth: 1
        },
        selected: {
          outerRadius: 0.85,
          stroke: "#fff",
          lineWidth: 1
        }
      }
    },
    title: {
      visible: true,
      text: "现金分析",
      subtext: "单位：万元"
    },
    legends: {
      visible: true,
      orient: "left"
    },
    label: {
      visible: true
    },
    tooltip: {
      mark: {
        content: [
          {
            key: (datum: any) => datum["type"],
            value: (datum: any) => datum["value"] + "%"
          }
        ]
      }
    }
  };
  let dom = monthlyAnalysis.value;
  console.log("dom", dom);

  const vchart = new VChart(spec as any, { dom: dom });
  vchart.renderSync();
};
</script>

<style lang="scss" scoped></style>
