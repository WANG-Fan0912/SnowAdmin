<template>
  <div class="home">
    <!-- 常用功能 -->
    <div class="shortcut-box">
      <div class="box-title">
        <div>常用功能</div>
        <div>
          <span><icon-edit /></span>
          <span class="margin-left-text">自定义</span>
        </div>
      </div>
      <a-divider :margin="16" />
      <div class="flex-row-between-center">
        <div class="card-middling row-center" v-for="item in shortcut" :key="item.id">
          <div>
            <SvgIcon :name="item.svg" :size="40" />
            <span class="shortcut-card-label">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 第三板指标 -->
    <div class="target-box">
      <div class="box-title">
        <div>第三板指标</div>
      </div>
      <a-divider :margin="16" />
      <div class="row-start-center">
        <div class="target-grade">
          <div class="target-grade-innerbox">
            <div class="grade-value">{{ targetData.all.value }}</div>
            <div class="target-title">{{ targetData.all.title }}</div>
          </div>
        </div>
        <div class="target-other" v-for="(item, index) in targetData.list" :key="index">
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
    <!-- 财务指标 -->
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
        <a-card class="finance-a-card" hoverable v-for="item in financeData" :key="item.id">
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
    <!-- 数据图 -->
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
  </div>
</template>

<script setup lang="ts">
import SellHistogram from "@/views/home/components/sell-histogram.vue";
import MonthlyAnalysis from "@/views/home/components/monthly-analysis.vue";

const shortcut = ref([
  {
    id: 1,
    name: "数据查询",
    svg: "data-queries"
  },
  {
    id: 2,
    name: "新增凭证",
    svg: "add-voucher"
  },
  {
    id: 3,
    name: "余额查询",
    svg: "balance-inquiry"
  },
  {
    id: 4,
    name: "财务报表",
    svg: "financial-statement"
  },
  {
    id: 5,
    name: "数据统计",
    svg: "data-analysis"
  },
  {
    id: 6,
    name: "更多",
    svg: "more"
  }
]);

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
.home {
  padding: $padding;
  background: $color-bg-1;
}
.box-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: $font-size-body-3;
  color: $color-text-1;
}
.shortcut-box {
  .shortcut-card-label {
    font-size: $font-size-body-3;
    margin-left: 20px;
    color: $color-text-2;
  }
}
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
