const ModuleCollect = require("./module-collect");
const _ = require("lodash");
let Vue;

class Store {
  constructor(options) {
    this._modules = new ModuleCollect(options);

    const state = this._modules.root.state;
    this._state = state;
    this._mutations = Object.create(null);
    this._actions = Object.create(null);
    this._getters = Object.create(null);
    this._namespacedMap = Object.create(null);

    const { dispatch, commit } = this;

    const store = this;
    this.dispatch = function dispatchBound(...payload) {
      return dispatch.call(store, ...payload);
    };

    this.commit = function commitBound(...payload) {
      return commit.call(store, ...payload);
    };

    installModule(this, state, this._modules.root, []);

    resetStoreVM(this);
  }

  get state() {
    return this._state;
  }

  set state(val) {
    console.error("不允许直接给state赋值");
  }

  /** 触发同步状态改变 */
  commit(name, ...payload) {
    this._mutations[name](...payload);
  }

  /** 触发异步状态改变 */
  dispatch(type, ...payload) {
    this._actions[type](...payload);
  }
}

/**
 *
 * @param {*} store
 * @param {*} state 当前state
 * @param {*} root module
 * @param {*} path
 */
function installModule(store, rootState, module, path) {
  const isRoot = !path.length;
  // 命名空间，触发mutation/dispatch的时候的key值
  const namespace = store._modules.getNamespace(path);

  if (module.namespaced) {
    if (store._namespacedMap[namespace]) {
      console.error("命名空间冲突！");
    }
    store._namespacedMap[namespace] = module;
  }

  // 1.构造state
  if (!isRoot) {
    const parentState = getNestedState(rootState, path.slice(0, -1));
    const moduleName = path[path.length - 1];

    Vue.set(parentState, moduleName, module.state);
  }

  module.forEachMutations((key, mutation) => {
    store._mutations[namespace + key] = (...payload) => {
      mutation(module.state, ...payload);
    };
  });

  module.forEachActions((key, action) => {
    store._actions[namespace + key] = (...payload) => {
      action(store, ...payload);
    };
  });

  if (module._children) {
    _.forEach(module._children, (m, key) => {
      installModule(store, rootState, m, path.concat(key));
    });
  }
}

function getNestedState(state, path) {
  return path.length ? path.reduce((state, key) => state[key], state) : state;
}

/** 使state可响应 */
function resetStoreVM(store) {
  store._vm = new Vue({
    data: {
      $$store: store.state,
    },
  });
}

/** 注册，使所有组件实例都可以通过this.$store 来获取state树 */
function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      vuexInit.call(this, this.$options);
    },
  });
  function vuexInit(options) {
    if (options.store) {
      this.$store =
        typeof options.store === "function" ? options.store() : options.store;
    } else if (options.$parent && options.$parent.$store) {
      this.$store = options.$parent.store;
    }
  }
}

module.exports = {
  install,
  Store,
};
