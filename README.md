# SnowAdmin

### 介绍 📖

SnowAdmin 是一个清新优雅、高颜值且功能强大的后台管理模板，基于最新的前端技术栈，包括 Vue3, Vite5, TypeScript, Pinia。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。SnowAdmin 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。



### 版本 📦

**预览及文档** 

项目预览地址：[SnowAdmin](http://101.126.93.137/#/login)

项目文档地址：[SnowAdmin-开发指南](http://101.126.93.137:81/)

**代码仓库**

| 平台   | 仓库地址                                                 |
| ------ | -------------------------------------------------------- |
| GitHub | [Github 仓库](https://github.com/WANG-Fan0912/SnowAdmin) |
| Gitee  | [Gitee 仓库](https://gitee.com/wang_fan_w/SnowAdmin)     |



### 先行预览

![登录页](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/%E7%99%BB%E5%BD%95%E9%A1%B5.jpg)

![首页](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/%E9%A6%96%E9%A1%B5.jpg)

![文件库](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/%E6%96%87%E4%BB%B6%E5%BA%93.jpg)

![国际化](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/%E5%9B%BD%E9%99%85%E5%8C%96.jpg)

![横向布局](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/%E6%A8%AA%E5%90%91%E5%B8%83%E5%B1%80.jpg)

![混合布局](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/%E6%B7%B7%E5%90%88%E5%B8%83%E5%B1%80.jpg)

![主题配置](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE.jpg)

![黑暗模式-1](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/%E9%BB%91%E6%9A%97%E6%A8%A1%E5%BC%8F.jpg)

![黑暗模式-2](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/%E9%BB%91%E6%9A%97%E6%A8%A1%E5%BC%8F-2.jpg)

![黑暗模式-3](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/%E9%BB%91%E6%9A%97%E6%A8%A1%E5%BC%8F-3.jpg)



### 项目功能 🔨

- 清晰的项目架构：结构清晰，优雅易懂，代码全注释。
- 前沿技术应用：采用 Vue3, Vite5, TypeScript等最新流行的技术栈。
- 使用 Pinia 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
- 支持 Arco-Design 组件大小切换、多主题布局、暗黑模式、i18n 国际化
- 使用 VueRouter 配置动态路由权限拦截、路由懒加载，支持页面按钮权限控制
- 使用 KeepAlive 对页面进行缓存，支持多级嵌套路由缓存
- 使用 Prettier 统一格式化代码，集成 ESLint、Stylelint 代码校验规范
- 使用 husky、lint-staged、commitlint等插件，规范提交信息
- 丰富的页面组件：内置多样页面和组件，包括 401、404、500 页面，以及布局组件、标签组件、主题配置组件等。



### 环境准备 🏝️

确保你的环境满足以下要求：

- **git**: 你需要 git 来克隆和管理项目版本。
- **NodeJS**: >=18.12.0，推荐 20.12.0 或更高。
- **pnpm**: >= 8.7.0，推荐最新版本。



### 安装使用步骤 📔

### 从 GitHub 获取代码 🔗

```bash
# 克隆代码
git clone https://github.com/WANG-Fan0912/SnowAdmin.git
```



### 从 Gitee 获取代码 🔗

```bash
# 克隆代码
git clone https://gitee.com/wang_fan_w/SnowAdmin.git
```



### 安装依赖 📌

安装项目依赖

```bash
pnpm install
```



### 插件配置 🛠️

安装 Vue - Official，禁用 Vetur

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 服务插件



### 项目启动 🚀

```json
{
  // 开发环境启动
  "dev": "vite",
  // 开发环境构建
  "build:dev": "vue-tsc && vite build --mode development",
  // 生产环境构建
  "build:prod": "vue-tsc && vite build --mode production",
  // 测试环境构建
  "build:test": "vue-tsc && vite build --mode test",
  // 预览环境启动
  "preview": "vite preview"
}
```



### 文件资源目录 📚

```text
SnowAdmin
├─ .husky                 # husky 配置文件
├─ .vscode                # VSCode 推荐配置
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ hooks               # 常用 Hooks 封装
│  ├─ lang                # 语言国际化 i18n
│  ├─ layout              # 框架布局模块
│  ├─ router              # 路由管理
│  ├─ store               # pinia store
│  ├─ style               # 全局样式文件
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 项目主组件
│  ├─ main.ts             # 项目入口文件
│  └─ vite-env.d.ts       # 指定 ts 识别 vue
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.cjs          # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .prettierignore        # 忽略 Prettier 格式化
├─ .prettierrc.cjs        # Prettier 格式化配置
├─ commitlint.config.cjs  # git 提交规范配置
├─ index.html             # 入口 html
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件
```



### 浏览器支持 🌎

- 本地开发推荐使用 Chrome 最新版浏览器 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 生产环境支持现代浏览器，不再支持 IE 浏览器，更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)。

| ![IE](https://i.imgtg.com/2023/04/11/8z7ot.png) | ![Edge](https://i.imgtg.com/2023/04/11/8zr3p.png) | ![Firefox](https://i.imgtg.com/2023/04/11/8zKiU.png) | ![Chrome](https://i.imgtg.com/2023/04/11/8zNrx.png) | ![Safari](https://i.imgtg.com/2023/04/11/8zeGj.png) |
| :---------------------------------------------: | :-----------------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: |
|                   not support                   |                  last 2 versions                  |                   last 2 versions                    |                   last 2 versions                   |                   last 2 versions                   |



<!-- ### 项目后台接口 🧩

建设中 -->



### 鸣谢列表 🧩

- [vue：https://v3.cn.vuejs.org/](https://v3.cn.vuejs.org/)
- [axios：https://github.com/axios/axios](https://github.com/axios/axios)
- [nprogress：https://github.com/rstacruz/nprogress](https://github.com/rstacruz/nprogress)
- [sortablejs：https://github.com/SortableJS/Sortabl](https://github.com/SortableJS/Sortable)
- [sass：https://github.com/sass/sass](https://github.com/sass/sass)
- [typescript：https://github.com/microsoft/TypeScript](https://github.com/microsoft/TypeScript)
- [vite：https://github.com/vitejs/vite](https://github.com/vitejs/vite)
- [wangeditor：https://github.com/wangeditor-team/wangEditor](https://github.com/wangeditor-team/wangEditor)
- [qrcodejs：https://github.com/davidshimjs/qrcodejs](https://github.com/davidshimjs/qrcodejs)
- [print-js：https://github.com/crabbly/Print.js](https://github.com/crabbly/Print.js)
- [eslint：https://github.com/eslint/eslint](https://github.com/eslint/eslint)
- [prettier：https://github.com/prettier/prettier](https://github.com/prettier/prettier)
- [arco-design：https://arco.design/
- [](https://arco.design/)

### 特别鸣谢 🎉

- [vue-next-admin：http://vuenextadmin.ccfast.cc/](http://vuenextadmin.ccfast.cc/)
- [Gi-admin：https://lin-97.github.io/gi-demo/](https://lin-97.github.io/gi-demo/#/home)
- [Geeker-Admin：https://admin.spicyboy.cn/](https://admin.spicyboy.cn/#/home/index)

感谢以上框架为本项目提供了帮助，项目中的很多设计思想值得参考和学习，再次感谢。



### 支持作者 🌟

如果觉得框架不错，或者已经在使用了，希望你可以去 [Github](https://github.com/WANG-Fan0912/SnowAdmin) 或者 [Gitee](https://gitee.com/wang_fan_w/SnowAdmin) 帮我点个 ⭐ Star，这将是对我极大的鼓励与支持。



### 免责条款 📫

您充分了解并同意，您必须为自己使用本服务及注册帐号下的一切行为负责，包括您所发表的任何内容以及由此产生的任何后果。您应对本服务中的内容自行加以判断，并自行承担因使用内容而引起的所有风险。

`SnowAdmin` 对网站上所显示的信息或资料的准确性、内容、完整性、合法性、可靠性、可操作性或可用性不承担任何责任。

`SnowAdmin` 二次开发使用者因为违法而触犯中华人民共和国法律的，一切后果自己负责，`SnowAdmin` 作者不承担任何责任。

本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。



### 学习 & 商用 🌈

`SnowAdmin` 是免费和开源的，可免费用于学习、商业使用 。



### 捐赠

|                             微信                             |                            支付宝                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![微信](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/Wechat.jpg) | ![支付宝](https://gitee.com/wang_fan_w/snow-image/raw/main/introduce/alipay.jpg) |
