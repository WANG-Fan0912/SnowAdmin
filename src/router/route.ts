import { RouteRecordRaw } from "vue-router";
import { testMultilevelMenu } from "@/mock/testRoute";
/**
 * 路由path路径与文件夹名称相同，找文件可以浏览器地址快速查找，方便定位文件
 *
 * 路由meta对象参数，我们通常将属性放到meta对象中
 * meta: {
 * title:       菜单栏以及 tabsView 栏、菜单搜索名称（国际化）
 * hide:        是否隐藏此路由
 * keepAlive:   是否缓存组件状态
 * affix:       是否固定在 tabsView 栏上
 * link:        是否是超链接菜单，开启外链条件：1、 link：链接地址不为空  2、iframe: false
 * iframe:      是否内嵌窗口，开启条件：1、iframe：true  2、link：链接地址不为空
 * roles:       当前路由权限表示，取角色管理。路由控制显示、隐藏。 超级管理员：admin；普通角色：common
 * icon:        菜单、tabsView 图标等
 * svgIcon:     svg图标
 * }
 */

/**
 * 路由的层级设置
 * 一级children下的一级路由为menu菜单的最外层，例如：首页、系统设置、权限管理，在这里我称它为 `children下的一级路由`
 * children下的一级路由内在设置children则是在一级当前菜单下再配置菜单
 * 依此类推
 */

