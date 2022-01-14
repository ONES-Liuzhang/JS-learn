// 测试slot 鼠标移动事件
<template>
	<div>
		<slot :x="x" :y="y"></slot>
	</div>
</template>
<script>
export default {
	name: "MouseMove",
	data() {
		return {
			x: 0,
			y: 0,
		};
	},
	methods: {
		update(e) {
			this.x = e.pageX;
			this.y = e.pageY;
		},
	},
	beforeMount() {
		window.document.addEventListener("mousemove", this.update);
	},
	beforeDestroy() {
		window.document.removeEventListener("mousemove", this.update);
	},
	unmounted() {
		window.document.removeEventListener("mousemove", this.update);
	},
};
</script>
