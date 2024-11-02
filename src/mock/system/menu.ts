import type { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError } from "../_utils";
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
 * 4、动态添加路由，设置完整的路由，二维路由：顶层路由 + 二级的一维路由
 * 5、动态添加路由
 * 6、缓存一维路由
 */

// post请求body,get请求query
export default [
  {
    url: "/mock/menu/list",
    method: "get",
    timeout: 300,
    response: ({ headers }: any) => {
      let token = headers.authorization;
      // 这里模拟两个角色，admin、common
      let userRoles = token === "Admin-Token" ? ["admin"] : ["common"];
      systemMenu[0].children = treeSort(filterByRole(systemMenu[0].children, userRoles));
      return resultSuccess(systemMenu);
    }
  }
] as MockMethod[];

/**
 * 路由树递归排序
 * 1、先给当前层排序
 * 2、若当前层有children则递归排序
 * @param {array} tree 根据角色权限过滤后的路由树
 * @returns 返回排序之后的树
 */
export const treeSort = (tree: Menu.MenuOptions[]) => {
  if (!tree || tree.length == 0) return [];
  tree.sort((a: Menu.MenuOptions, b: Menu.MenuOptions) => {
    // a和b都是undefined则相等
    if (a.meta.sort != 0 && !a.meta.sort && b.meta.sort != 0 && !b.meta.sort) {
      return 0;
    }
    // a是undefined则a被排在b之后
    if (a.meta.sort != 0 && !a.meta.sort) return 1;
    // b是undefined则b被排在a之后
    if (b.meta.sort != 0 && !b.meta.sort) return -1;
    return a.meta.sort - b.meta.sort;
  });

  // 深层递归
  return tree.map((item: any) => {
    if (item?.children?.length > 0) {
      item.children = treeSort(item.children);
    }
    return item;
  });
};

/**
 * 过滤路由树，返回有权限的树
 * 1、先过滤停用的菜单，该菜单是不可访问的，直接去掉
 * 2、根据角色权限过滤原始路由树
 * @param {array} tree 根据角色权限过滤原始路由树
 * @returns 返回有权限的树
 */
export const filterByRole = (tree: any, userRoles: Array<string>) => {
  return tree.filter((item: any) => {
    // 过滤角色权限
    if (item?.meta?.roles) {
      if (!roleBase(item.meta.roles, userRoles)) return false;
    }
    // 过滤是否禁用
    if (item?.meta?.disable) return false;
    if (item.children) item.children = filterByRole(item.children, userRoles);
    return true;
  });
};

/**
 * 校验该角色是否有路由权限
 * @param {array} roles 路由的角色权限
 * @returns 是否有权限 true是 false否
 */
export const roleBase = (roles: Array<string>, userRoles: Array<string>) => {
  return userRoles.some((item: string) => roles.includes(item));
};
