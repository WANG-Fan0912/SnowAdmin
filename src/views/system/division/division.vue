<template>
  <div class="snow-page">
    <div class="snow-inner">
      <a-space wrap>
        <a-input v-model="form.name" placeholder="请输入部门名称" allow-clear />
        <a-select placeholder="部门状态" v-model="form.open" style="width: 120px" allow-clear>
          <a-option v-for="item in openState" :key="item.value" :value="item.value">{{ item.label }}</a-option>
        </a-select>
        <a-button type="primary" @click="search">
          <template #icon><icon-search /></template>
          <span>查询</span>
        </a-button>
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <span>重置</span>
        </a-button>
      </a-space>

      <a-row>
        <a-space wrap>
          <a-button type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-button type="primary" status="danger" @click="onDelete">
            <template #icon><icon-delete /></template>
            <span>删除</span>
          </a-button>
        </a-space>
      </a-row>

      <a-table :data="tableData" default-expand-all-rows :bordered="{ cell: true }" row-key="id">
        <template #columns>
          <a-table-column title="部门名称">
            <template #cell="{ record }">
              {{ record.name }}
            </template>
          </a-table-column>
          <a-table-column title="排序" data-index="sort" :width="100"></a-table-column>
          <a-table-column title="启用状态" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-tag bordered size="small" color="arcoblue" v-if="record.status">启用</a-tag>
                <a-tag bordered size="small" color="red" v-else>禁用</a-tag>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="描述" data-index="description" :ellipsis="true" :tooltip="true"></a-table-column>
          <a-table-column title="创建时间" data-index="createTime" :ellipsis="true" :tooltip="true"></a-table-column>
          <a-table-column title="操作" align="center" :fixed="'right'">
            <template #cell="{ record }">
              <a-space>
                <a-button size="mini" type="primary" @click="onEdit(record)">
                  <template #icon><icon-edit /></template>
                  <span>修改</span>
                </a-button>
                <a-button size="mini" type="primary" status="success">
                  <template #icon><icon-plus /></template>
                  <span>新增</span>
                </a-button>
                <a-button size="mini" type="primary" status="danger" v-if="record.id != '100'">
                  <template #icon><icon-delete /></template>
                  <span>删除</span>
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
const tableData = ref([
  {
    id: "100",
    parentId: "0",
    name: "xxx机构有限公司",
    leader: "兔子先森",
    phone: "15888888888",
    email: "2547096351@qq.com",
    sort: 1,
    status: 1,
    description: "这是总部门",
    createBy: "admin",
    createTime: "2024-03-19 11:21:01",
    updateBy: "admin",
    updateTime: "2024-09-09 10:08:25",
    children: [
      {
        id: "10001",
        parentId: "100",
        name: "研发部门",
        leader: "小唐",
        phone: "",
        email: "",
        sort: 1,
        status: 1,
        description: "这里是研发部门",
        createBy: "admin",
        createTime: "2024-03-19 11:21:01",
        updateBy: "admin",
        updateTime: "2024-09-09 17:30:40",
        children: [
          {
            id: "1000101",
            parentId: "10001",
            name: "SnowAdmin开发组",
            leader: "小汤",
            phone: "",
            email: "",
            sort: 1,
            status: 1,
            description: "这是项目研发部",
            createBy: "admin",
            createTime: "2024-03-19 11:21:01",
            updateBy: "admin",
            updateTime: "2024-09-09 17:30:40",
            children: [
              {
                id: "100010101",
                parentId: "1000101",
                name: "UI组",
                leader: "晓棠",
                phone: "",
                email: "",
                sort: 1,
                status: 1,
                description: "这里负责UI设计",
                createBy: "admin",
                createTime: "2024-03-19 11:21:01",
                updateBy: "admin",
                updateTime: "2024-09-09 17:30:40",
                children: null
              },
              {
                id: "100010102",
                parentId: "1000101",
                name: "研发组",
                leader: "小塘",
                phone: "",
                email: "",
                sort: 2,
                status: 1,
                description: "这里负责开发",
                createBy: "admin",
                createTime: "2024-03-19 11:21:01",
                updateBy: "admin",
                updateTime: "2024-09-09 17:30:40",
                children: null
              }
            ]
          },
          {
            id: "1000102",
            parentId: "10001",
            name: "人事部门",
            leader: "兔子",
            phone: "",
            email: "",
            sort: 2,
            status: 1,
            description: "这里是人事部门",
            createBy: "admin",
            createTime: "2024-03-19 11:21:01",
            updateBy: "admin",
            updateTime: "2024-09-09 17:30:40",
            children: null
          },
          {
            id: "1000103",
            parentId: "10001",
            name: "财务部门",
            leader: "小鹿",
            phone: "",
            email: "",
            sort: 3,
            status: 1,
            description: "负责收账的",
            createBy: "admin",
            createTime: "2024-03-19 11:21:01",
            updateBy: "admin",
            updateTime: "2024-09-09 17:30:40",
            children: null
          }
        ]
      }
    ]
  }
]);
const onEdit = (row: Menu.MenuOptions) => {
  console.log("修改", row);
};
const openState = ref([
  { value: 1, label: "是" },
  { value: 0, label: "否" }
]);
const form = ref({
  name: "",
  code: "",
  open: null
});
const search = () => {
  console.log("搜索");
};
const reset = () => {
  console.log("重置");
};
const onAdd = () => {
  console.log("新增");
};
const onDelete = () => {
  console.log("删除");
};
// const loading = ref(false);
// const pagination = ref({
//   pageSize: 10,
//   showPageSize: true
// });
// const selectedKeys = ref([]);
// const dictList = ref([
//   {
//     id: "01",
//     name: "性别",
//     value: "gender",
//     status: 1,
//     description: "这是一个性别字典",
//     createTime: "2024-07-01 10:00:00",
//     list: [
//       { id: "012", name: "女", value: 0, status: 1 },
//       { id: "011", name: "男", value: 1, status: 1 },
//       { id: "013", name: "未知", value: 2, status: 1 }
//     ]
//   },
//   {
//     id: "02",
//     name: "状态",
//     value: "status",
//     status: 1,
//     description: "想要统一状态字段可以用这个",
//     createTime: "2024-07-01 10:00:00",
//     list: [
//       { id: "021", name: "禁用", value: 0, status: 1 },
//       { id: "022", name: "启用", value: 1, status: 1 }
//     ]
//   },
//   {
//     id: "03",
//     name: "岗位",
//     value: "post",
//     status: 1,
//     description: "岗位字段",
//     createTime: "2024-07-01 10:00:00",
//     list: [
//       { id: "031", name: "总经理", value: 1, status: 1 },
//       { id: "032", name: "总监", value: 2, status: 1 },
//       { id: "033", name: "人事主管", value: 3, status: 1 },
//       { id: "034", name: "开发部主管", value: 4, status: 1 },
//       { id: "035", name: "普通职员", value: 5, status: 1 },
//       { id: "036", name: "其它", value: 999, status: 1 }
//     ]
//   }
// ]);
// const select = (list: []) => {
//   selectedKeys.value = list;
// };
// const selectAll = (state: boolean) => {
//   selectedKeys.value = state ? (dictList.value.map(el => el.id) as []) : [];
// };
// const onDictData = (e: any) => {
//   console.log("字典数据", e);
// };
</script>

<style lang="scss" scoped></style>
