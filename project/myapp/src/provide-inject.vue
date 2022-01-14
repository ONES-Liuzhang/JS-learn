<template>
  <div>
    <p>Provide/Inject</p>
    <p>{{ _provided.p1 }}</p>
    <Child2></Child2>
    <Child></Child>
  </div>
</template>
<script>
const Child = {
  name: "ChildView",
  inject: {
    p1: { default: "p1" },
  },
  render(h) {
    return h("div", {}, [
      h("p", {}, this.p1.title),
      h(
        "button",
        {
          on: {
            click: this.handleClick,
          },
        },
        "点击修改Inject"
      ),
    ]);
  },
  methods: {
    handleClick() {
      this.p1 = { title: "p2" };
    },
  },
  mounted() {
    console.log("children mounted");
  },
};

const Child2 = {
  name: "Child2View",
  inject: {
    p1: { default: "p1" },
  },
  render(h) {
    return h("div", {}, [h("p", {}, this.p1.title)]);
  },
  mounted() {
    console.log("children2 mounted");
  },
};

export default {
  name: "ProvideInject",
  components: { Child, Child2 },
  provide: {
    p1: {
      title: "p1",
    },
  },
  mounted() {
    console.log("parent mounted");
  },
};
</script>
