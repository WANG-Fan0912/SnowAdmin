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
export const webDefaultLanguage = () => navigator.language;

/**
 * 时间戳转 年月日时分秒
 * 若timestamp不传则取当前时间
 * 若type不传则取 年月日时分秒
 * @param { number } timestamp 时间戳
 * @return 返回年月日时分秒字符串
 */
export const getTimestamp = (timestamp: string | number | null, type: string) => {
  let date = null;
  if (timestamp) {
    date = new Date(timestamp);
  } else {
    date = new Date();
  }
  let Year = String(date.getFullYear());
  let Moth = String(date.getMonth() + 1).padStart(2, "0");
  let Day = String(date.getDate()).padStart(2, "0");
  let Hour = String(date.getHours()).padStart(2, "0");
  let Minute = String(date.getMinutes()).padStart(2, "0");
  let Seconds = String(date.getSeconds()).padStart(2, "0");
  if (type === "yyyy") {
    return `${Year}`;
  }
  if (type === "yyyy-MM") {
    return `${Year}-${Moth}`;
  }
  if (type === "yyyy-MM-dd") {
    return `${Year}-${Moth}-${Day}`;
  }
  return `${Year}-${Moth}-${Day} ${Hour}:${Minute}:${Seconds}`;
};

/**
 * 根据当前日期前推指定日期
 * @param { number } days 需要前推的天数
 * @return {Array[]} 是否为空对象 [前推天数的日期，当前日期]
 */
export const getDatesForwardDate = (days = 0) => {
  const today = new Date();
  const firstDay: any = new Date(today);
  firstDay.setDate(firstDay.getDate() - days); // 向前推指定天，得到前指定天数的第一天

  const lastDay: any = new Date(today);
  lastDay.setDate(lastDay.getDate() - 1); // 昨天是前指定天数的最后一天

  const firstDayFormatted = getTimestamp(firstDay, "YYYY-MM-DD");
  const lastDayFormatted = getTimestamp(lastDay, "YYYY-MM-DD");
  return [firstDayFormatted, lastDayFormatted];
};

/**
 * 给formData循环添加参数，过滤null、undefined、空字符串、NaN
 * 示例：let data = appendFormData(your-object);
 * @param { object } obj 参数对象
 * @return 返回formData对象
 */
export const appendFormData = (obj: any) => {
  let formData = new FormData();
  function deepAppendFormData(formData: any, data: any, parentKey = "") {
    if (Array.isArray(data) || (typeof data === "object" && data !== null)) {
      // 如果数据是数组或对象，序列化为 JSON 字符串
      formData.append(parentKey, JSON.stringify(data));
    } else if (data !== null && data !== undefined && !Number.isNaN(data) && data !== "") {
      // 如果数据是基本类型，直接添加
      formData.append(parentKey, data);
    }
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      deepAppendFormData(formData, obj[key], key);
    }
  }
  deepAppendFormData(formData, obj);
  return formData;
};

/**
 * 判断是否为空对象
 * @param {object} obj 对象
 * @returns {boolean} 是否为空对象
 */
export const isEmptyObject = (obj: object) => {
  // 校验是否为对象且不为 null
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * 判断是否为安全环境https或localhost
 * @returns 是否为安全环境https或localhost
 */
export const isSecureEnvironment = () => {
  const { protocol, hostname } = window.location;

  // 检查协议是否为HTTPS
  const isHttps = protocol === "https:";

  // 检查主机名是否为localhost或本地IP（支持IPv4和IPv6）
  const isLocalhost =
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0" || hostname === "[::1]" || hostname === "::1";

  return isHttps || isLocalhost;
};

/**
 * 将乱序的一维数组根据parentId转化为树形结构
 * @param {Array[Object]} nodes 对象
 * @returns {Array[Object]} 组装好的树形结构
 */
export const buildTreeOptimized = (nodes: any) => {
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
export const findCategoryById = (data: any, targetId: any) => {
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
