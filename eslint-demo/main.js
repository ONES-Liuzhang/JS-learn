import Vue from "./public/vue2";

new Vue({
	render(h) {
		return h("h1", {}, "Hello world");
	},
}).$mount("#app");
