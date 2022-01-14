<template>
  <div class="main">
    <h1>Main</h1>
    <div>
      <router-link to="foo">Foo </router-link>
      <router-link to="bar">Bar </router-link>
      <router-link to="hello">Hello </router-link>
    </div>
    <router-view class="child"></router-view>
    <hocComp title="高阶组件" width="300" @onGo="onGo">
      <h1 slot="footer">传入Footer</h1>
      <p>传入默认插槽</p>
    </hocComp>
  </div>
</template>
<script>
import hoc from "./hoc";
import base from "./base.vue";
const hocComp = hoc(base);
export default {
  name: "mainBox",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: { hocComp },
  methods: {
    onGo(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.main {
  background: cornsilk;
}

.child {
  background: coral;
}
</style>
