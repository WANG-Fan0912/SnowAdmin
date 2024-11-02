/**
 * 路由path路径与文件夹名称相同，找文件可以浏览器地址快速查找，方便定位文件
 *
 * component
 * 模块加载路径，除了layout外，全部默认路径为src/views文件夹内的文件
 * 不要以"/"开头，结尾不要带文件扩展名，如:".vue"
 * 举例：views文件夹下的home文件夹下的home.vue
 * component: "home/home"
 *
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
 * sort:        菜单顺序
 * }
 */

/**
 * 路由的层级设置
 * layout为框架布局，顶层路由
 * layout.children下的路由为menu菜单，例如：首页、系统设置、权限管理，在这里我称它为"一级路由"
 * 一级路由下的children则是当前菜单的二级菜单
 * 依此类推
 */
export default [
  {
    path: "/",
    name: "/",
    redirect: "/home",
    component: "layout", // 容器布局-顶层路由
    meta: {
      keepAlive: true
    },
    // 二级路由-主要渲染页面
    children: [
      {
        path: "/home",
        name: "home",
        component: "home/home",
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
            component: "file-management/document-library/document-library",
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
            component: "table-management/common-table/common-table",
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
              sort: 1
            }
          },
          {
            path: "/table-management/custom-table",
            name: "custom-table",
            component: "table-management/custom-table/custom-table",
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
              sort: 2
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
            component: "form-management/common-form/common-form",
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
            component: "form-management/step-form/step-form",
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
            component: "multilevel-menu/second-menu/second-menu-1",
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
                path: "/multilevel-menu/third-menu-2",
                name: "third-menu-2",
                component: "multilevel-menu/third-menu/third-menu-2",
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
              {
                path: "/multilevel-menu/third-menu-1",
                name: "third-menu-1",
                component: "multilevel-menu/third-menu/third-menu-1",
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
                path: "/multilevel-menu/third-menu-3",
                name: "third-menu-3",
                component: "multilevel-menu/third-menu/third-menu-3",
                meta: {
                  title: "third-menu-3",
                  link: "",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 3
                }
              },
              {
                path: "/multilevel-menu/third-menu-4",
                name: "third-menu-4",
                component: "multilevel-menu/third-menu/third-menu-4",
                meta: {
                  title: "third-menu-4",
                  link: "",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 4
                }
              },
              {
                path: "/multilevel-menu/third-menu-5",
                name: "third-menu-5",
                component: "multilevel-menu/third-menu/third-menu-5",
                meta: {
                  title: "third-menu-5",
                  link: "",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 5
                }
              },
              {
                path: "/multilevel-menu/third-menu-6",
                name: "third-menu-6",
                component: "multilevel-menu/third-menu/third-menu-6",
                meta: {
                  title: "third-menu-6",
                  link: "",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 6
                }
              },
              {
                path: "/multilevel-menu/third-menu-7",
                name: "third-menu-7",
                component: "multilevel-menu/third-menu/third-menu-7",
                meta: {
                  title: "third-menu-7",
                  link: "",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 7
                }
              },
              {
                path: "/multilevel-menu/third-menu-8",
                name: "third-menu-8",
                component: "multilevel-menu/third-menu/third-menu-8",
                meta: {
                  title: "third-menu-8",
                  link: "",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 8
                }
              },
              {
                path: "/multilevel-menu/third-menu-9",
                name: "third-menu-9",
                component: "multilevel-menu/third-menu/third-menu-9",
                meta: {
                  title: "third-menu-9",
                  link: "",
                  hide: false,
                  keepAlive: true,
                  affix: false,
                  iframe: false,
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 9
                }
              }
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
            component: "common-component/player/player",
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
            component: "common-component/print/print",
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
            component: "common-component/draggable/draggable",
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
            component: "common-component/editor/editor",
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
            component: "common-component/newbie/newbie",
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
            path: "/common-component/icon-selector",
            name: "icon-selector",
            component: "common-component/icon-selector/icon-selector",
            meta: {
              title: "icon-selector",
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
          },
          {
            path: "/common-component/user-center",
            name: "user-center",
            component: "common-component/user-center/user-center",
            meta: {
              title: "user-center",
              hide: true,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              icon: "icon-menu",
              sort: 7
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
            component: "custom-instruction/anti-shake/anti-shake",
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
            component: "custom-instruction/throttle/throttle",
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
            component: "custom-instruction/test-instruction/test-instruction",
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
            component: "personal-center/userinfo/userinfo",
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
            component: "personal-center/user-settings/user-settings",
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
        redirect: "/system-management/account-management",
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
            component: "system-management/account-management/account-management",
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
            component: "system-management/role-management/role-management",
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
            component: "system-management/menu-management/menu-management",
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
            component: "system-management/division-management/division-management",
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
            component: "system-management/dictionary-management/dictionary-management",
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
            component: "system-management/system-log/system-log",
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
                component: "external-links/inline-page/inline-page",
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
                component: "external-links/inline-page/inline-page",
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
                component: "external-links/inline-page/inline-page",
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
                component: "external-links/external-page/external-page",
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
                component: "external-links/external-page/external-page",
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
                component: "external-links/external-page/external-page",
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
                path: "/external-links/external-page/link-github",
                name: "link-github",
                component: "external-links/external-page/external-page",
                meta: {
                  title: "link-github",
                  hide: false,
                  disable: false,
                  keepAlive: true,
                  affix: false,
                  link: "https://github.com/WANG-Fan0912/SnowAdmin", // 链接
                  iframe: false, // 区分是否内链 true内链 false外链
                  roles: ["admin"],
                  icon: "icon-menu",
                  sort: 3
                }
              },
              {
                path: "/external-links/external-page/link-juejin",
                name: "link-juejin",
                component: "external-links/external-page/external-page",
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
            component: "disable-menu/disable-menu-1/disable-menu-1",
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
            component: "hide-menu/hide-menu-1/hide-menu-1",
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
        component: "internationalization/internationalization",
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
        component: "about-project/about-project",
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
