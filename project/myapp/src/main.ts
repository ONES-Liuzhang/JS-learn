import Vue from "vue";
import App from "./App.vue";
import global from "./utils/global";
import "./global.css";

Vue.config.productionTip = false;
Vue.use(global);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
