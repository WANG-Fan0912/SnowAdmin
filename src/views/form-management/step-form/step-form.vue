<template>
  <div class="dc-page container">
    <a-row>
      <a-col :span="12" :offset="6">
        <a-steps :current="currentStep" line-less>
          <a-step description="创建渠道活动">基本信息</a-step>
          <a-step description="完善活动渠道信息">活动渠道</a-step>
          <a-step description="创建成功">完成创建</a-step>
        </a-steps>
      </a-col>
    </a-row>
    <a-row class="margin-top">
      <a-col :span="8" :offset="8">
        <a-form ref="formRef" :model="form" :rules="rules" @submit="handleSubmit">
          <a-form-item field="name" label="活动名称">
            <a-input v-model="form.name" placeholder="请输入活动名称" />
          </a-form-item>
          <a-form-item field="type" label="渠道类型">
            <a-select v-model="form.type" placeholder="请选择渠道类型" allow-clear>
              <a-option value="1">gitee</a-option>
              <a-option value="2">github</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="date" label="推广时间">
            <a-date-picker v-model="form.date" placeholder="请选择推广时间" style="width: 100%" />
          </a-form-item>
          <a-form-item field="address" label="推广地址">
            <a-input v-model="form.address" placeholder="请输入推广地址" />
            <template #extra>
              <div>从哪些渠道了解到该项目，例如gitee：https://gitee.com/wang_fan_w/dc-admin</div>
            </template>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" type="primary">下一步</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
const currentStep = ref(1);
const form = ref({
  name: "",
  type: null,
  date: "",
  address: ""
});
const rules = ref({
  name: [
    {
      required: true,
      message: "请输入活动名称"
    }
  ],
  type: [
    {
      required: true,
      message: "请选择渠道类型"
    }
  ],
  date: [
    {
      required: true,
      message: "请选择推广时间"
    }
  ],
  address: [
    {
      required: true,
      message: "请输入推广地址"
    }
  ]
});
const formRef = ref();
interface ISubmit {
  values: Record<string, any>;
  errors: Record<string, any> | undefined;
}
const handleSubmit = ({ values, errors }: ISubmit) => {
  console.log("values:", values, "\nerrors:", errors);
  if (errors) return;
};
</script>

<style lang="scss" scoped>
.container {
  padding: 80px 0;
}
.margin-top {
  margin-top: 80px;
}
</style>
