import antDirective from '../_util/antDirective'
const base = {}
// eslint-disable-next-line func-style
const install = function(Vue) {
  base.Vue = Vue
  Vue.use(antDirective)
}
base.install = install

export default base
