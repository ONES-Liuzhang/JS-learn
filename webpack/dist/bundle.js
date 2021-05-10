(function (modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    // 获取缓存的module
    if (installedModules[moduleId]) {
      return installedModules[moduleId];
    }

    var module = (installedModules[moduleId] = {
      id: moduleId,
      l: false,
      exports: {},
    });

    // 执行模块函数
    modules[moduleId].call(module.exports, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }

  return __webpack_require__(__webpack_require__.s = "./app.js")
})({
  
    "./app.js": (function(module, exports, __webpack_require__) {
      eval("const a = __webpack_require__(\"./js/moduleA.js\");\n\nconst b = __webpack_require__(\"./js/moduleB.js\");\n\nconsole.log(a);\nconsole.log(b);" )
    }),
  
    "./js/moduleA.js": (function(module, exports, __webpack_require__) {
      eval("module.exports = \"a\";" )
    }),
  
    "./js/moduleB.js": (function(module, exports, __webpack_require__) {
      eval("module.exports = \"b\";" )
    }),
  
});
