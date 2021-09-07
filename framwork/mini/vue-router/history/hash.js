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

  /** 注册监听事件 TODO: 为什么要延迟执行
   *
   * 当用户直接改变浏览器的location时
   * 当用户点击浏览器的前进后退按钮时
   */
  setupListeners() {
    if (this.listeners.length > 0) {
      return;
    }

    // 监听到路由改变之后 要进行跳转
    const handleRoutingEvent = () => {
      console.log("触发Vue-router 路由跳转");
      this.transitionTo(getHash(), (route) => {
        console.log(
          `setupListeners - transitionTo 跳转完成，${JSON.stringify(route)}`
        );
      });
    };

    window.addEventListener("popstate", handleRoutingEvent);

    // 要保存摧毁监听的函数，当Vue实例销毁的时候移除监听，释放内存
    return () => {
      this.listeners.push(() => {
        window.removeEventListener("popstate", handleRoutingEvent);
      });
    };
  }

  /** 改变location值 */
  ensureURL() {
    const current = this.current.fullPath;
    if (getHash() !== current) {
      pushHash();
    }
  }

  push(location, onComplate, onAbort) {
    this.transitionTo(location, (route) => {
      pushHash(route.fullPath);
      onComplate && onComplate(route);
    });
  }

  go(num) {
    window.history.go(num);
  }
}

function getHash() {
  let href = window.location.href;

  let index = href.indexOf("#");
  if (index < 0) return "/";

  href = href.slice(index + 1);

  return href;
}

/** index.html不在服务器根路径时 要拼接路径 */
function getUrl(path) {
  let href = window.location.href;
  const hashIndex = href.indexOf("#");
  const base = href.slice(0, hashIndex);

  return `${base}#${path}`;
}

function pushHash(path) {
  window.history.pushState(getUrl(path));
}
