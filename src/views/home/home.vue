<template>
  <div class="home">
    <!-- 常用功能 -->
    <div>
      <div class="shortcut">
        <div>常用功能</div>
        <div>
          <span><icon-unordered-list /></span>
          <span>自定义</span>
        </div>
      </div>
      <a-divider :margin="10" />
      <div>
        <div v-for="item in shortcut" :key="item.id">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const shortcut = ref([
  {
    id: 1,
    name: "数据查询",
    icon: "home",
    path: "/home"
  },
  {
    id: 2,
    name: "新增凭证",
    icon: "dashboard",
    path: "/home"
  },
  {
    id: 3,
    name: "余额查询",
    icon: "component",
    path: "/home"
  },
  {
    id: 4,
    name: "财务报表",
    icon: "component",
    path: "/home"
  },
  {
    id: 5,
    name: "更多",
    icon: "form",
    path: "/home"
  }
]);
</script>

<style lang="scss" scoped>
.home {
  height: 700px;
  border-radius: $radius-box;
  padding: $padding;
  background: #fff;
}
.shortcut {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
