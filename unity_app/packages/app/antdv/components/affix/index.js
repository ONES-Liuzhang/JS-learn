const Affix = () => import( /* webpackChunkName: "antdv/affix" */ './affix')

import { setDefaultTarget } from './affix'

Affix.install = function (Vue) {
  Vue.component('AAffix', Affix)
}

Affix.setDefaultTarget = setDefaultTarget

export default Affix
