import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { useRoutesListStore } from "@/store/route-list";
/**
 * 路由处理hooks，内置多种路由处理场景
 * @returns 路由方法
 */
export const useRoutingMethod = () => {
  /**
   * 从一维路由中查找路由
   * @param {string} key 路由的name
   * @returns 查找到的路由，undefined则表示未找到
   */
  const findLinearArray = (key: string) => {
    const routerStore = useRoutesListStore(pinia);
    const { routeList } = storeToRefs(routerStore);
    return routeList.value.find((item: Menu.MenuOptions) => item.name == key);
  };

  /**
   * 从tabs路由中查找路由
   * @param {string} key 路由的name
   * @returns 查找到的路由，undefined则表示未找到
   */
  const findTagsList = (key: string) => {
    const routerStore = useRoutesListStore(pinia);
    const { tabsList } = storeToRefs(routerStore);
    return tabsList.value.find((item: Menu.MenuOptions) => item.name == key);
  };
  return {
    findLinearArray,
    findTagsList
  };
};
