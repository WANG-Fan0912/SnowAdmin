/**
 * 深拷贝
 * @param { string } data 需要深拷贝的数据
 * @returns 深拷贝的数据
 */
export function deepClone(data: any) {
  let stack = [];
  let cloned;
  if (Array.isArray(data)) {
    cloned = [];
  } else if (typeof data === "object" && data !== null) {
    cloned = {};
  } else {
    return data;
  }
  stack.push({
    original: data,
    copy: cloned
  });
  while (stack.length > 0) {
    let current: any = stack.pop();
    let original = current.original;
    let copy = current.copy;

    for (let key in original) {
      if (original.hasOwnProperty(key)) {
        let value = original[key];

        if (typeof value === "object" && value !== null) {
          copy[key] = Array.isArray(value) ? [] : {};

          stack.push({
            original: value,
            copy: copy[key]
          });
        } else {
          copy[key] = value;
        }
      }
    }
  }
  return cloned;
}

/**
 * 数组扁平化-多维转一维
 * @param { array } tree 多维数组
 * @param { string } tree 转一维的条件，例如 "children"
 * @returns 一维数组
 */
export function arrayFlattened(tree: any, term: string) {
  const result = [];
  while (tree.length) {
    const next = tree.pop();
    if (Array.isArray(next[term])) {
      tree.push(...next[term]);
    }
    result.push(next);
  }
  return result.reverse();
}

/**
 * 在给定的树状结构中，递归地查找并返回指定名称的节点的所有父节点。
 * 函数接受一棵树、目标节点名称以及一个可选的父母节点数组（默认为空）和索引（默认为 0）作为参数。
 * 如果在树中找到目标节点，函数将返回包含从根节点到目标节点的所有父节点的数组。如果树中不存在目标节点，则返回 null。
 *
 * @param tree - 要搜索的树状结构。
 * @param targetKey - 要查找的目标节点key。
 * @param parents - 已经遍历过的当前节点的父节点数组。
 * @param index - 当前遍历的索引，用于遍历 tree 数组。
 * @returns 包含目标节点的所有父节点的数组，如果没有找到则返回 null。
 */
export function findParentsTailRecursive(tree: any, targetKey: string | number, parents = [], index = 0) {
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
}

/**
 * 获取浏览器默认语言
 * @returns 语言类型
 */
export function webDefaultLanguage() {
  if (navigator.language === "zh-CN") {
    return "zhCN";
  } else {
    return "enUS";
  }
}
