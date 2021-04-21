import Vue from 'vue'

export const state = Vue.observable({
  //
  hide: false,
})

export const mutations = {
  setHide(val: boolean) {
    state.hide = val
  },
}
