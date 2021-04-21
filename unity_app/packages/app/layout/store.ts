import Vue from 'vue'

export const state = Vue.observable({
  // isListenScroll: false, // 是否监听滚动
  menuKey: '', // 当前的顶部导航key
})

export const mutations = {
  setMenuKey(value: string) {
    state.menuKey = value
  },
}
