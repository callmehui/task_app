/**
 * 页面懒加载
 * pagePath: 页面路径
 */
export function lazyLoad(pagePath: string) {
  return () =>
    import(`../views/${pagePath}`);
}