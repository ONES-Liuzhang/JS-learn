import { state, mutations } from './store'


export const topMenuMixin = {
  beforeRouteEnter(to: Route, from: Route, next: () => void) {
    mutations.setMenuKey(to.name || '') // 设置顶部菜单选中
    next()
  },
  beforeRouteUpdate(to: Route, from: Route, next: () => void) {
    mutations.setMenuKey(to.name || '') // 设置顶部菜单选中
    next()
  },

  beforeRouteLeave(to: Route, form: Route, next: () => void) {
    mutations.setMenuKey('') // 设置顶部菜单不选中
    next()
  },
}
