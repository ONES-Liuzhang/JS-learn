/*
 * 用户的store
 */

import Vue from 'vue'
let userData: any = null

const dict = null
export const state = Vue.observable({
  // 是否登入
  isLogin: false,
  // token

})


export const mutations = {
  setId(value: boolean) {
    state.isLogin = value

  },


}


export const getter = {
  getUser() {
    return userData
  },
  getCurDept() {

  }
}

// 异步修改 state
export const actions = {

}
