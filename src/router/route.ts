/**
 * 路由path路径与文件夹名称相同，找文件可以浏览器地址快速查找，方便定位文件
 *
 * 路由meta对象参数，我们通常将属性放到meta对象中
 * meta: {
 * title:       菜单栏以及 tabsView 栏、菜单搜索名称（国际化）
 * hide:        是否隐藏此路由，不会显示在菜单树，可以访问
 * disable:     是否停用，不会显示在菜单树，且不可访问
 * keepAlive:   是否缓存组件状态
 * affix:       是否固定在 tabsView 栏上
 * link:        是否是超链接菜单，开启外链条件：1、 link：链接地址不为空  2、iframe: false
 * iframe:      是否内嵌窗口，开启条件：1、iframe：true  2、link：链接地址不为空
 * roles:       当前路由权限表示，取角色管理。路由控制显示、隐藏。 超级管理员：admin；普通角色：common
 * icon:        菜单、tabsView 图标等
 * svgIcon:     svg图标
 * sort:        排序
 * }
 */

/**
 * 静态路由 （默认路由）
 * 此路由不要动，用于做静态路由定向，如果要添加路由，请在 `dynamicRoutes数组` 中添加
 * @description 前端控制路由 直接改 dynamicRoutes 中的路由，后端控制则不需要，请求接口路由数据时，覆盖 dynamicRoutes 第一个顶层 children 的内容（全屏，不包括 lauyout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: "login"
    }
  }
  /**
   * 提示：写在这里的为全屏界面，不建议写在这里
   * 非全屏界面，请写在 dynamicRoutes 路由数组中
   */
];

/**
 * 定义401、404、500界面
 * 401无权限
 * 404页面不存在
 * 500网络断开
 * @link 参考：https://router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const notFoundAndNoPower = [
  {
    path: "/401", // 无权限，跳转401
    name: "no-access",
    component: () => import("@/views/error/401.vue"),
    meta: {
      title: "no-access",
      hide: true
    }
  },
  {
    path: "/500", // 无网络-浏览器离线
    name: "no-network",
    component: () => import("@/views/error/500.vue"),
    meta: {
      title: "no-network",
      hide: true
    }
  },
  {
    path: "/:path(.*)*", // 匹配任意路由，兜底，未找到页面的时候跳转该页面
    name: "not-found",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "not-found",
      hide: true
    }
  }
];
