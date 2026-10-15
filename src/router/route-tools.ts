import { deepClone } from "@/utils/deep-clone";

/**
 * 路由树的处理工具（过滤权限、扁平数组转树、排序）
 * 说明：这套工具不依赖任何 mock 或后端接口，三种数据源（mock / front / server）共用，
 * 保证"无论数据从哪来，最终生成的路由树结构完全一致"
 */

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
 * 1、根据角色权限过滤原始路由树
 * 2、过滤禁用的菜单，该菜单是不可访问的，直接去掉
 * @param {array} tree 根据角色权限过滤原始路由树
 * @returns 返回有权限的树
 */
export const filterByDisable = (tree: any, userRoles: Array<string>) => {
  return tree.filter((item: any) => {
    // 过滤角色权限
    if (item?.meta?.roles) {
      if (!roleBase(item.meta.roles, userRoles)) return false;
    }
    // 过滤是否禁用
    if (item?.meta?.disable) return false;
    return true;
  });
};

/**
 * 校验该角色是否有路由权限
 * @param {array} roles 路由的角色权限
 * @returns 是否有权限 true是 false否
 */
export const roleBase = (roles: Array<string>, userRoles: Array<string>) => {
  // 如果是admin则直接放行
  if (userRoles.includes("admin")) return true;
  // 否则判断权限
  return userRoles.some((item: string) => roles.includes(item));
};

/**
 * 将扁平路由组装成树形结构
 * @param {array} nodes 扁平数组
 * @returns 树形结构
 */
export const buildTreeOptimized = (nodes: Menu.MenuOptions[]) => {
  const nodeMap = new Map(); // 哈希表存储所有节点
  const roots = []; // 存储顶层节点
  const duplicates = new Set(); // 检测重复ID

  // 第一次遍历: 注册所有节点 & 检测重复
  for (const node of nodes) {
    const id = node.id;

    // 循环引用检测
    if (node.id === node.parentId) {
      throw new Error(`循环引用: ${node.id} -> ${node.parentId}`);
    }

    // 重复ID检测
    if (nodeMap.has(id)) {
      duplicates.add(id);
      continue;
    }

    // 初始化子节点为null，这里children必须得是null，因为arco.design的展开列表组件根据数组判断是否显示展开按钮，哪怕是空数组也会显示展开按钮
    node.children = null;
    nodeMap.set(id, node);
  }

  // 输出重复警告
  if (duplicates.size > 0) {
    console.warn(`检测到重复ID: ${Array.from(duplicates).join(", ")}`);
  }

  // 第二次遍历: 构建树结构
  for (const node of nodes) {
    const { parentId } = node;

    // 跳过已处理的重复节点
    if (duplicates.has(node.id)) continue;

    if (parentId === "0") {
      roots.push(node); // 顶层节点
    } else if (parentId) {
      const parent = nodeMap.get(parentId);
      if (parent) {
        // 初始化父节点的children为数组（若为null）
        if (parent.children === null) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    } else {
      console.warn(`独立节点 ${node.id}: parentId为空`);
    }
  }

  return roots;
};

/**
 * 扁平路由 → 有权限的、排好序的路由树（三种数据源共用的统一管道）
 * @param {array} flatRoutes 扁平路由数组
 * @param {array} userRoles 当前账号的角色
 * @returns 路由树
 */
export const buildRouteTree = (flatRoutes: Menu.MenuOptions[], userRoles: Array<string>) => {
  if (!flatRoutes?.length) return [];
  const clone: any = flatRoutes.map((item: any) => deepClone(item));
  // 1、过滤角色权限和禁用菜单
  const survival = filterByDisable(clone, userRoles);
  // 2、扁平转树
  const tree = buildTreeOptimized(survival);
  // 3、排序
  return treeSort(tree);
};
