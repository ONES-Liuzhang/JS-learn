import { install } from "./install.js";
import { createMatcher } from "./create-matcher.js";
import { HashHistory } from "./history/hash.js";
import { Html5History } from "./history/html5.js";
import { AbstractHistory } from "./history/abstract.js";
const inBrowser = typeof window !== "undefined";

class VueRouter {
  constructor(options) {
    this.options = options;

    this.matcher = createMatcher(options.routes || [], this);

    if (!inBrowser) {
      this.mode = "abstract";
    }
    this.mode = options.mode ? options.mode : "hash";

    switch (this.mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;
      case "history":
        this.history = new Html5History(this);
        break;
      case "abstract":
        this.history = new AbstractHistory(this);
        break;
      default:
        // 如果客户配置了mode 并且mode不符合我们的配置
        if (process.env.NODE_ENV !== "production") {
          throw new Error(`invalid mode: ${mode}`);
        }
    }
  }

  /**
   *
   * @param {*} raw
   * @returns route
   */
  match(raw) {
    return this.matcher.match(raw);
  }

  push(route, onComplate, onAbort) {
    if (!onComplate && !onAbort && typeof Promise !== "undefined") {
      return new Promise((resolve, reject) => {
        this.history.push(route, resolve, reject);
      });
    } else {
      this.history.push(route, onComplate, onAbort);
    }
  }
}

VueRouter.install = install;

export default VueRouter;