export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
    component: () => import("@/layout/index.vue"), // 容器布局-顶层路由
    meta: {
      keepAlive: true
    },
    // 二级路由-主要渲染页面
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/home.vue"),
        meta: {
          title: "home", // 国际化
          hide: false, // 是否隐藏此路由
          keepAlive: false, // 缓存组件状态
          affix: true, // 固定在tagesView栏上
          link: "", // 是否外链
          iframe: false, // 是否内嵌窗口
          roles: ["admin", "common"], // 路由权限
          svgIcon: "home" // 菜单图标
        }
      },
      {
        path: "/home2",
        name: "home2",
        component: () => import("@/views/home/home.vue"),
        meta: {
          title: "home", // 国际化
          hide: false, // 是否隐藏此路由
          keepAlive: false, // 缓存组件状态
          affix: true, // 固定在tagesView栏上
          link: "", // 是否外链
          iframe: false, // 是否内嵌窗口
          roles: ["common"], // 路由权限
          svgIcon: "home" // 菜单图标
        }
      },
      {
        path: "/table-management",
        name: "table-management",
        redirect: "/table-management/common-table",
        meta: {
          title: "table-management",
          hide: false,
          keepAlive: true,
          affix: true,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "table"
        },
        children: [
          {
            path: "/table-management/common-table",
            name: "common-table",
            component: () => import("@/views/table-management/common-table/common-table.vue"),
            meta: {
              title: "common-table",
              hide: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu"
            }
          },
          {
            path: "/table-management/custom-table",
            name: "custom-table",
            component: () => import("@/views/table-management/custom-table/custom-table.vue"),
            meta: {
              title: "custom-table",
              hide: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu"
            }
          }
        ]
      },
      {
        path: "/form-management",
        name: "form-management",
        redirect: "/form-management/common-form",
        meta: {
          title: "form-management",
          hide: false,
          keepAlive: true,
          affix: true,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "form"
        },
        children: [
          {
            path: "/form-management/common-form",
            name: "common-form",
            component: () => import("@/views/form-management/common-form/common-form.vue"),
            meta: {
              title: "common-form",
              hide: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu"
            }
          },
          {
            path: "/form-management/step-form",
            name: "step-form",
            component: () => import("@/views/form-management/step-form/step-form.vue"),
            meta: {
              title: "step-form",
              hide: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu"
            }
          }
        ]
      },
      {
        path: "/multilevel-menu",
        name: "multilevel-menu",
        redirect: "/multilevel-menu/second-menu-1",
        meta: {
          title: "multilevel-menu",
          hide: false,
          keepAlive: true,
          affix: true,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "switch"
        },
        children: [
          {
            path: "/multilevel-menu/second-menu-1",
            name: "second-menu-1",
            component: () => import("@/views/multilevel-menu/second-menu/second-menu-1.vue"),
            meta: {
              title: "second-menu-1",
              hide: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu"
            }
          },
          {
            path: "/multilevel-menu/second-menu-2",
            name: "second-menu-2",
            redirect: "/multilevel-menu/third-menu-1",
            meta: {
              title: "second-menu-2",
              hide: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu"
            },
            children: [
              {
                path: "/multilevel-menu/third-menu-1",
                name: "third-menu-1",
                component: () => import("@/views/multilevel-menu/third-menu/third-menu-1.vue"),
                meta: {
                  title: "third-menu-1",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  link: "",
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu"
                }
              },
              {
                path: "/multilevel-menu/third-menu-2",
                name: "third-menu-2",
                component: () => import("@/views/multilevel-menu/third-menu/third-menu-2.vue"),
                meta: {
                  title: "third-menu-2",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  link: "",
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu"
                }
              },
              ...testMultilevelMenu
            ]
          }
        ]
      },
      {
        path: "/personal-center",
        name: "personal-center",
        redirect: "/personal-center/userinfo",
        meta: {
          title: "personal-center",
          hide: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "user"
        },
        children: [
          {
            path: "/personal-center/userinfo",
            name: "userinfo",
            component: () => import("@/views/personal-center/userinfo/userinfo.vue"),
            meta: {
              title: "userinfo",
              hide: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu"
            },
            children: []
          },
          {
            path: "/personal-center/user-settings",
            name: "user-settings",
            component: () => import("@/views/personal-center/user-settings/user-settings.vue"),
            meta: {
              title: "user-settings",
              hide: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu"
            },
            children: []
          }
        ]
      },
      {
        path: "/external-links",
        name: "external-links",
        redirect: "/external-links/inline-page",
        meta: {
          title: "external-links",
          hide: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "link"
        },
        children: [
          {
            path: "/external-links/inline-page",
            name: "inline-page",
            redirect: "/external-links/inline-page/uigradients",
            meta: {
              title: "inline-page",
              hide: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu"
            },
            children: [
              {
                path: "/external-links/inline-page/uigradients",
                name: "uigradients",
                component: () => import("@/views/external-links/inline-page/inline-page.vue"),
                meta: {
                  title: "uigradients",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://uigradients.com/#HoneyDew", // 链接
                  iframe: true, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu"
                },
                children: []
              },
              {
                path: "/external-links/inline-page/color-taking-tool",
                name: "color-taking-tool",
                component: () => import("@/views/external-links/inline-page/inline-page.vue"),
                meta: {
                  title: "color-taking-tool",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://photokit.com/colors/eyedropper/?lang=zh", // 链接
                  iframe: true, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu"
                },
                children: []
              },
              {
                path: "/external-links/inline-page/grid-generator",
                name: "grid-generator",
                component: () => import("@/views/external-links/inline-page/inline-page.vue"),
                meta: {
                  title: "grid-generator",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://cssgrid-generator.netlify.app/", // 链接
                  iframe: true, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu"
                },
                children: []
              },
              {
                path: "/external-links/inline-page/vue-official-website",
                name: "vue-official-website",
                component: () => import("@/views/external-links/inline-page/inline-page.vue"),
                meta: {
                  title: "vue-official-website",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://cn.vuejs.org/", // 链接
                  iframe: true, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu"
                },
                children: []
              },
              {
                path: "/external-links/inline-page/vite-official-website",
                name: "vite-official-website",
                component: () => import("@/views/external-links/inline-page/inline-page.vue"),
                meta: {
                  title: "vite-official-website",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://www.vitejs.net/", // 链接
                  iframe: true, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu"
                },
                children: []
              }
            ]
          },
          {
            path: "/external-links/external-page",
            name: "external-page",
            redirect: "/external-links/external-page/link-gitee",
            meta: {
              title: "external-page",
              hide: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu"
            },
            children: [
              {
                path: "/external-links/external-page/link-gitee",
                name: "link-gitee",
                component: () => import("@/views/external-links/external-page/external-page.vue"),
                meta: {
                  title: "link-gitee",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://gitee.com/wang_fan_w", // 链接
                  iframe: false, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu"
                },
                children: []
              },
              {
                path: "/external-links/external-page/link-juejin",
                name: "link-juejin",
                component: () => import("@/views/external-links/external-page/external-page.vue"),
                meta: {
                  title: "link-juejin",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://juejin.cn/user/1728883023940600", // 链接
                  iframe: false, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu"
                },
                children: []
              }
            ]
          }
        ]
      },
      {
        path: "/internationalization",
        name: "internationalization",
        component: () => import("@/views/internationalization/internationalization.vue"),
        meta: {
          title: "internationalization",
          hide: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin", "common"],
          svgIcon: "earth"
        }
      },
      {
        path: "/about-project",
        name: "about-project",
        component: () => import("@/views/about-project/about-project.vue"),
        meta: {
          title: "about-project",
          hide: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin", "common"],
          svgIcon: "about"
        }
      }
    ]
  }
];

/**
 * 静态路由 （默认路由）
 * 此路由不要动，用于做静态路由定向，如果要添加路由，请在 `dynamicRoutes数组` 中添加
 * @description 前端控制路由 直接改 dynamicRoutes 中的路由，后端控制则不需要，请求接口路由数据时，覆盖 dynamicRoutes 第一个顶层 children 的内容（全屏，不包括 lauyout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: "login"
    }
  }
  /**
   * 提示：写在这里的为全屏界面，不建议写在这里
   * 非全屏界面，请写在 dynamicRoutes 路由数组中
   */
];

/**
 * 定义404、401界面
 * @link 参考：https://router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const notFoundAndNoPower = [
  {
    path: "/401",
    name: "no-power",
    component: () => import("@/views/error/401.vue"),
    meta: {
      title: "not-power",
      hide: true
    }
  },
  {
    path: "/:path(.*)*", // 匹配任意路由，兜底，未找到页面的时候跳转该页面
    name: "not-found",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "not-found",
      hide: true
    }
  }
];
