<template>
  <div class="snow-page">
    <a-form :model="formData.form" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item field="name" label="姓名">
            <a-input v-model="formData.form.name" placeholder="请输入姓名" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="phone" label="手机号">
            <a-input v-model="formData.form.phone" placeholder="请输入手机号" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="email" label="邮箱">
            <a-input v-model="formData.form.email" placeholder="请输入邮箱" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-search />
              </template>
              <template #default>查询</template>
            </a-button>
            <a-button>
              <template #icon>
                <icon-refresh />
              </template>
              <template #default>重置</template>
            </a-button>
            <a-button type="text" @click="formData.search = !formData.search">
              <template #icon>
                <icon-up v-if="formData.search" />
                <icon-down v-else />
              </template>
              <template #default>{{ formData.search ? "收起" : "展开" }}</template>
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="formData.search">
        <a-col :span="6">
          <a-form-item field="address" label="地址">
            <a-input v-model="formData.form.address" placeholder="请输入地址" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="status" label="用户状态">
            <a-select v-model="formData.form.status" placeholder="请选择用户状态" allow-clear>
              <a-option value="1">停用</a-option>
              <a-option value="2">启用</a-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      row-key="key"
      size="small"
      :bordered="{
        cell: true
      }"
      :columns="columns"
      :data="data"
      :row-selection="rowSelection"
      v-model:selectedKeys="selectedKeys"
      :pagination="pagination"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
    >
      <template #avatar="{ record }">
        <a-avatar
          auto-fix-font-size
          :size="30"
          :style="{
            backgroundColor: '#14a9f8'
          }"
        >
          {{ record.avatar }}
        </a-avatar>
      </template>
      <template #status="{ record }">
        <a-space>
          <a-tag size="small" color="green" v-if="record.status == 1">启用</a-tag>
          <a-tag size="small" color="red" v-else>停用</a-tag>
        </a-space>
      </template>
      <template #optional>
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
const formData = reactive({
  form: {
    name: "",
    phone: "",
    email: "",
    address: "",
    status: null
  },
  search: false
});
const selectedKeys = ref([]);
const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false
});
const pagination = ref({ showPageSize: true, showTotal: true, current: 1, pageSize: 10, total: 10 });
const pageChange = (page: number) => {
  pagination.value.current = page;
};
const pageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize;
};
const columns = [
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "头像",
    dataIndex: "avatar",
    slotName: "avatar",
    align: "center"
  },
  {
    title: "手机号",
    dataIndex: "phone"
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "居住地址",
    dataIndex: "address"
  },
  {
    title: "用户状态",
    dataIndex: "status",
    align: "center",
    slotName: "status"
  },
  {
    title: "创建时间",
    dataIndex: "createTime"
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center"
  }
];
const data = reactive([
  {
    key: "1",
    name: "陈思源",
    avatar: "陈",
    phone: "13812345678",
    email: "zhangsan@example.com",
    address: "北京市朝阳区",
    status: 1,
    createTime: "2024-05-27 09:00:00"
  },
  {
    key: "2",
    name: "李婉娴",
    avatar: "李",
    phone: "13987654321",
    email: "lisi@example.com",
    address: "上海市浦东新区",
    status: 0,
    createTime: "2024-05-26 15:30:00"
  },
  {
    key: "3",
    name: "王雨菲",
    avatar: "王",
    phone: "13666666666",
    email: "wangwu@example.com",
    address: "广州市天河区",
    status: 1,
    createTime: "2024-05-25 12:45:00"
  },
  {
    key: "4",
    name: "张晨曦",
    avatar: "张",
    phone: "13788888888",
    email: "zhaoliu@example.com",
    address: "深圳市福田区",
    status: 0,
    createTime: "2024-05-24 11:20:00"
  },
  {
    key: "5",
    name: "赵梦琪",
    avatar: "赵",
    phone: "13599999999",
    email: "qianqi@example.com",
    address: "成都市锦江区",
    status: 1,
    createTime: "2024-05-23 14:10:00"
  },
  {
    key: "6",
    name: "刘昊然",
    avatar: "刘",
    phone: "13377777777",
    email: "sunba@example.com",
    address: "杭州市西湖区",
    status: 0,
    createTime: "2024-05-22 10:05:00"
  },
  {
    key: "7",
    name: "孙梦洁",
    avatar: "孙",
    phone: "13266666666",
    email: "zhoujiu@example.com",
    address: "南京市鼓楼区",
    status: 1,
    createTime: "2024-05-21 08:45:00"
  },
  {
    key: "8",
    name: "黄俊杰",
    avatar: "黄",
    phone: "13155555555",
    email: "wushi@example.com",
    address: "重庆市渝中区",
    status: 0,
    createTime: "2024-05-20 16:30:00"
  },
  {
    key: "9",
    name: "周雨萱",
    avatar: "周",
    phone: "13044444444",
    email: "zhengshiyi@example.com",
    address: "武汉市江汉区",
    status: 1,
    createTime: "2024-05-19 09:20:00"
  },
  {
    key: "10",
    name: "韩雪儿",
    avatar: "韩",
    phone: "13933333333",
    email: "kongshier@example.com",
    address: "西安市雁塔区",
    status: 0,
    createTime: "2024-05-18 13:55:00"
  }
]);
</script>

<style lang="scss" scoped></style>
