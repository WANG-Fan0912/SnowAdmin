import { createRouter, createWebHashHistory } from "vue-router";
import { dynamicRoutes, staticRoutes, notFoundAndNoPower } from "@/router/route.ts";
import { initSetRouter } from "@/router/route-output.ts";
import NProgress from "@/config/nprogress";

/**
 * 创建vue的路由示例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
export const router = createRouter({
  history: createWebHashHistory(),
  /**
   * 说明：
   * 1、notFoundAndNoPower 添加默认 404、401界面，防止提示 No match found for location with path 'xxx'
   * 2、后端控制路由中也需要添加 notFoundAndNoPower 404、401界面
   * 防止 404、401 不在 layout 布局中，不设置的话，404、401界面将全屏显示
   */
  routes: [...dynamicRoutes, ...staticRoutes, ...notFoundAndNoPower] // 这里只需要设置兜底路由即可，其它的路由通过addRoute动态添加
});

// 路由加载前
router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 开启进度条
  console.log(to, from);
  if (to.path === "/login" && !sessionStorage.getItem("token")) {
    next();
  } else if (!sessionStorage.getItem("token")) {
    next("/login");
  } else if (to.path === "/login" && sessionStorage.getItem("token")) {
    next("/home");
  } else {
    await initSetRouter();
  }
  // if (to.path === "/login" && !sessionStorage.getItem("token")) {
  //   next();
  // } else if (!sessionStorage.getItem("token")) {
  //   next("/login");
  // } else if (to.path === "/login" && sessionStorage.getItem("token")) {
  //   next("/home");
  // } else {
  //   // 如果进的不是login，则判断路由，动态添加
  //   // 获取缓存的路由store
  //   const stores = useRoutesListStore(pinia);
  //   const { routesList } = storeToRefs(stores);
  //   // 如果缓存的路由是0，则说明未动态添加路由，先添加再跳转
  //   // 解决刷新页面404的问题
  //   if (routesList.value.length == 0) {
  //     await initSetRouter();
  //     next({ path: to.path, query: to.query });
  //   } else {
  //     // 动态路由添加后走这里，直接放行
  //     next();
  //   }
  // }
});

// 路由跳转错误
router.onError(error => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

// 路由加载后
router.afterEach(() => {
  NProgress.done();
});

export default router;
