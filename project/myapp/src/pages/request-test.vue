<template>
	<div>
		<button @click="onClick1"></button>
	</div>
</template>
<script>
import { getSth } from "@/api";

export default {
	name: "RequestTest",
	methods: {
		async onClick1() {
			let res = await getSth();
			console.log(res);
		},
	},
};
</script>
