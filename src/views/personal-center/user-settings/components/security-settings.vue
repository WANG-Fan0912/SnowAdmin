<template>
  <div>
    <a-form :model="form" :style="{ width: '600px' }">
      <a-form-item field="name" label="登录密码">
        <a-input v-model="form.name" placeholder="请输入登录密码" />
      </a-form-item>
      <a-form-item field="name" label="安全手机">
        <a-input v-model="form.name" placeholder="请输入安全手机" />
      </a-form-item>
      <a-form-item field="name" label="安全邮箱">
        <a-input v-model="form.name" placeholder="请输入安全邮箱" />
      </a-form-item>
      <a-form-item field="name" label="密保问题">
        <a-input v-model="form.name" placeholder="请输入密保问题" />
      </a-form-item>
      <a-form-item field="name" label="密保答案">
        <a-input v-model="form.name" placeholder="请输入密保答案" />
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
