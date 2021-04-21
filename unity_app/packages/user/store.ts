/*
 * 用户的store
 */
import Vue from 'vue';
import { setToken, removeToken, getToken } from '@/app/libs/cookies'

const orgs: { id: string, name: string } [] = [] // 机构列表
const roles: { id: string, name: string } [] = [] // 角色列表
const depts: { id: string, name: string } [] = [] // 部门列表
export const state = Vue.observable({
  isLogin: false, // 是否已登入
  id: '', // 用户的id
  name: '', // 用户名
  token: '', // 用户认证token
  curOrg: null,
  curRoles: null,
  curDept: null,
})

export const mutations = {
  setId(value: string) {
    state.id = value
  },
  setToken(val: string) {
    removeToken()
    setToken(val)
    state.token = val
  },
}

export const getter = {
  getOrgs() {
    return orgs
  },
  getRoles() {
    return roles
  },
  getDepts() {
    return depts
  },
  getToken() {
    return getToken()
  },
}
