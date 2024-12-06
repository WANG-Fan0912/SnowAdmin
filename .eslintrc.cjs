module.exports = {
  // 运行环境
  env: {
    browser: true,
    es2021: true,
    node: true // 配置后便会启用浏览器和 Node.js 环境，这两个环境中的一些全局变量(如 window 、 global 等)会同时启用。
  },
  // 指定如何解析语法 解析 .vue 文件
  parser: "vue-eslint-parser",
  // 解析器选项
  parserOptions: {
    ecmaVersion: "latest", // 可以配置 ES + 数字(如 ES6)或者 ES + 年份 (如 ES2015)，也可以直接配置为 latest ，启用最新的 ES 语法
    parser: "@typescript-eslint/parser", // ts解析，将ts转换为estree格式，在eslint下通过Espree进行检查
    sourceType: "module" // 默认为 script ，如果使用 ES Module 则应设置为 module
  },

  // 继承配置
  extends: [
    "./.eslintrc-auto-import.json", // 与vite.config.ts-AutoImport-dts路径一致
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier", // 1.加入 prettier 配置
    "plugin:prettier/recommended" // prettier配置要写在eslint配置后面
  ],
  // ESLint插件系统
  // 添加插件后只是拓展了 ESLint 本身的规则集，但 ESLint 默认并没有开启这些规则的校验，需要在rules进行配置要开启或者调整这些规则
  plugins: [
    "@typescript-eslint", // 拓展一些关于 TS 代码的规则
    "vue",
    // 2. 加入 prettier 的 eslint 插件
    "prettier"
  ],
  /**
   * key 为规则名，value 配置内容，数组第一项为规则的ID ，第二项为规则的配置
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    "prettier/prettier": "error",

    // 配置：
    // eslint (http://eslint.cn/docs/rules)
    "no-var": "error", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
    "prefer-const": "off", // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
    "no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们

    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    "@typescript-eslint/no-empty-function": "error", // 禁止空函数
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    "@typescript-eslint/ban-ts-comment": "error", // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    "@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/ban-types": "off", // 禁止使用特定类型
    "@typescript-eslint/no-var-requires": "off", // 允许使用 require() 函数导入模块
    "@typescript-eslint/no-non-null-assertion": "off", // 不允许使用后缀运算符的非空断言(!)

    // vue (https://eslint.vuejs.org/rules)
    "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该 no-unused-vars 规则时有效
    "vue/v-slot-style": "error", // 强制执行 v-slot 指令样式
    "vue/no-mutating-props": "error", // 不允许改变组件 prop
    "vue/custom-event-name-casing": "error", // 为自定义事件名称强制使用特定大小写
    "vue/html-closing-bracket-newline": "error", // 在标签的右括号之前要求或禁止换行
    "vue/attribute-hyphenation": "error", // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
    "vue/attributes-order": "off", // vue api使用顺序，强制执行属性顺序
    "vue/no-v-html": "off", // 禁止使用 v-html
    "vue/require-default-prop": "off", // 此规则要求为每个 prop 为必填时，必须提供默认值
    "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
    "vue/no-setup-props-destructure": "off" // 禁止解构 props 传递给 setup
  }
};
