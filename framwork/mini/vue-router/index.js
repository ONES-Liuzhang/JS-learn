import RouterView from "./components/router-view.js";
import RouterLink from "./components/router-link.js";
let Vue;

class VueRouter {
  constructor(options) {}
}

VueRouter.install = function (_Vue) {
  Vue = _Vue;

  // 混入生命周期
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        this._rooterRoot = this;
        this._router = this.$options.router;
        this._route = {};
      } else {
        this._rooterRoot = this.$parent ? this.$parent._rooterRoot : this;
      }

      Object.defineProperty(this, "$router", {
        get() {
          this._rooterRoot._router;
        },
      });

      Object.defineProperty(this, "$route", {
        get() {
          this._rooterRoot._route;
        },
      });
    },
  });

  // 注册全局组件
  Vue.component("RouterView", RouterView);
  Vue.component("RouterLink", RouterLink);
};

export default VueRouter;
