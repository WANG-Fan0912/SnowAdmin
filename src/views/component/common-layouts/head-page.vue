<template>
  <a-space direction="vertical" fill size="medium">
    <a-card title="头部工具栏">
      <s-layout-tools>
        <template #left>
          <a-button type="primary">
            <template #icon>
              <icon-plus />
            </template>
            新增
          </a-button>
          <a-button type="primary" status="danger">
            <template #icon>
              <icon-delete />
            </template>
            删除
          </a-button>
        </template>
        <template #right>
          <a-input-search :style="{ width: '200px' }" placeholder="请输入关键字" search-button />
          <a-button type="primary" status="success">
            <template #icon>
              <icon-download />
            </template>
          </a-button>
          <a-button type="primary">
            <template #icon>
              <icon-refresh />
            </template>
          </a-button>
        </template>
      </s-layout-tools>
    </a-card>
    <a-card title="搜索栏布局">
      <a-grid :colGap="12" :rowGap="12" :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }" :collapsed="collapsed">
        <a-grid-item>
          <div style="display: flex; column-gap: 12px; align-items: center">
            <span style="white-space: nowrap">姓名</span>
            <a-input style="width: 100%" v-model="form.name" placeholder="请输入姓名" allow-clear />
          </div>
        </a-grid-item>
        <a-grid-item>
          <div style="display: flex; column-gap: 12px; align-items: center">
            <span style="white-space: nowrap">手机号</span>
            <a-input v-model="form.phone" placeholder="请输入手机号" allow-clear />
          </div>
        </a-grid-item>
        <a-grid-item>
          <div style="display: flex; column-gap: 12px; align-items: center">
            <span style="white-space: nowrap">邮箱</span>
            <a-input v-model="form.email" placeholder="请输入邮箱" allow-clear />
          </div>
        </a-grid-item>
        <a-grid-item>
          <div style="display: flex; column-gap: 12px; align-items: center">
            <span style="white-space: nowrap">状态</span>
            <a-input style="width: 100%" v-model="form.name" placeholder="请输入状态" allow-clear />
          </div>
        </a-grid-item>
        <a-grid-item>
          <div style="display: flex; column-gap: 12px; align-items: center">
            <span style="white-space: nowrap">类型</span>
            <a-input style="width: 100%" v-model="form.name" placeholder="请输入类型" allow-clear />
          </div>
        </a-grid-item>
        <a-grid-item>
          <div style="display: flex; column-gap: 12px; align-items: center">
            <span style="white-space: nowrap">机构</span>
            <a-input style="width: 100%" v-model="form.name" placeholder="请输入机构" allow-clear />
          </div>
        </a-grid-item>
        <a-grid-item suffix>
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button>
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
            <a-button type="text" @click="collapsed = !collapsed">
              <template #icon>
                <icon-down />
              </template>
              <span>展开</span>
            </a-button>
          </a-space>
        </a-grid-item>
      </a-grid>
      <!-- <a-row :gutter="12">
        <a-col flex="auto">
          <a-grid :cols="3" :colGap="12">
            <a-grid-item>
              <div style="display: flex; align-items: center; column-gap: 12px">
                <span style="white-space: nowrap">姓名</span>
                <a-input style="width: 100%" v-model="form.name" placeholder="请输入姓名" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item>
              <div style="display: flex; align-items: center; column-gap: 12px">
                <span style="white-space: nowrap">手机号</span>
                <a-input v-model="form.phone" placeholder="请输入手机号" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item>
              <div style="display: flex; align-items: center; column-gap: 12px">
                <span style="white-space: nowrap">邮箱</span>
                <a-input v-model="form.email" placeholder="请输入邮箱" allow-clear />
              </div>
            </a-grid-item>
          </a-grid>
        </a-col>
        <a-col flex="none">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button>
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
            <a-button type="text">
              <template #icon>
                <icon-down />
              </template>
              <span>展开</span>
            </a-button>
          </a-space>
        </a-col>
      </a-row> -->
    </a-card>
  </a-space>
</template>

<script setup lang="ts">
const form = ref<any>({
  name: "",
  phone: "",
  email: "",
  address: "",
  status: null
});

const collapsed = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.tools-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
