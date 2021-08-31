const _ = require("lodash");
// 使用module对vuex进行分层
class Module {
  // 每个module都有自己的state、mutation、actions 以及namespace 命名空间
  constructor(rawModule) {
    this._children = Object.create(null);

    this._rawModule = rawModule;

    const rawState = rawModule.state;
    // 初始化state
    this.state = typeof rawState === "function" ? rawState() : rawState;
  }

  // TODO 是否使用命名空间 有啥用❓
  get namespaced() {
    return !!this._rawModule.namespaced;
  }

  addChildren(key, module) {
    this._children[key] = module;
  }

  rmChildren(key) {
    delete this._children[key];
  }

  getChildren(key) {
    return this._children[key];
  }

  forEachMutations(cb) {
    _.forEach(this._rawModule.mutations, (mutation, key) => {
      cb(key, mutation);
    });
  }
  forEachActions(cb) {
    _.forEach(this._rawModule.actions, (actions, key) => {
      cb(key, actions);
    });
  }
  forEachGetters(cb) {
    _.forEach(this._rawModule.getters, (getters, key) => {
      cb(key, getters);
    });
  }
}

module.exports = Module;
