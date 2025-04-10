<template>
  <div class="snow-page">
    <div class="snow-inner">
      <a-alert>
        当前页面为
        <a-tag color="green"> 超级管理员 </a-tag>
        权限页面，
        <a-tag color="orange"> 普通角色 </a-tag>
        无法查看
      </a-alert>
      <a-typography-title :heading="4"> 当前用户权限 </a-typography-title>
      <code-view :code-json="permissions" style="width: 100%" />
      <a-typography-title :heading="4"> 当前页面角色权限 </a-typography-title>
      <code-view :code-json="pageRule" style="width: 100%" />
      <br />
      <a-row :gutter="[24, 12]">
        <a-col :span="24">
          <code-view type="vue" :code-json="sysBtn" style="width: 100%" />
        </a-col>
        <a-col :span="24">
          <a-space>
            <span>权限按钮：</span>
            <a-button v-hasPerm="['sys:btn:add']" type="primary">新增</a-button>
            <a-button v-hasPerm="['sys:btn:edit']" type="primary" status="success">编辑</a-button>
            <a-button v-hasPerm="['sys:btn:delete']" type="primary" status="danger">删除</a-button>
          </a-space>
        </a-col>
      </a-row>
      <br />
      <a-row :gutter="[24, 12]">
        <a-col :span="24">
          <code-view type="vue" :code-json="commonBtn" style="width: 100%" />
        </a-col>
        <a-col :span="24">
          <a-space>
            <span>权限按钮：</span>
            <a-button v-hasPerm="['common:btn:add']" type="primary">新增</a-button>
            <a-button v-hasPerm="['common:btn:edit']" type="primary" status="success">编辑</a-button>
            <a-button v-hasPerm="['common:btn:delete']" type="primary" status="danger">删除</a-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/modules/user-info";
const route = useRoute();
let userInfoStore = useUserInfoStore();
let { account } = storeToRefs(userInfoStore);
const permissions = computed(() => JSON.stringify(account.value.permissions, null));
const pageRule = computed(() => JSON.stringify(route.meta.roles, null));

let sysBtn = `<a-space>
  <a-button v-hasPerm="['sys:btn:add']" type="primary">新增</a-button>
  <a-button v-hasPerm="['sys:btn:edit']" type="primary" status="success">编辑</a-button>
  <a-button v-hasPerm="['sys:btn:delete']" type="primary" status="danger">删除</a-button>
</a-space>`;

let commonBtn = `<a-space>
  <a-button v-hasPerm="['common:btn:add']" type="primary">新增</a-button>
  <a-button v-hasPerm="['common:btn:edit']" type="primary" status="success">编辑</a-button>
  <a-button v-hasPerm="['common:btn:delete']" type="primary" status="danger">删除</a-button>
</a-space>`;
</script>

<style lang="scss" scoped></style>
