import { BaseHistory } from "./base.js";

/**
 * 基础知识
 * 1. 当路由是 http://xxx/#/abc 带有#的时候 location.hash 会返回 #/abc
 * 2. 改变 #/ 后的路径，不会发送新请求
 * 3. 路由哈希值变化时会触发hashChange事件
 * 4. 调用window.history.pushState() 进行hash改变时不会触发 hashChange事件
 *
 * 要搞清楚popstate 和 hashChange 事件的触发时机
 *
 * 跳转方式
 * 1. location.href = "xxx"
 * 2. history.pushState(state, title, url)  - 优先选用pushState的方式进行路由跳转
 *
 * 使用 location.href 跳转
 * 1. history.go(num)  会触发 popstate 和 hashchange事件
 * 2. location.href = "#/xxx"  href 仅改变 hash 会触发 popstate 和 hashchange 事件
 * 3. location.href = "/xxx"   href 改变了路由 页面会被刷新，不会触发 popstate 和 hashchange 事件 ?? TODO 证实
 *
 *  ** pushState 调用时 就算改变了hash值，也不会触发 hashchange 也不会刷新页面 **
 */

export class HashHistory extends BaseHistory {
  constructor(router) {
    super(router);
  }

  // 注册监听事件 TODO: 延迟执行
  setupListeners() {}

  /** 暴露出的 push 方法 */
  push(location, onComplate, onAbort) {
    this.transitionTo(location, (route) => {
      pushHash(route.fullPath);
      onComplate && onComplate(route);
    });
  }
}

function pushHash(path) {}
