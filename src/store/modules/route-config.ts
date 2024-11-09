import { defineStore } from "pinia";
import router from "@/router/index.ts";
import { RouteRecordRaw } from "vue-router";
import { getMenuListAPI } from "@/api/modules/system/index";
import { moduleReplacement, linearArray } from "@/router/route-output";
/**
 * 路由列表
 * @methods setRouteNames 设置路由名称集合
 * @methods setTabs 添加tabs标签页
 * @methods setCurrentRoute 设置系统内的当前路由
 * @methods removeTabsList 删除tabs页的指定路由
 * @methods removeRouteName 删除缓存路由名，用于取消页面缓存，单个删除
 * @methods removeRouteNames 删除缓存路由名，用于取消页面缓存，批量删除
 * @methods initSetRouter 路由初始化
 */
export const useRoutesConfigStore = defineStore("route-config", {
  state: (): any => ({
    routeTree: [], // 有访问权限的路由树
    routeList: [], // 有访问权限的一维路由数组
    cacheRoutes: [], // 所有可缓存路由的路由名
    tabsList: [], // 标签页数据
    currentRoute: {} // 当前路由
  }),
  actions: {
    /**
     * 设置可缓存路由的路由名
     * @param {string} name 路由名
     */
    setRouteNames(name: string) {
      let state = this.cacheRoutes.some((item: string) => item === name);
      if (state) return;
      this.cacheRoutes.push(name);
    },
    /**
     * 添加tabs标签页
     * @param {object} data 当前tabs路由
     */
    setTabs(data: Menu.MenuOptions) {
      // 当前路由在tags中是否存在，不存在则缓存
      let isExist = this.tabsList.some((item: Menu.MenuOptions) => item.name === data.name);
      if (isExist) return;
      this.tabsList.push(data);
    },
    /**
     * 设置系统内的当前路由数据
     * @param {object} data 当前路由
     */
    setCurrentRoute(data: Menu.MenuOptions) {
      if (this.currentRoute.name && data.name === this.currentRoute.name) return;
      this.currentRoute = data;
    },
    /**
     * 删除tabs页的指定路由
     * @param {string} key 路由name
     */
    removeTabsList(key: string) {
      const index = this.tabsList.findIndex((item: Menu.MenuOptions) => item.name === key);
      if (this.tabsList[index].meta.affix) return;
      if (index === -1) return;
      this.tabsList.splice(index, 1);
    },
    /**
     * 删除缓存路由名，用于取消页面缓存，单个删除
     * @param {string} key 路由名
     */
    removeRouteName(key: string) {
      const index = this.cacheRoutes.findIndex((item: string) => item === key);
      if (index === -1) return;
      this.cacheRoutes.splice(index, 1);
    },
    /**
     * 删除缓存路由名，用于取消页面缓存，批量删除
     * @param {Array} list 路由名
     */
    removeRouteNames(list: Array<string>) {
      this.cacheRoutes = this.cacheRoutes.filter((item: string) => !list.includes(item));
    },
    /**
     * 重置routeTree路由树
     */
    async resetRoute() {
      this.routeTree = [];
    },
    /**
     * 路由初始化
     * 1、将模块设置为真实模块
     * 2、存储路由树，用于生成菜单
     * 3、根据树生成一维路由数组
     * 4、动态添加路由，设置完整的路由，二维路由：顶层路由 + 二级的一维路由
     * 5、动态添加路由
     * 6、缓存一维路由
     */
    async initSetRouter() {
      // 1、获取过滤角色权限后的树，后端做排序处理
      let { data } = await getMenuListAPI();
      // 2、将模块设置为真实模块
      let tree = moduleReplacement(data);
      // 3、存储路由树，用于生成菜单
      this.routeTree = tree[0].children;
      // 4、根据树生成一维路由数组
      tree[0].children = linearArray(tree[0].children);
      // 5、设置完整的路由，二维路由：顶层路由 + 二级的一维路由
      tree[0].redirect = tree[0].children[0].path;
      // 6、动态添加路由
      tree.forEach((route: RouteRecordRaw) => router.addRoute(route));
      console.log("最终路由", tree);
      // 7、缓存一维路由
      this.routeList = tree[0].children;
    }
  }
});
