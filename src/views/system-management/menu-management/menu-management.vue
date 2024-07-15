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

    <a-table :columns="columns" :data="list" :expandable="expandable">
      <template #operation>
        <a-space>
          <a-button size="mini" type="primary">详情</a-button>
          <a-button size="mini">修改</a-button>
          <a-popconfirm content="确定删除这条数据吗?" type="warning">
            <a-button size="mini" type="primary" status="danger">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { dynamicRoutes } from "@/router/route.ts";
// import MenuItemIcon from "@/layout/components/Menu/menu-item-icon.vue";
const expandable = reactive({
  title: "展开",
  width: 80,
  expandedRowRender: record => {
    if (record.key === "3") {
      return `My Name is ${record.name}`;
    }
  }
});

const columns = [
  {
    title: "菜单名称",
    dataIndex: "title"
  },
  {
    title: "图标",
    dataIndex: "icon"
  },
  {
    title: "排序",
    dataIndex: "sort"
  },
  {
    title: "权限标识",
    dataIndex: "power"
  },
  {
    title: "路由",
    dataIndex: "path"
  },
  {
    title: "组件路径",
    dataIndex: "componentPath"
  },
  {
    title: "组件名称",
    dataIndex: "name"
  },
  {
    title: "显示状态",
    dataIndex: "hide"
  },
  {
    title: "是否缓存",
    dataIndex: "keepAlive"
  },
  {
    title: "是否外链",
    dataIndex: "link"
  },
  {
    title: "是否内嵌",
    dataIndex: "iframe"
  },
  {
    title: "操作",
    dataIndex: "operation",
    slotName: "operation"
  }
];

const data = reactive([
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com",
    expand: "Expand Data"
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com"
  },
  {
    key: "3",
    name: "Kevin Sandra",
    salary: 22000,
    address: "31 Park Road, London",
    email: "kevin.sandra@example.com"
  },
  {
    key: "4",
    name: "Ed Hellen",
    salary: 17000,
    address: "42 Park Road, London",
    email: "ed.hellen@example.com"
  },
  {
    key: "5",
    name: "William Smith",
    salary: 27000,
    address: "62 Park Road, London",
    email: "william.smith@example.com"
  }
]);

// const loading = ref(false);
const list = computed(() => {
  if (dynamicRoutes.length > 0) {
    return dynamicRoutes[0].children;
  } else {
    return [];
  }
});

const form = ref({
  name: ""
});

// const onDelete = (cell: any) => {
//   console.log("删除", cell);
// };
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
