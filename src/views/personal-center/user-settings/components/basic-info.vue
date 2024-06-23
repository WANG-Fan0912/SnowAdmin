<template>
  <a-row align="center" :gutter="[0, 16]">
    <a-col :span="24">
      <a-card title="基本信息">
        <template #extra>
          <a-link>修改基本信息</a-link>
        </template>
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
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card title="个性信息">
        <template #extra>
          <a-link>修改个性信息</a-link>
        </template>
        <a-form :model="privateForm" layout="horizontal" :label-col-props="{ span: 8 }" :wrapper-col-props="{ span: 16 }">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item field="name" label="我用语雀">
                <a-input v-model="privateForm.name" placeholder="请输入姓名" allow-clear />
              </a-form-item>
              <a-form-item field="name" label="个性性格">
                <a-input v-model="privateForm.name" placeholder="请输入姓名" allow-clear />
              </a-form-item>
              <a-form-item field="name" label="职业工作">
                <a-input v-model="privateForm.name" placeholder="请输入姓名" allow-clear />
              </a-form-item>
              <a-form-item field="name" label="现居城市">
                <a-input v-model="privateForm.name" placeholder="请输入姓名" allow-clear />
              </a-form-item>
              <a-form-item field="name" label="兴趣爱好">
                <a-input v-model="privateForm.name" placeholder="请输入姓名" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="phone" label="邮箱">
                <a-input v-model="privateForm.name" placeholder="请输入手机号" allow-clear />
              </a-form-item>
              <a-form-item field="phone" label="微信">
                <a-input v-model="privateForm.name" placeholder="请输入手机号" allow-clear />
              </a-form-item>
              <a-form-item field="phone" label="思否">
                <a-input v-model="privateForm.name" placeholder="请输入手机号" allow-clear />
              </a-form-item>
              <a-form-item field="phone" label="掘金">
                <a-input v-model="privateForm.name" placeholder="请输入手机号" allow-clear />
              </a-form-item>
              <a-form-item field="phone" label="gitee">
                <a-input v-model="privateForm.name" placeholder="请输入手机号" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="name" label="公众号">
                <a-input v-model="privateForm.name" placeholder="请输入姓名" allow-clear />
              </a-form-item>
              <a-form-item field="name" label="公众号二维码">
                <a-input v-model="privateForm.name" placeholder="请输入姓名" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
const form = ref({
  name: ""
});
const privateForm = ref({
  name: ""
});
</script>

<style lang="scss" scoped>
.row-title {
  font-size: $font-size-title-1;
}
</style>
