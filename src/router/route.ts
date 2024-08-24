import { RouteRecordRaw } from "vue-router";
import { testMultilevelMenu } from "@/mock/testRoute";
/**
 * 路由path路径与文件夹名称相同，找文件可以浏览器地址快速查找，方便定位文件
 *
 * 路由meta对象参数，我们通常将属性放到meta对象中
 * meta: {
 * title:       菜单栏以及 tabsView 栏、菜单搜索名称（国际化）
 * hide:        是否隐藏此路由，不会显示在菜单树，可以访问
 * disable:     是否停用，不会显示在菜单树，且不可访问
 * keepAlive:   是否缓存组件状态
 * affix:       是否固定在 tabsView 栏上
 * link:        是否是超链接菜单，开启外链条件：1、 link：链接地址不为空  2、iframe: false
 * iframe:      是否内嵌窗口，开启条件：1、iframe：true  2、link：链接地址不为空
 * roles:       当前路由权限表示，取角色管理。路由控制显示、隐藏。 超级管理员：admin；普通角色：common
 * icon:        菜单、tabsView 图标等
 * svgIcon:     svg图标
 * sort:        排序
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
          disable: false, // 是否停用此路由
          keepAlive: false, // 缓存组件状态
          affix: true, // 固定在tagesView栏上
          link: "", // 是否外链
          iframe: false, // 是否内嵌窗口
          roles: ["admin", "common"], // 路由权限
          svgIcon: "home", // 菜单图标
          sort: 1
        }
      },
      {
        path: "/file-management",
        name: "file-management",
        redirect: "/file-management/document-library",
        meta: {
          title: "file-management",
          hide: false,
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "folder-menu",
          sort: 2
        },
        children: [
          {
            path: "/file-management/document-library",
            name: "document-library",
            component: () => import("@/views/file-management/document-library/document-library.vue"),
            meta: {
              title: "document-library",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
            }
          }
        ]
      },
      {
        path: "/table-management",
        name: "table-management",
        redirect: "/table-management/common-table",
        meta: {
          title: "table-management",
          hide: false,
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "table",
          sort: 3
        },
        children: [
          {
            path: "/table-management/common-table",
            name: "common-table",
            component: () => import("@/views/table-management/common-table/common-table.vue"),
            meta: {
              title: "common-table",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 2
            }
          },
          {
            path: "/table-management/custom-table",
            name: "custom-table",
            component: () => import("@/views/table-management/custom-table/custom-table.vue"),
            meta: {
              title: "custom-table",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
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
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "form",
          sort: 4
        },
        children: [
          {
            path: "/form-management/common-form",
            name: "common-form",
            component: () => import("@/views/form-management/common-form/common-form.vue"),
            meta: {
              title: "common-form",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
            }
          },
          {
            path: "/form-management/step-form",
            name: "step-form",
            component: () => import("@/views/form-management/step-form/step-form.vue"),
            meta: {
              title: "step-form",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 2
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
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "switch",
          sort: 5
        },
        children: [
          {
            path: "/multilevel-menu/second-menu-1",
            name: "second-menu-1",
            component: () => import("@/views/multilevel-menu/second-menu/second-menu-1.vue"),
            meta: {
              title: "second-menu-1",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
            }
          },
          {
            path: "/multilevel-menu/second-menu-2",
            name: "second-menu-2",
            redirect: "/multilevel-menu/third-menu-1",
            meta: {
              title: "second-menu-2",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 2
            },
            children: [
              {
                path: "/multilevel-menu/third-menu-1",
                name: "third-menu-1",
                component: () => import("@/views/multilevel-menu/third-menu/third-menu-1.vue"),
                meta: {
                  title: "third-menu-1",
                  hide: false,
                  disable: false,
                  keepAlive: true,
                  affix: false,
                  link: "",
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 1
                }
              },
              {
                path: "/multilevel-menu/third-menu-2",
                name: "third-menu-2",
                component: () => import("@/views/multilevel-menu/third-menu/third-menu-2.vue"),
                meta: {
                  title: "third-menu-2",
                  hide: false,
                  disable: false,
                  keepAlive: true,
                  affix: false,
                  link: "",
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 2
                }
              },
              ...testMultilevelMenu
            ]
          }
        ]
      },
      {
        path: "/common-component",
        name: "common-component",
        redirect: "/common-component/player",
        meta: {
          title: "common-component",
          hide: false,
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "classify",
          sort: 6
        },
        children: [
          {
            path: "/common-component/player",
            name: "player",
            component: () => import("@/views/common-component/player/player.vue"),
            meta: {
              title: "player",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
            }
          },
          {
            path: "/common-component/print",
            name: "print",
            component: () => import("@/views/common-component/print/print.vue"),
            meta: {
              title: "print",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 2
            }
          },
          {
            path: "/common-component/draggable",
            name: "draggable",
            component: () => import("@/views/common-component/draggable/draggable.vue"),
            meta: {
              title: "draggable",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 3
            }
          },
          {
            path: "/common-component/editor",
            name: "editor",
            component: () => import("@/views/common-component/editor/editor.vue"),
            meta: {
              title: "editor",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 4
            }
          },
          {
            path: "/common-component/newbie",
            name: "newbie",
            component: () => import("@/views/common-component/newbie/newbie.vue"),
            meta: {
              title: "newbie",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 5
            }
          },
          {
            path: "/common-component/usre-center",
            name: "usre-center",
            component: () => import("@/views/common-component/usre-center/usre-center.vue"),
            meta: {
              title: "usre-center",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 6
            }
          }
        ]
      },
      {
        path: "/custom-instruction",
        name: "custom-instruction",
        redirect: "/custom-instruction/anti-shake",
        meta: {
          title: "custom-instruction",
          hide: false,
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "directives",
          sort: 7
        },
        children: [
          {
            path: "/custom-instruction/anti-shake",
            name: "anti-shake",
            component: () => import("@/views/custom-instruction/anti-shake/anti-shake.vue"),
            meta: {
              title: "anti-shake",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
            }
          },
          {
            path: "/custom-instruction/throttle",
            name: "throttle",
            component: () => import("@/views/custom-instruction/throttle/throttle.vue"),
            meta: {
              title: "throttle",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 2
            }
          },
          {
            path: "/custom-instruction/test-instruction",
            name: "test-instruction",
            component: () => import("@/views/custom-instruction/test-instruction/test-instruction.vue"),
            meta: {
              title: "test-instruction",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 3
            }
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
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "user",
          sort: 8
        },
        children: [
          {
            path: "/personal-center/userinfo",
            name: "userinfo",
            component: () => import("@/views/personal-center/userinfo/userinfo.vue"),
            meta: {
              title: "userinfo",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
            }
          },
          {
            path: "/personal-center/user-settings",
            name: "user-settings",
            component: () => import("@/views/personal-center/user-settings/user-settings.vue"),
            meta: {
              title: "user-settings",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 2
            }
          }
        ]
      },
      {
        path: "/system-management",
        name: "system-management",
        redirect: "/system-management/account management",
        meta: {
          title: "system-management",
          hide: false,
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "set",
          sort: 9
        },
        children: [
          {
            path: "/system-management/account-management",
            name: "account-management",
            component: () => import("@/views/system-management/account-management/account-management.vue"),
            meta: {
              title: "account-management",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
            }
          },
          {
            path: "/system-management/role-management",
            name: "role-management",
            component: () => import("@/views/system-management/role-management/role-management.vue"),
            meta: {
              title: "role-management",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 2
            }
          },
          {
            path: "/system-management/menu-management",
            name: "menu-management",
            component: () => import("@/views/system-management/menu-management/menu-management.vue"),
            meta: {
              title: "menu-management",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 3
            }
          },
          {
            path: "/system-management/division-management",
            name: "division-management",
            component: () => import("@/views/system-management/division-management/division-management.vue"),
            meta: {
              title: "division-management",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 4
            }
          },
          {
            path: "/system-management/dictionary-management",
            name: "dictionary-management",
            component: () => import("@/views/system-management/dictionary-management/dictionary-management.vue"),
            meta: {
              title: "dictionary-management",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 5
            }
          },
          {
            path: "/system-management/system-log",
            name: "system-log",
            component: () => import("@/views/system-management/system-log/system-log.vue"),
            meta: {
              title: "system-log",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 6
            }
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
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "link",
          sort: 10
        },
        children: [
          {
            path: "/external-links/inline-page",
            name: "inline-page",
            redirect: "/external-links/inline-page/uigradients",
            meta: {
              title: "inline-page",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
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
                  disable: false,
                  affix: false,
                  link: "https://uigradients.com/#HoneyDew", // 链接
                  iframe: true, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 1
                }
              },
              {
                path: "/external-links/inline-page/color-taking-tool",
                name: "color-taking-tool",
                component: () => import("@/views/external-links/inline-page/inline-page.vue"),
                meta: {
                  title: "color-taking-tool",
                  hide: false,
                  disable: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://photokit.com/colors/eyedropper/?lang=zh", // 链接
                  iframe: true, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 2
                }
              },
              {
                path: "/external-links/inline-page/grid-generator",
                name: "grid-generator",
                component: () => import("@/views/external-links/inline-page/inline-page.vue"),
                meta: {
                  title: "grid-generator",
                  hide: false,
                  disable: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://cssgrid-generator.netlify.app/", // 链接
                  iframe: true, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 3
                }
              }
            ]
          },
          {
            path: "/external-links/external-page",
            name: "external-page",
            redirect: "/external-links/external-page/link-vue",
            meta: {
              title: "external-page",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 2
            },
            children: [
              {
                path: "/external-links/external-page/link-SnowAdmin-Docs",
                name: "link-SnowAdmin-Docs",
                component: () => import("@/views/external-links/external-page/external-page.vue"),
                meta: {
                  title: "link-SnowAdmin-Docs",
                  hide: false,
                  disable: false,
                  keepAlive: true,
                  affix: false,
                  link: "http://101.126.93.137:81/", // 链接
                  iframe: false, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 5
                }
              },
              {
                path: "/external-links/external-page/link-vue",
                name: "link-vue",
                component: () => import("@/views/external-links/external-page/external-page.vue"),
                meta: {
                  title: "link-vue",
                  hide: false,
                  disable: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://cn.vuejs.org/", // 链接
                  iframe: false, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 1
                }
              },
              {
                path: "/external-links/external-page/link-vite",
                name: "link-vite",
                component: () => import("@/views/external-links/external-page/external-page.vue"),
                meta: {
                  title: "link-vite",
                  hide: false,
                  disable: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://www.vitejs.net/", // 链接
                  iframe: false, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 2
                }
              },
              {
                path: "/external-links/external-page/link-gitee",
                name: "link-gitee",
                component: () => import("@/views/external-links/external-page/external-page.vue"),
                meta: {
                  title: "link-gitee",
                  hide: false,
                  disable: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://gitee.com/wang_fan_w/SnowAdmin", // 链接
                  iframe: false, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 3
                }
              },
              {
                path: "/external-links/external-page/link-juejin",
                name: "link-juejin",
                component: () => import("@/views/external-links/external-page/external-page.vue"),
                meta: {
                  title: "link-juejin",
                  hide: false,
                  disable: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://juejin.cn/user/1728883023940600", // 链接
                  iframe: false, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 4
                }
              }
            ]
          }
        ]
      },
      {
        path: "/disable-menu",
        name: "disable-menu",
        redirect: "/disable-menu/disable-menu-1",
        meta: {
          title: "disable-menu",
          hide: false,
          disable: true,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "switch",
          sort: 11
        },
        children: [
          {
            path: "/disable-menu/disable-menu-1",
            name: "disable-menu-1",
            component: () => import("@/views/disable-menu/disable-menu-1/disable-menu-1.vue"),
            meta: {
              title: "disable-menu-1",
              hide: false,
              disable: true,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
            }
          }
        ]
      },
      {
        path: "/hide-menu",
        name: "hide-menu",
        redirect: "/hide-menu/hide-menu-1",
        meta: {
          title: "hide-menu",
          hide: true,
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "switch",
          sort: 12
        },
        children: [
          {
            path: "/hide-menu/hide-menu-1",
            name: "hide-menu-1",
            component: () => import("@/views/hide-menu/hide-menu-1/hide-menu-1.vue"),
            meta: {
              title: "hide-menu-1",
              hide: true,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 1
            }
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
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin", "common"],
          svgIcon: "earth",
          sort: 13
        }
      },
      {
        path: "/about-project",
        name: "about-project",
        component: () => import("@/views/about-project/about-project.vue"),
        meta: {
          title: "about-project",
          hide: false,
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin", "common"],
          svgIcon: "about",
          sort: 14
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
 * 定义401、404、500界面
 * 401无权限
 * 404页面不存在
 * 500网络断开
 * @link 参考：https://router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const notFoundAndNoPower = [
  {
    path: "/401", // 无权限，跳转401
    name: "no-access",
    component: () => import("@/views/error/401.vue"),
    meta: {
      title: "no-access",
      hide: true
    }
  },
  {
    path: "/500", // 无网络-浏览器离线
    name: "no-network",
    component: () => import("@/views/error/500.vue"),
    meta: {
      title: "no-network",
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
