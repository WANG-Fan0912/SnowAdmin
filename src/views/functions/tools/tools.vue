<template>
  <div class="snow-page">
    <div class="snow-inner">
      <a-alert type="success">工具类位置: src/utils/index.ts</a-alert>
      <a-divider />
      <a-space direction="vertical" fill>
        <div>判断是否为空对象: isEmptyObject</div>
        <div>该函数会根据传入变量判断是否为空对象并返回true/false，区分Object、Array</div>
        <div>
          使用方式：
          <a-typography-text code>isEmptyObject(需要判断的变量)</a-typography-text>
        </div>
      </a-space>
      <a-divider />
      <a-space direction="vertical" fill>
        <div>判断是否为安全环境: isSecureEnvironment</div>
        <div>返回true/fasne，安全环境为https / localhost / 127.0.0.1 / 0.0.0.0</div>
        <div>
          使用方式：
          <a-typography-text code>isSecureEnvironment()</a-typography-text>
        </div>
      </a-space>
      <a-divider />
      <a-space direction="vertical" fill>
        <div>时间戳转年月日时分秒: getTimestamp</div>
        <div>
          年：<a-typography-text code> {{ getTimestamp(Date.now(), "yyyy") }}</a-typography-text>
        </div>
        <div>
          年月：<a-typography-text code> {{ getTimestamp(Date.now(), "yyyy-MM") }}</a-typography-text>
        </div>
        <div>
          年月日：<a-typography-text code> {{ getTimestamp(Date.now(), "yyyy-MM-dd") }}</a-typography-text>
        </div>
        <div>
          年月日时分秒：<a-typography-text code> {{ getTimestamp(Date.now(), "yyyy-MM-dd hh:mm:ss") }}</a-typography-text>
        </div>
        <div>
          使用方式：
          <a-typography-text code>getTimestamp(时间戳, 时间格式)</a-typography-text>
        </div>
      </a-space>
      <a-divider />
      <a-space direction="vertical" fill>
        <div>获取浏览器默认语言: webDefaultLanguage</div>
        <div>该函数会获取浏览器默认语言</div>
        <div>
          使用方式：
          <a-typography-text code>webDefaultLanguage()</a-typography-text>
        </div>
      </a-space>
      <a-divider />
      <a-space direction="vertical" fill>
        <div>查找指定节点的所有父级节点: findParentsTailRecursive</div>
        <div>该函数会根据指定节点查找包含当前节点的所有直属父级节点</div>
        <div>
          使用方式：
          <a-typography-text code>findParentsTailRecursive(树形结构数据, 指定节点key)</a-typography-text>
        </div>
      </a-space>
      <a-divider />
      <a-space direction="vertical" fill>
        <div>数组扁平化-多维转一维: arrayFlattened</div>
        <div>该函数会根据指定key扁平化数组</div>
        <div>
          使用方式：
          <a-typography-text code>arrayFlattened(多维数组, 嵌套的key)</a-typography-text>
        </div>
      </a-space>
      <a-divider />
      <a-space direction="vertical" fill>
        <div>深拷贝: deepClone</div>
        <div>该函数会返回一个与拷贝数据一致的深拷贝变量</div>
        <div>
          使用方式：
          <a-typography-text code>deepClone(需要深拷贝的变量)</a-typography-text>
        </div>
      </a-space>
      <a-divider />
      <a-space direction="vertical" fill>
        <div>乱序的一维数组转化树形结构: buildTreeOptimized</div>
        <div>该函数会返回根据parentId将乱序的一维数组转化为树形结构，返回转化好的树形结构</div>
        <div>
          使用方式：
          <a-typography-text code>buildTreeOptimized(nodes)</a-typography-text>
        </div>
      </a-space>
      <a-divider />
      <a-space direction="vertical" fill>
        <div>根据当前日期前推指定日期: getDatesForwardDate</div>
        <div>该函数会根据当前日期前推指定天数，返回前推天数的日期和当前日期，格式：[YYYY-MM-DD, YYYY-MM-DD]</div>
        <div>
          使用方式：
          <a-typography-text code>getDatesForwardDate(需要前推的天数)</a-typography-text>
        </div>
      </a-space>
      <a-divider />
      <a-space direction="vertical" fill>
        <div>根据指定id递归树查到指定节点: findCategoryById</div>
        <div>该函数会根据指定节点id递归查找树结构，返回查找到的节点，未找到则返回null</div>
        <div>
          使用方式：
          <a-typography-text code>findCategoryById(树形结构, 指定id)</a-typography-text>
        </div>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTimestamp } from "@/utils/index";
</script>

<style lang="scss" scoped></style>
