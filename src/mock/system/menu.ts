import type { MockMethod } from "vite-plugin-mock";
import { deepClone, filterByRole, treeSort, resultSuccess } from "../_utils";
import systemMenu from "../_data/system_menu";

/**
 * 初始化
 * 后端TODO
 * 1、根据token判断角色
 * 2、根据角色过滤权限树
 * 3、路由树排序
 * 4、返回路由树
 *
 * 前端TODO
 * 1、将模块设置为真实模块
 * 2、存储路由树，用于生成菜单
 * 3、根据树生成一维路由数组
 * 4、动态添加路由
 * 5、缓存一维路由
 */

// post请求body,get请求query
export default [
  {
    url: "/mock/menu/getMenuList",
    method: "get",
    timeout: 300,
    response: ({ headers }: any) => {
      let token = headers.authorization;
      // 这里模拟两个角色，admin、common
      let userRoles = token === "Admin-Token" ? ["admin"] : ["common"];
      const originTree: any = deepClone(systemMenu);
      return resultSuccess(treeSort(filterByRole(originTree, userRoles)));
    }
  }
] as MockMethod[];
