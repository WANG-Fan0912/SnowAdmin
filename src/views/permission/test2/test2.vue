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
      <code-view :code-json="userPermissions" style="width: 100%" />
      <a-typography-title :heading="4"> 当前页面角色权限 </a-typography-title>
      <code-view :code-json="pageRule" style="width: 100%" />
      <br />
      <a-space>
        <a-button type="primary">新增</a-button>
        <a-button type="primary" status="success">编辑</a-button>
        <a-button type="primary" status="danger">删除</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/modules/user-info";
const route = useRoute();
let userInfoStore = useUserInfoStore();
let { account } = storeToRefs(userInfoStore);
const userPermissions = computed(() => JSON.stringify(account.value.permissions, null));
const pageRule = computed(() => JSON.stringify(route.meta.roles, null));
console.log("权限数据", account.value);
</script>

<style lang="scss" scoped></style>
