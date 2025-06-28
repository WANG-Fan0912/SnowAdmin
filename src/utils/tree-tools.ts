/**
 * 判断code在树形数据中是否存在
 * @param {array} area 树形数据
 * @param {string | number} value 需要匹配的值
 * @param {object} options 指定的key，比如指定匹配的键为'code'，嵌套的键为'children'
 * @return {boolean} true\false
 */
export const treeCodeExist = (area: any, value: any, options: { key?: string; childrenKey?: string } = {}): boolean => {
  // 解构并设置默认选项
  const { key = "code", childrenKey = "children" } = options;

  // 边界条件检查
  if (!Array.isArray(area) || !value) return false;

  return area.some((node: any) => {
    if (node[key] === value) return true;

    const children = node[childrenKey];
    if (Array.isArray(children)) {
      return treeCodeExist(children, value, options);
    }

    return false;
  });
};

/**
 * 树状结构中查找并返回指定名称的节点的所有父节点
 * @param tree - 要搜索的树状结构。
 * @param targetKey - 要查找的目标节点key。
 * @param parents - 已经遍历过的当前节点的父节点数组。
 * @param index - 当前遍历的索引，用于遍历 tree 数组。
 * @description 函数接受一棵树、节点名称、一个可选的父节点数组（默认为空）和索引（默认为 0）作为参数。
 * @description 如果在树中找到目标节点，函数将返回包含从根节点到目标节点的所有父节点的数组
 * @description 如果树中不存在目标节点，则返回 null。
 * @returns 包含目标节点的所有父节点的数组，如果没有找到则返回 null。
 */
export const findParentsTailRecursive = (tree: any, targetKey: string | number, parents = [], index = 0): any[] | null => {
  if (index >= tree.length) {
    return null;
  }

  const currentNode = tree[index];
  const updatedParents = parents.concat(currentNode);

  if (currentNode.key === targetKey) {
    return updatedParents;
  }

  if (currentNode.children) {
    const result = findParentsTailRecursive(currentNode.children, targetKey, updatedParents) as any;
    if (result) {
      return result || []; // 这里直接返回递归调用的结果
    }
  }
  return findParentsTailRecursive(tree, targetKey, parents, index + 1);
};

/**
 * 数组扁平化-多维转一维
 * @param { array } tree 多维数组
 * @param { string } tree 转一维的条件，例如 "children"
 * @returns 一维数组
 */
export const arrayFlattened = (tree: any, term: string) => {
  const result = [];
  while (tree.length) {
    const next = tree.pop();
    if (Array.isArray(next[term])) {
      tree.push(...next[term]);
    }
    result.push(next);
  }
  return result.reverse();
};

/**
 * 将乱序的一维数组根据parentId转化为树形结构
 * @param {Array[Object]} nodes 对象
 * @returns {Array[Object]} 组装好的树形结构
 */
export const buildTreeOptimized = (nodes: any): any => {
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

    // 初始化子节点数组
    node.children = [];
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
      parent?.children.push(node); // 挂载子节点
    } else {
      console.warn(`独立节点 ${node.id}: parentId为空`);
    }
  }

  return roots;
};

/**
 * 根据指定id递归树查到指定节点
 * @param {Array[Object]} data 树形结构
 * @param {string | number} targetId 指定id
 * @returns {Object} 返回查找到的节点，未找到则返回null
 */
export const findCategoryById = (data: any, targetId: any): any => {
  for (const item of data) {
    if (item.id === targetId) {
      return item;
    }
    if (item.children && item.children.length > 0) {
      const result: any = findCategoryById(item.children, targetId);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
