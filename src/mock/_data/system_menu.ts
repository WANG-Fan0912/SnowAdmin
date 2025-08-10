/**
 * 路由path路径与文件夹名称相同，找文件可以浏览器地址快速查找，方便定位文件
 *
 * component
 * 模块加载路径，除了layout外，全部默认路径为src/views文件夹内的文件
 * 不要以"/"开头，结尾不要带文件扩展名，如:".vue"
 * 举例：views文件夹下的home文件夹下的home.vue
 * component: "home/home"
 *
 * id的具体配置规则：
 * 父节点: id: '01'
 *  |-- 子节点1: '0101'
 *  |    |-- 子节点1-1: '010101'
 *  |    |-- 子节点1-2: '010102'
 *  |-- 子节点2: '0102'
 *  |    |-- 子节点2-1: '010201'
 *  |    |-- 子节点2-2: '010202'
 * 当然，你们也可以自行设计id结构，只要保证id的唯一性即可，最后接口返回的是一个树形结构
 * 注意：节点id不能与parentId相同，否则在遍历路由树的时候会报错
 * 在这种层级编码设计模式下，​不可能自然产生节点ID与parentId相同的情况，但还是需要注意手动录入的情况
 *
 *
 * 路由meta对象参数，我们通常将属性放到meta对象中
 * meta: {
 *   title:     国际化key，无对应Key则直接展示
 *   isFull:    是否全屏显示，开启条件： true \ false
 *   hide:      是否隐藏此路由，不会显示在菜单树，可以访问
 *   disable:   是否停用此路由-不显示且不可访问
 *   keepAlive: 是否缓存组件
 *   affix:     固定在Tabs栏上-开启后Tabs栏无关闭按钮
 *   link:      是否是超链接菜单，开启外链条件：1、 link：链接地址不为空  2、iframe: false
 *   iframe:    是否内嵌外链窗口，开启条件：1、iframe：true  2、link：链接地址不为空
 *   roles:     路由权限标识，取角色权限，超级管理员：admin；普通角色：common
 *   svgIcon:   svg菜单图标，优先级高于icon，取src/assets/svgs内的svg文件
 *   icon:      普通icon菜单图标，默认取arco.design图标
 *   sort:      排序字段
 *   type:      1目录 2菜单 3按钮
 * }
 */

/**
 * 路由的层级设置
 * layout为框架布局，顶层路由
 * layout.children下的路由为systemMenu菜单，例如：首页、系统设置、权限管理等
 */
