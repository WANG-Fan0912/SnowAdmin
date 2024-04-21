/* ts命名空间 */
/* 路由-Menu */
declare namespace Menu {
  interface MenuOptions {
    path: string;
    name: string;
    redirect?: string;
    component?: string | (() => Promise<unknown>);
    meta: MetaType;
    children?: MenuOptions[];
  }
  interface MetaType {
    title: string;
    hide: boolean;
    keepAlive: boolean;
    affix: boolean;
    link?: string;
    iframe?: boolean;
    roles: Array<string>;
    icon?: string;
    svgIcon?: string;
  }
}
/* tabs菜单 */
declare namespace TabsMenu {
  interface list {
    list: Array<{ type: number; icon: string; title: string }>;
  }
  interface menu {
    type: number;
    icon: string;
    title: string;
  }
}
