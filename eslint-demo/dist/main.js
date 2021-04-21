"use strict";

var _vue = _interopRequireDefault(require("./public/vue2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

new _vue["default"]({
  render: function render(h) {
    return h("h1", {}, "Hello world");
  }
}).$mount("#app");