<template>
  <div id="app">
    <MouseMove>
      <template #default="{ x, y }">
        <div>
          <div>坐标:</div>
          <span>(x: {{ x }}</span>
          ,
          <span>y: {{ y }})</span>
        </div>
      </template>
    </MouseMove>
    <div>
      <li v-for="(item, index) in list" :key="index">{{ index }}</li>
    </div>
    <p>使用index做v-for的key会导致删除行为不符合预期</p>
    <button @click="addItem">添加</button>
    <button @click="removeItem">删除</button>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MouseMove from "@/components/mousemove";

export default {
  name: "App",
  components: {
    MouseMove,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    addItem() {
      this.list.push("add");
    },
    removeItem() {
      this.list.splice(0, 1);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
