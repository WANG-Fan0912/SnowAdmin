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
    isHide: boolean;
    isKeepAlive: boolean;
    isAffix: boolean;
    isLink?: string;
    isIframe?: boolean;
    roles: Array<string>;
    icon?: string;
    svgIcon?: string;
  }
}
