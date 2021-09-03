1. vuex 的使用

```js
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.store({
  state: {
    item: "",
  },
  mutations: {
    setItem({ state }, item) {
      state.item = item;
    },
  },
  actions: {
    getTodo({ commit }) {
      commit("setItem");
    },
  },
});
```
