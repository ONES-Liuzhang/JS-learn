const downSvg = require('svg/common/down_arrow.svg').default

const doubleLeftSvg = require('svg/common/double-left.svg').default
const caret_down = require('svg/common/caret-down.svg').default

const map = {
  up: { svg: downSvg, rotate: 180 },
  down: { svg: downSvg },
  left: { svg: downSvg, rotate: 90 },
  right: { svg: downSvg, rotate: 270 },
  search: { svg: require('svg/common/search.svg').default },
  close: { svg: require('svg/common/close.svg').default },
  closelight: { svg: require('svg/mymenu/close.svg').default },

  loading: { svg: require('svg/common/loading.svg').default },
  warning: { svg: require('svg/common/warning.svg').default, rotate: 180 },
  info: { svg: require('svg/common/warning.svg').default },

  success: { svg: require('svg/common/success.svg').default },
  error: { svg: require('svg/common/error.svg').default },
  clear: { svg: require('svg/common/clear.svg').default },
  filter: { svg: require('svg/common/filter.svg').default },


  dLeft: { svg: doubleLeftSvg },
  dRight: { svg: doubleLeftSvg, rotate: 180 },


  'caret-down': { svg: caret_down },
  'caret-up': { svg: caret_down, rotate: 180 },
  'caret-left': { svg: caret_down, rotate: 90 },
  'caret-right': { svg: caret_down, rotate: 270 },

}
export default map
