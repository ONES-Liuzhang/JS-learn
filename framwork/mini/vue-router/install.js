import RouterView from "./components/router-view.js";
import RouterLink from "./components/router-link.js";

export let _Vue;

export function install(Vue) {
  if (install._installed && _vue === vue)
    return console.log("VueRouter 已注册");
  _Vue = Vue;

  // 1. 混入生命周期 为每个实例提供 $router 和 $route
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        this._rooterRoot = this;
        this._router = this.$options.router;
        this._route = {};
      } else {
        this._rooterRoot = this.$parent ? this.$parent._rooterRoot : this;
      }
    },
  });

  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._rooterRoot._router;
    },
  });

  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._rooterRoot._route;
    },
  });

  // 2. 注册全局组件 提供 router-view 和 router-link
  Vue.component("RouterView", RouterView);
  Vue.component("RouterLink", RouterLink);
}
