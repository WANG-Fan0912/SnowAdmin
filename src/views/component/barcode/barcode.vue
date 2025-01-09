<template>
  <div class="snow-page">
    <div class="snow-inner">
      <div class="code-box">
        <a-card v-for="item in codeList" :key="item.id" :title="item.docs" :style="{ width: '400px' }" hoverable>
          <div class="card-content">
            <draw-barcode :text="item.text" :options="item.options" />
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const codeList = ref([
  {
    id: 1,
    text: "SnowAdmin",
    docs: "CODE128-默认条形码",
    options: {
      format: "CODE128",
      height: 100
    }
  },
  {
    id: 2,
    text: "SnowAdmin",
    docs: "自定义高度和颜色",
    options: {
      format: "CODE128",
      height: 50,
      background: "#f7f8fa",
      lineColor: "#2962ff"
    }
  },
  {
    id: 3,
    text: "SnowAdmin",
    docs: "设置字体和倾斜",
    options: {
      format: "CODE128",
      height: 100,
      font: "fantasy",
      fontOptions: "italic"
    }
  },
  {
    id: 4,
    text: "SnowAdmin",
    docs: "CODE39-商品条形码",
    options: {
      format: "CODE39",
      height: 100
    }
  },
  {
    id: 5,
    text: "6971318501227",
    docs: "EAN13-商品条形码",
    options: {
      format: "EAN13",
      height: 100
    }
  },
  {
    id: 6,
    text: "123456789999",
    docs: "UPC-商品条形码",
    options: {
      format: "UPC",
      height: 100
    }
  }
]);
</script>

<style lang="scss" scoped>
.code-box {
  display: flex;
  flex-wrap: wrap;
  gap: $margin;
  .card-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }
}
</style>
