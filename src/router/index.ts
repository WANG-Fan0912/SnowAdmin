import NProgress from "@/config/nprogress";
import pinia from "@/store/index";
import { createRouter, createWebHashHistory } from "vue-router";
import { staticRoutes, notFoundAndNoPower } from "@/router/route.ts";
import { initSetRouter, currentlyRoute } from "@/router/route-output";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/user-info";
import { useRoutesListStore } from "@/store/route-list";

/**
 * 创建vue的路由示例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
const router = createRouter({
  history: createWebHashHistory(),
  /**
   * 设置静态路由，其它的路由通过addRoute动态添加
   * 1、staticRoutes登录页
   * 2、notFoundAndNoPower 添加默认 404、401界面，防止提示 No match found for location with path 'xxx'
   * 2、后端控制路由中也需要添加 notFoundAndNoPower 404、401界面
   * 静态添加 notFoundAndNoPower 404、401界面将全屏显示
   * 如果要 notFoundAndNoPower 在layout容器展示，则需要移除静态添加并将其添加到缓存路由树
   */
  routes: [...staticRoutes, ...notFoundAndNoPower]
});

/**
 * 路由加载前需要判断用户是否登录
 * 1、去登录页，无token，放行
 * 2、没有token，直接重定向到登录页
 * 3、去登录页，有token，直接重定向到home页
 * 4、去非登录页，有token，校验是否动态添加过路由，添加过则放行，未添加则执行路由初始化
 * 注意：
 * 全局routeTree不能持久化缓存
 * 页面刷新会导致addRoute动态添加的路由失效，需要重新初始化路由
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 开启进度条
  const store = useUserInfoStore(pinia);
  const { token } = storeToRefs(store);
  console.log(to, from);
  if (to.path === "/login" && !token.value) {
    // 1、去登录页，无token，放行
    next();
  } else if (!token.value) {
    // 2、没有token，直接重定向到登录页
    next("/login");
  } else if (to.path === "/login" && token.value) {
    // 3、去登录页，有token，直接重定向到home页
    next("/home");
    // 项目内的跳转，处理跳转路由高亮
    currentlyRoute(to);
  } else {
    // 4、去非登录页，有token，校验是否动态添加过路由，添加过则放行，未添加则执行路由初始化
    const routeStore = useRoutesListStore(pinia);
    const { routeTree } = storeToRefs(routeStore);
    // 如果缓存的路由是0，则说明未动态添加路由，先添加再跳转
    // 解决刷新页面404的问题
    if (routeTree.value.length == 0) {
      await initSetRouter();
      // 处理完重新跳转
      next({ path: to.path, query: to.query });
    } else {
      // 动态路由添加过走这里，直接放行
      next();
      // 项目内的跳转，处理跳转路由高亮
      currentlyRoute(to);
    }
  }
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
