import { createRoute } from "../route.js";

export class BaseHistory {
  constructor(router) {
    this.router = router;
    // 默认当前路由为跟路由
    this.current = createRoute(null, { path: "/" });
  }

  /** 1. 改变 history 对象中的 current - 只是改变了数据
   *  2. onComplate 里需要更新组件
   */
  transitionTo(location, onComplate, onAbort) {
    const route = this.router.match(location);

    this.current = this.route;

    this.ensureURL();

    onComplate && onComplate(route);
  }
}
