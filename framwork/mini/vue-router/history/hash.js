import { BaseHistory } from "./base.js";

/**
 * 基础知识
 * 1. 当路由是 http://xxx/#/abc 带有#的时候 location.hash 会返回 #/abc
 * 2. 改变 #/ 后的路径，不会发送新请求
 * 3. 路由哈希值变化时会触发hashChange事件
 * 4. 调用window.history.pushState() 进行hash改变时不会触发 hashChange事件
 */

export class HashHistory extends BaseHistory {
  constructor() {
    super();
  }
}
