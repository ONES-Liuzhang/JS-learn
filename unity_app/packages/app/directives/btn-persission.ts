import Vue from 'vue'

// 权限指令
const has = Vue.directive('has', {
  inserted(el, binding, vNode: VNode) {
    let btnPermissionArr = []
    if (binding.value) { // value 就是传递给自定义属性的值
      btnPermissionArr = Array.of(binding.value)
    } else {
      btnPermissionArr = vNode.context!.$route.meta.btnPermissionArr
    }
    if (!Vue.prototype.$_has(btnPermissionArr)) { // 没有权限直接销毁dom
      el.parentNode!.removeChild(el)
    }
  },
})


// 检查权限的方法
Vue.prototype.$_has = function (value: string[]) {
  let isExist = false
  // 获取用户按钮权限
  let btnPermissionStr = sessionStorage.getItem('btnPermissions') // 从session里面获取用户btn权限
  // eslint-disable-next-line no-undefined
  if (btnPermissionStr === undefined || btnPermissionStr === null) { // 边界条件判断
    return false
  }
  if (value.includes(btnPermissionStr)) { // 判断是否有权限
    isExist = true
  }
  return isExist
}

export default has // 导出这个指令
