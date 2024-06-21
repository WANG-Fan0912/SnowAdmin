<template>
  <div class="dc-page">
    <a-row align="center">
      <a-col :span="2">
        <div>
          <a-avatar :size="100" @click="toast" trigger-type="mask">
            <img alt="avatar" :src="myImage" />
            <template #trigger-icon>
              <IconEdit />
            </template>
          </a-avatar>
        </div>
      </a-col>
      <a-col :span="22">
        <a-space direction="vertical" size="large">
          <a-descriptions :data="data" :column="3" title="用户资料" :align="{ label: 'right' }" />
        </a-space>
      </a-col>
    </a-row>
    <a-divider />
    <a-row>
      <a-col :span="12">
        <div class="row-title">基础信息</div>
        <a-form :model="form" :style="{ width: '600px' }">
          <a-form-item field="name" label="用户ID">
            <a-input v-model="form.name" placeholder="请输入用户昵称" disabled />
          </a-form-item>
          <a-form-item field="name" label="用户昵称">
            <a-input v-model="form.name" placeholder="请输入用户昵称" />
          </a-form-item>
          <a-form-item field="name" label="角色">
            <a-input v-model="form.name" placeholder="请选择角色" />
          </a-form-item>
          <a-form-item field="name" label="权限">
            <a-input v-model="form.name" placeholder="请选择权限" />
          </a-form-item>
          <a-form-item field="name" label="注册时间">
            <a-input v-model="form.name" placeholder="请输入注册时间" />
          </a-form-item>
          <a-form-item>
            <a-button>提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="12">
        <div class="row-title">安全设置</div>
        <a-form :model="form" :style="{ width: '600px' }">
          <a-form-item field="name" label="登录密码">
            <a-input v-model="form.name" placeholder="请输入登录密码" />
          </a-form-item>
          <a-form-item field="name" label="密保问题">
            <a-input v-model="form.name" placeholder="请输入密保问题" />
          </a-form-item>
          <a-form-item field="name" label="密保答案">
            <a-input v-model="form.name" placeholder="请输入密保答案" />
          </a-form-item>
          <a-form-item field="name" label="安全手机">
            <a-input v-model="form.name" placeholder="请输入安全手机" />
          </a-form-item>
          <a-form-item field="name" label="安全邮箱">
            <a-input v-model="form.name" placeholder="请输入安全邮箱" />
          </a-form-item>
          <a-form-item>
            <a-button>提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="24">
        <div class="row-title">实名认证</div>
        <a-space direction="vertical" size="large">
          <a-descriptions :data="data" :column="3" :align="{ label: 'right' }" table-layout="fixed" />
        </a-space>
      </a-col>
      <a-col :span="24">
        <div class="row-title">认证记录</div>
        <a-table :columns="tableColumns" :data="tableData" size="small">
          <template #optional>
            <a-space>
              <a-button size="mini" type="text">查看</a-button>
              <a-button size="mini" type="text">撤回</a-button>
            </a-space>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import myImage from "@/assets/img/my-image.jpg";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
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

const toast = () => {
  proxy.$message.info("修改头像");
};

const form = ref({
  name: ""
});
</script>

<style lang="scss" scoped>
.row-title {
  font-size: $font-size-title-1;
}
</style>
