var result = (function (modules) {
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
    modules[moduleId].call(module, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }

  return __webpack_require__((__webpack_require__.s = "./app.js"));
})({
  "./app.js": function (module, exports, __webpack_require__) {
    eval(
      'const a = __webpack_require__("./js/moduleA.js");\n\nconst b = __webpack_require__("./js/moduleB.js");\n\n__webpack_require__("./css/index.css");\n\nconsole.log(a);\nconsole.log(b);\nmodule.exports = a + b;'
    );
  },

  "./js/moduleA.js": function (module, exports, __webpack_require__) {
    eval('module.exports = "a";');
  },

  "./js/moduleB.js": function (module, exports, __webpack_require__) {
    eval('module.exports = "b";');
  },

  "./css/index.css": function (module, exports, __webpack_require__) {
    // eval("let style = document.createElement('style');\nstyle.innerHTML = \"body {\\n  font-size: 22px;\\n}\\n\";\ndocument.body.appendChild(style);" )
    eval("");
  },
});

console.log(result);
