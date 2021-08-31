const state = {
  text: "hello world",
};

const mutations = {
  setText(state, text) {
    state.text = text;
  },
};

const actions = {
  getText(state) {
    setTimeout(() => {
      state.commit("setText", "hello action");
    }, 1000);
  },
};

module.exports = {
  namespaced: true,
  state,
  mutations,
  actions,
};
