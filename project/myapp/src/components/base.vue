<template>
  <div :style="{ width: mainWidth, margin: 'auto' }">
    <p>title: {{ title }}</p>
    <slot name="default">
      <span>自己的默认插槽</span>
    </slot>
    <slot name="footer">
      <h1>自己的footer</h1>
    </slot>
    <button @click="handleClick">点我！！！</button>
  </div>
</template>
<script>
export default {
  name: "foo",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    width: {
      type: [String, Number],
      default: "200",
    },
  },
  methods: {
    handleClick() {
      this.$emit("go", 222);
    },
  },
  computed: {
    mainWidth() {
      return this.width + "px";
    },
  },
};
</script>
