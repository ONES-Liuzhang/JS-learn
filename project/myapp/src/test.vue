<template>
	<div>
		<h1>aaaa</h1>
		<router-link to="/foo">toFoo </router-link>
		<router-link to="/bar">toBar </router-link>
		<router-view />
		<span>{{ isNaN("a") }}</span>
		<span></span>
		<button @click="test">点我测试</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			message: "aaaaa",
		};
	},
	methods: {
		test() {
			this.proxy = {};
			this._proxy = {};
			this.$data._proxyTest = "是我";
			console.log(this);
			window.test = this;
			"NaN" in this._renderProxy;
		},
	},
};
</script>