export const systemMenu = [
  // layout-二级路由(主要渲染页面)
  {
    id: "01", // 路由id
    parentId: "0", // 顶层路由 parentId: 0
    path: "/home", // 路由path
    name: "home", // 路由name
    component: "home/home", // 路由跳转的文件路径，默认在src/views内，这里就是src/views/home/home.vue
    meta: {
      title: "home", // 国际化key，无对应Key则直接展示
      hide: false, // 是否隐藏此路由-不显示但可访问
      disable: false, // 是否停用此路由-不显示且不可访问
      keepAlive: false, // 是否缓存组件
      affix: true, // 固定在Tabs栏上-开启后Tabs栏无关闭按钮
      link: "", // 是否外链
      iframe: false, // 是否内嵌外链窗口
      isFull: false, // 是否全屏显示
      roles: ["admin", "common"], // 路由角色权限
      svgIcon: "home", // svg菜单图标，优先级高于icon，取src/assets/svgs内的svg文件
      icon: "", // 普通icon菜单图标，默认取arco.design图标
      sort: 1, // 排序字段
      type: 2 // type 1目录 2菜单 3按钮
    },
    children: null // 存储子节点字段，默认为null
  },
  {
    id: "02",
    parentId: "0",
    path: "/system",
    name: "system",
    redirect: "/system/account",
    meta: {
      title: "system",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin", "common"],
      svgIcon: "set",
      sort: 2,
      type: 1
    },
    children: null
  },
  {
    id: "0201",
    parentId: "02",
    path: "/system/account",
    name: "account",
    component: "system/account/account",
    meta: {
      title: "account",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin"],
      icon: "icon-menu",
      sort: 1,
      type: 2
    },
    children: null
  },
  {
    id: "0202",
    parentId: "02",
    path: "/system/role",
    name: "role",
    component: "system/role/role",
    meta: {
      title: "role",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin"],
      icon: "icon-menu",
      sort: 2,
      type: 2
    },
    children: null
  },
  {
    id: "0203",
    parentId: "02",
    path: "/system/menu",
    name: "menu",
    component: "system/menu/menu",
    meta: {
      title: "menu",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin"],
      icon: "icon-menu",
      sort: 3,
      type: 2
    },
    children: null
  },
  {
    id: "0204",
    parentId: "02",
    path: "/system/division",
    name: "division",
    component: "system/division/division",
    meta: {
      title: "division",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin"],
      icon: "icon-menu",
      sort: 4,
      type: 2
    },
    children: null
  },
  {
    id: "0205",
    parentId: "02",
    path: "/system/dictionary",
    name: "dictionary",
    component: "system/dictionary/dictionary",
    meta: {
      title: "dictionary",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin"],
      icon: "icon-menu",
      sort: 5,
      type: 2
    },
    children: null
  },
  {
    id: "0206",
    parentId: "02",
    path: "/system/userinfo",
    name: "userinfo",
    component: "system/userinfo/userinfo",
    meta: {
      title: "userinfo",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin", "common"],
      icon: "icon-menu",
      sort: 6,
      type: 2
    },
    children: null
  },
  {
    id: "03",
    parentId: "0",
    path: "/permission",
    name: "permission",
    redirect: "/permission/btn-perm",
    meta: {
      title: "permission",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin", "common"],
      svgIcon: "defend",
      sort: 3,
      type: 1
    },
    children: null
  },
  {
    id: "0301",
    parentId: "03",
    path: "/permission/btn-perm",
    name: "btn-perm",
    component: "permission/btn-perm/btn-perm",
    meta: {
      title: "btn-perm",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin", "common"],
      icon: "icon-menu",
      sort: 1,
      type: 2
    },
    children: null
  },
  {
    id: "0302",
    parentId: "03",
    path: "/permission/admin-page",
    name: "admin-page",
    component: "permission/admin-page/admin-page",
    meta: {
      title: "admin-page",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin"],
      icon: "icon-menu",
      sort: 2,
      type: 2
    },
    children: null
  },
  {
    id: "0303",
    parentId: "03",
    path: "/permission/common-page",
    name: "common-page",
    component: "permission/common-page/common-page",
    meta: {
      title: "common-page",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["common"],
      icon: "icon-menu",
      sort: 3,
      type: 2
    },
    children: null
  },

  {
    id: "04",
    parentId: "0",
    path: "/monitor",
    name: "monitor",
    redirect: "/monitor/onlineuser",
    meta: {
      title: "system-monitor",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin"],
      svgIcon: "financial-statement",
      sort: 4,
      type: 1
    },
    children: null
  },
  {
    id: "0401",
    parentId: "04",
    path: "/monitor/onlineuser",
    name: "onlineuser",
    component: "monitor/onlineuser/index",
    meta: {
      title: "onlineuser",
      hide: false,
      keepAlive: true,
      disable: false,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin"],
      icon: "icon-menu",
      sort: 1,
      type: 2
    },
    children: null
  },
  {
    id: "0402",
    parentId: "04",
    path: "/monitor/crontab",
    name: "crontab",
    component: "monitor/crontab/index",
    meta: {
      title: "crontab",
      hide: false,
      keepAlive: true,
      disable: false,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin"],
      icon: "icon-menu",
      sort: 2,
      type: 2
    },
    children: null
  },
  {
    id: "0403",
    parentId: "04",
    path: "/monitor/crontab-logs",
    name: "crontab-logs",
    component: "monitor/crontab-logs/index",
    meta: {
      title: "crontab-logs",
      hide: false,
      keepAlive: true,
      disable: false,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin"],
      icon: "icon-menu",
      sort: 3,
      type: 2
    },
    children: null
  },
  {
    id: "05",
    parentId: "0",
    path: "/about",
    name: "about",
    component: "about/about",
    meta: {
      title: "about",
      hide: false,
      disable: false,
      keepAlive: true,
      affix: false,
      link: "",
      iframe: false,
      isFull: false,
      roles: ["admin", "common"],
      svgIcon: "about",
      sort: 5,
      type: 2
    },
    children: null
  }
];

// 权限数据
export const permissionData = [
  {
    id: "030101",
    parentId: "0301",
    meta: {
      title: "新增按钮",
      hide: false,
      disable: false,
      roles: ["admin"],
      permission: "sys:btn:add",
      sort: 1,
      type: 3
    }
  },
  {
    id: "030102",
    parentId: "0301",
    meta: {
      title: "编辑按钮",
      hide: false,
      disable: false,
      roles: ["admin"],
      permission: "sys:btn:edit",
      sort: 2,
      type: 3
    }
  },
  {
    id: "030103",
    parentId: "0301",
    meta: {
      title: "删除按钮",
      hide: false,
      disable: false,
      roles: ["admin"],
      permission: "sys:btn:delete",
      sort: 3,
      type: 3
    }
  },
  {
    id: "030201",
    parentId: "0301",
    meta: {
      title: "新增按钮-2",
      hide: false,
      disable: false,
      roles: ["admin", "common"],
      permission: "common:btn:add",
      sort: 1,
      type: 3
    }
  },
  {
    id: "030202",
    parentId: "0301",
    meta: {
      title: "编辑按钮-2",
      hide: false,
      disable: false,
      roles: ["admin", "common"],
      permission: "common:btn:edit",
      sort: 2,
      type: 3
    }
  },
  {
    id: "030203",
    parentId: "0301",
    meta: {
      title: "删除按钮-2",
      hide: false,
      disable: false,
      roles: ["admin", "common"],
      permission: "common:btn:delete",
      sort: 3,
      type: 3
    }
  }
];
