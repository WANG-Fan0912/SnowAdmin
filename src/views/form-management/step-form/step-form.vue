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
          <div v-if="currentStep == 1">
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
          </div>
          <div v-if="currentStep == 2">
            <a-form-item field="source" label="广告来源">
              <a-input v-model="form.source" placeholder="请输入广告来源" />
            </a-form-item>
            <a-form-item field="medium" label="广告媒介">
              <a-input v-model="form.medium" placeholder="请输入广告媒介" />
            </a-form-item>
            <a-form-item field="keyword" label="关键词">
              <a-select v-model="form.keyword" placeholder="请选择关键词" allow-clear>
                <a-option value="1">gitee</a-option>
                <a-option value="2">github</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="tip" label="推送提醒">
              <a-switch v-model="form.tip" />
            </a-form-item>
            <a-form-item field="content" label="广告内容">
              <a-textarea v-model="form.content" placeholder="请输入广告内容" allow-clear />
            </a-form-item>
          </div>

          <a-form-item>
            <a-space>
              <a-button @click="onLastStep">上一步</a-button>
              <a-button html-type="submit" type="primary">下一步</a-button>
            </a-space>
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
  address: "",
  source: "",
  medium: "",
  keyword: "",
  tip: false,
  content: ""
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
  ],
  source: [
    {
      required: true,
      message: "请输入广告来源"
    }
  ],
  medium: [
    {
      required: true,
      message: "请输入广告媒介"
    }
  ],
  keyword: [
    {
      required: true,
      message: "请选择关键词"
    }
  ],
  tip: [
    {
      required: true,
      message: "请选择推送提醒"
    }
  ],
  content: [
    {
      required: true,
      message: "请输入广告内容"
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
  if (currentStep.value == 3) return;
  currentStep.value += 1;
};

const onLastStep = () => {
  if (currentStep.value == 1) return;
  currentStep.value -= 1;
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
