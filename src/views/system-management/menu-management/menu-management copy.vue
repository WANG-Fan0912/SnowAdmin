<template>
  <div class="dc-page">
    <a-row :gutter="16" class="bottom-gap">
      <a-col :span="6">
        <a-space>
          <a-button type="primary">
            <template #icon>
              <icon-plus />
            </template>
            <template #default>新增</template>
          </a-button>
          <a-button type="primary" status="danger">
            <template #icon>
              <icon-delete />
            </template>
            <template #default>删除</template>
          </a-button>
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            <template #default>导出</template>
          </a-button>
        </a-space>
      </a-col>

      <a-col :span="6" :offset="12">
        <a-form :model="form" :style="{ width: '100%' }" auto-label-width>
          <a-form-item field="name">
            <a-space>
              <a-input v-model="form.name" placeholder="请输入搜索关键词" />
              <a-button type="primary" status="success">
                <template #icon>
                  <icon-search />
                </template>
                <template #default>搜索</template>
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>

    <a-table
      row-key="key"
      size="small"
      :bordered="{
        cell: true
      }"
      :loading="loading"
      :data="list"
    >
      <template #columns>
        <a-table-column title="菜单名称" :width="180">
          <template #cell="{ record }">
            {{ $t(`language.${record.meta.title}`) }}
          </template>
        </a-table-column>
        <a-table-column title="图标" align="center" :width="100">
          <template #cell="{ record }">
            <MenuItemIcon :svg-icon="record.meta.svgIcon" :icon="record.meta.icon" />
          </template>
        </a-table-column>
        <a-table-column title="排序" align="center" :width="100">
          <template #cell="{ record }">
            {{ record.meta.sort }}
          </template>
        </a-table-column>
        <a-table-column title="权限标识" />
        <a-table-column title="组件路径" />
        <a-table-column title="状态" :width="100">
          <template #cell="{ record }">
            <a-space>
              <a-tag size="small" color="red" v-if="record.hide">禁用</a-tag>
              <a-tag size="small" color="green" v-else>启用</a-tag>
            </a-space>
          </template>
        </a-table-column>
        <a-table-column title="创建时间" />
        <a-table-column title="操作" :width="200">
          <template #cell="cell">
            <a-space>
              <a-button size="mini" type="primary">修改</a-button>
              <a-button size="mini">新增</a-button>
              <a-popconfirm content="确定删除这条数据吗?" type="warning">
                <a-button size="mini" type="primary" status="danger" @click="onDelete(cell)">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { dynamicRoutes } from "@/router/route.ts";
import MenuItemIcon from "@/layout/components/Menu/menu-item-icon.vue";

const form = ref({
  name: ""
});

// const onExpand = (rowKey: string | number) => {
//   console.log("列展开", rowKey);
// };

const loading = ref(false);
const list = computed(() => {
  if (dynamicRoutes.length > 0) {
    return dynamicRoutes[0].children;
  } else {
    return [];
  }
});

const onDelete = (cell: any) => {
  console.log("删除", cell);
};
</script>

<style lang="scss" scoped>
.container-page {
  box-sizing: border-box;
  padding: $padding;
}

.bottom-gap {
  margin-bottom: $padding;
}

:deep(.arco-form-item) {
  margin-bottom: 0;
}
</style>
