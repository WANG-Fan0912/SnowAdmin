<template>
  <div class="shortcut-box">
    <div class="box-title">
      <div>常用功能</div>
      <div>
        <span><icon-edit /></span>
        <span class="margin-left-text">自定义</span>
      </div>
    </div>
    <a-divider :margin="16" />
    <a-row>
      <a-col
        :xs="24"
        :sm="12"
        :lg="8"
        :xl="4"
        v-for="(item, index) in shortcut"
        :key="item.id"
        class="card-middling row-center card-box"
        :class="'animated-fade-up-' + index"
      >
        <SvgIcon :name="item.svg" :size="40" />
        <div class="shortcut-card-label">{{ item.name }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped>
.shortcut-box {
  .card-box {
    margin-bottom: $padding;
    .shortcut-card-label {
      width: 100px;
      font-size: $font-size-body-3;
      margin-left: 20px;
      color: $color-text-2;
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
