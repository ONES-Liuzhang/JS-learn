/**
 * vite 用于处理 commonjs 规范的模块
 *
 * 源码：
 * x.js
 * module.exports = "x"
 *
 * y.js
 * const x = require('x')
 * console.log('y.js required x,value is ', x)
 *
 * const require_x = __commonJS({
 *    'node_modules/x': (module, exports) => {
 *        module.exports = "x"
 *    }
 * })
 *
 * const require_y = __commonJS({
 *    'node_modules/y': (module, exports) => {
 *        const x = require_x();
 *        console.log('y.js required x,value is ', x)
 *    }
 * })
 *
 */
const __commonJS = (cb, mod) =>
  function __require() {
    if (mod) {
      return mod;
    }

    const module = {
      exports: {},
    };

    return cb[Object.keys(cb)[0]](module, module.exports);
  };

const fs = require("fs");

const moduleMap = new Map();

// 加载文件
const load = (absPath) => {
  if (moduleMap.has(absPath)) {
    return moduleMap.get(absPath);
  }
  try {
    const content = fs.readFileSync(absPath);

    moduleMap.set(absPath, content);
  } catch {
    console.warn(`加载文件${absPath}出错！`);
  }
};
