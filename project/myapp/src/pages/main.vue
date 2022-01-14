<template>
	<button @click="onRefreshClick">刷新</button>
</template>
<script>
export default {
	name: "Main",
	created() {
		console.log("重新加载Main");
	},
	methods: {
		onRefreshClick() {
			this.$router.push({
				path: "/main",
				query: { randomId: "id" + Math.random() },
			});
		},
	},
};
</script>
