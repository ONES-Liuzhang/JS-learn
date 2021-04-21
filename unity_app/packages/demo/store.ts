import Vue from 'vue'
export const state = Vue.observable({
  //
  asideKey: '',
})

export const mutations = {
  setAsideKey(value: string) {
    state.asideKey = value
  },
}
