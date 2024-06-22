<template>
  <div>
    <a-row align="center" :gutter="[0, 16]">
      <a-col :span="24">
        <a-card>
          <div class="row-title margin-bottom">实名认证</div>
          <a-space direction="vertical" size="large">
            <a-descriptions :data="data" :column="3" :align="{ label: 'right' }" table-layout="fixed" />
          </a-space>
        </a-card>
      </a-col>
      <a-col :span="24">
        <a-card>
          <div class="row-title margin-bottom">认证记录</div>
          <a-table :columns="tableColumns" :data="tableData" size="small">
            <template #optional>
              <a-space>
                <a-button size="mini" type="text">查看</a-button>
                <a-button size="mini" type="text">撤回</a-button>
              </a-space>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
const data = ref([
  {
    label: "用户ID：",
    value: "1000001"
  },
  {
    label: "用户名：",
    value: "admin"
  },
  {
    label: "用户昵称：",
    value: "兔子先森"
  },
  {
    label: "角色：",
    value: "系统管理员"
  },
  {
    label: "权限：",
    value: "全部"
  },
  {
    label: "实名认证：",
    value: "已认证"
  },
  {
    label: "邮箱：",
    value: "2547096351@qq.com"
  },
  {
    label: "手机号：",
    value: "15888888888"
  },
  {
    label: "注册时间：",
    value: "2024-06-20"
  }
]);

const tableColumns = ref([
  {
    title: "认证类型",
    dataIndex: "authenticationType"
  },
  {
    title: "认证内容",
    dataIndex: "authenticationContent"
  },
  {
    title: "当前状态",
    dataIndex: "status"
  },
  {
    title: "创建时间",
    dataIndex: "createTime"
  },
  {
    title: "操作",
    dataIndex: "operation",
    slotName: "optional",
    fixed: "right",
    width: 200
  }
]);
const tableData = reactive([
  {
    key: "1",
    authenticationType: "证件认证",
    authenticationContent: "实名认证，鉴定信息",
    status: "1",
    createTime: "2024-06-20"
  },
  {
    key: "2",
    authenticationType: "证件认证",
    authenticationContent: "实名认证，鉴定信息",
    status: "0",
    createTime: "2024-06-20"
  },
  {
    key: "3",
    authenticationType: "证件认证",
    authenticationContent: "实名认证，鉴定信息",
    status: "1",
    createTime: "2024-06-20"
  }
]);
</script>

<style lang="scss" scoped>
.row-title {
  font-size: $font-size-title-1;
}
.margin-bottom {
  margin-bottom: $padding;
}
</style>
