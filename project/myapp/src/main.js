import Vue from "vue";
import App from "./App.vue";
import global from "./utils/global";
import "./global.css";
import router from "./router";
import Element from "element-ui";

Vue.config.productionTip = false;
Vue.use(global);
Vue.use(Element);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
