// 主窗口全屏状态：窗口级全屏（内容区铺满视口），区别于浏览器原生全屏 Fullscreen API
// 使用模块级 ref，保证 Main 与 Tabs 共享同一状态，且刷新页面后不保留
const isFullPage = ref(false);

/**
 * 主窗口全屏
 * @returns isFullPage 是否全屏，toggleFullPage 切换全屏，setFullPage 设置全屏
 */
export const useFullPage = () => {
  // 切换主窗口全屏
  const toggleFullPage = () => {
    isFullPage.value = !isFullPage.value;
  };
  // 设置主窗口全屏
  const setFullPage = (data: boolean) => {
    isFullPage.value = data;
  };
  return { isFullPage, toggleFullPage, setFullPage };
};
