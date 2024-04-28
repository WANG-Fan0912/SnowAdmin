import { defineStore } from "pinia";

/**
 * 路由列表
 * @methods setRouteTree  设置路由树
 * @methods setRoutesList 设置路由一维数据
 * @methods setRouteNames 设置路由名称集合
 * @methods setTabs 添加tabs标签页
 * @methods setCurrentRoute 设置系统内的当前路由
 * @methods removeTabsList 删除tabs页的指定路由
 */
export const useRoutesListStore = defineStore("routeList", {
  state: (): any => ({
    routeTree: [], // 有访问权限的路由树
    routeList: [], // 有访问权限的一维路由数组
    cacheRoutes: [], // 所有可缓存路由的路由名
    tabsList: [], // 标签页数据
    currentRoute: {} // 当前路由
  }),
  actions: {
    /**
     * 设置有访问权限的路由树
     * @param {Array} data 一维路由数组
     */
    async setRouteTree(data: Menu.MenuOptions) {
      this.routeTree = data;
    },
    /**
     * 设置有访问权限的一维路由数组
     * @param {Array} data 一维路由数组
     */
    setRouteList(data: any) {
      this.routeList = data;
    },
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
    }
  }
});
