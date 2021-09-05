export class BaseHistory {
  constructor(router) {
    this.router = router;
    // 当前路由
    this.current = { path: "/" };
  }
}
