const Module = require("./module");
const _ = require("lodash");

class ModuleCollect {
  constructor(rawModule) {
    this.register([], rawModule);
  }

  /** 根据path获取模块，从上至下 */
  get(path) {
    return path.reduce((module, key) => {
      return module.getChildren(key);
    }, this.root);
  }

  /** 获得命名空间， 用 / 分割*/
  getNamespace(path) {
    let module = this.root;
    return path.reduce((namespace, key) => {
      module = module.getChildren(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  }

  // 递归加载rawModule对象 构造Module树 深度优先遍历
  register(path, rawModule) {
    if (path.length === 0) {
      this.root = new Module(rawModule);
    } else {
      // 单向连接 父亲知道儿子是谁 但是儿子不知道父亲是谁，可以从上往下搜索
      const parent = this.get(path.slice(0, -1));
      const key = path[path.length - 1];
      parent.addChildren(key, new Module(rawModule));
    }

    if (rawModule.modules) {
      _.forEach(rawModule.modules, (module, name) => {
        this.register(path.concat(name), module);
      });
    }
  }
}

module.exports = ModuleCollect;
