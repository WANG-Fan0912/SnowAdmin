<template>
  <div class="snow-page">
    <div class="snow-inner-page">
      <a-form :model="formData.form" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" ref="formRef">
        <a-row :gutter="16">
          <a-col :span="6">
            <a-form-item field="name" label="菜单名称">
              <a-input v-model="formData.form.name" placeholder="请输入菜单名称" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="hide" label="显示状态">
              <a-select v-model="formData.form.hide" placeholder="请选择显示状态" allow-clear>
                <a-option value="1">停用</a-option>
                <a-option value="2">启用</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="disable" label="启用状态">
              <a-select v-model="formData.form.disable" placeholder="请选择启用状态" allow-clear>
                <a-option value="1">停用</a-option>
                <a-option value="2">启用</a-option>
              </a-select>
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
              <a-button @click="onReset">
                <template #icon>
                  <icon-refresh />
                </template>
                <template #default>重置</template>
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
      <a-table :data="tableData" row-key="name" show-empty-tree>
        <template #columns>
          <a-table-column title="菜单名称">
            <template #cell="{ record }">
              {{ $t(`language.${record.meta.title}`) }}
            </template>
          </a-table-column>
          <a-table-column title="图标" align="center">
            <template #cell="{ record }">
              <MenuItemIcon :svg-icon="record.meta.svgIcon" :icon="record.meta.icon" />
            </template>
          </a-table-column>
          <a-table-column title="排序" align="center">
            <template #cell="{ record }">
              {{ record.meta.sort }}
            </template>
          </a-table-column>
          <a-table-column title="显示" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-tag bordered size="small" color="red" v-if="record.meta.hide">隐藏</a-tag>
                <a-tag bordered size="small" color="arcoblue" v-else>显示</a-tag>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="启用状态" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-tag bordered size="small" color="red" v-if="record.meta.disable">禁用</a-tag>
                <a-tag bordered size="small" color="arcoblue" v-else>启用</a-tag>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="操作" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-button size="mini" type="primary" @click="onEdit(record)">修改</a-button>
                <a-button size="mini" type="primary" status="success">新增</a-button>
                <a-button size="mini" type="primary" status="danger">删除</a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuItemIcon from "@/layout/components/Menu/menu-item-icon.vue";
import { dynamicRoutes } from "@/router/route";

const tableData = computed(() => {
  return dynamicRoutes[0].children;
});
const formData = reactive({
  form: {
    name: "",
    hide: "",
    disable: ""
  }
});

const formRef = ref();
const onReset = () => {
  formRef.value.resetFields();
};

const onEdit = (row: Menu.MenuOptions) => {
  console.log("修改", row);
};
</script>

<style lang="scss" scoped></style>
