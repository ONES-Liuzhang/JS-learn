const Vuex = require("../store");
const cart = require("./cart");
const Vue = require("vue");

Vue.use(Vuex);

// ---- eg.
function requestTodoItem() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(20), 2000);
  });
}

const store = new Vuex.Store({
  modules: {
    cart,
  },
  state: {
    count: 0,
  },
  mutations: {
    addCount(state, step) {
      state.count += step;
      console.log("mutations commint: addCount", state.count);
    },
  },
  getter: {
    getCount(state) {
      return state.count;
    },
  },
  actions: {
    async getTodoItem({ commit }) {
      console.log("actions dispatch: getTodoItem");
      const res = await requestTodoItem();
      commit("addCount", res);
    },
  },
});

// 调用
store.commit("addCount", 1);
store.dispatch("getTodoItem");
