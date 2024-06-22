<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: ""
});
</script>

<style lang="scss" scoped>
.row-title {
  font-size: $font-size-title-1;
}
</style>
