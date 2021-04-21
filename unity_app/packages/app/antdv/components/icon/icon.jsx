/* eslint-disable no-undefined */
import classNames from 'classnames'
import './style/index'
// import allIcons from './allIcons'
// import * as allIcons from '@ant-design/icons/es'
import PropTypes from '../_util/vue-types'
import iconMap from './iconMap'
import {
  svgBaseProps,
  // withThemeSuffix, removeTypeTheme, getThemeFromTypeName, alias
} from './utils'
import warning from '../_util/warning'
// import LocaleReceiver from '../locale-provider/LocaleReceiver'
import { filterEmpty, getClass } from '../_util/props-util'


function renderIcon(h, context) {
  const { props, slots, listeners, data } = context
  let {
    type,
    component: Component,
    viewBox,
    spin,
    rotate,
    tabIndex,
  } = props
  const slotsMap = slots()
  let children = filterEmpty(slotsMap.default)
  children = children.length === 0 ? undefined : children
  warning(
    Boolean(type || Component || children),
    'Icon should have `type` prop or `component` prop or `children`.')

  const classString = classNames({
    ...getClass(context),
    [`anticon`]: true,
    [`anticon-${type}`]: !!type,
  })

  const svgClassString = classNames({ [`anticon-spin`]: !!spin || type === 'loading' })

  const svgStyle = rotate ? { msTransform: `rotate(${rotate}deg)`, transform: `rotate(${rotate}deg)` } : undefined

  let innerNode

  // component > children > type
  if (Component) {
    const innerSvgProps = {
      attrs: { ...svgBaseProps },
      class: svgClassString,
      style: svgStyle,
    }
    if (viewBox) innerSvgProps.attrs.viewBox = viewBox
    innerNode = <Component {...innerSvgProps}> {children} </Component>
  } else if (children) {
    warning(
      Boolean(viewBox) || (children.length === 1 && children[0].tag === 'use'),
      'Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon.'
    )
    const innerSvgProps = {
      attrs: { ...svgBaseProps },
      class: svgClassString,
      style: svgStyle,
    }
    innerNode = (
      <svg {...innerSvgProps} viewBox={viewBox}>
        {children}
      </svg>
    )
  } else if (typeof type === 'string') {
    const target = iconMap[type]

    warning(Boolean(target), `this type '${type}' has not the iconMap key`)

    let RenderComponent
    if (target) {
      if (target.rotate) rotate = target.rotate
      RenderComponent = target.svg
    }

    const innerSvgProps = {
      attrs: { ...svgBaseProps, viewBox },
      class: svgClassString,
      style: rotate ? { msTransform: `rotate(${rotate}deg)`, transform: `rotate(${rotate}deg)` } : undefined,
    }
    if (!viewBox) {
      delete innerSvgProps.attrs.viewBox
    }

    innerNode = <RenderComponent {...innerSvgProps}>{children} </RenderComponent>
  }
  let iconTabIndex = tabIndex
  if (iconTabIndex === undefined && 'click' in listeners) {
    iconTabIndex = -1
  }
  const { attrs, ...restDataProps } = data
  // functional component not support nativeOn，https://github.com/vuejs/vue/issues/7526
  const iProps = {
    ...restDataProps,
    attrs: {
      ...attrs,
      tabIndex: iconTabIndex,
    },
    on: { ...listeners, ...data.nativeOn },
    class: classString,
    staticClass: '',
  }
  return <i {...iProps}> {innerNode} </i>
}

const Icon = {
  functional: true,
  name: 'AIcon',
  props: {
    tabIndex: PropTypes.number,
    type: PropTypes.string,
    component: PropTypes.any,
    viewBox: PropTypes.any,
    spin: PropTypes.bool.def(false),
    rotate: PropTypes.number,
    theme: PropTypes.oneOf(['filled', 'outlined', 'twoTone']),
    twoToneColor: PropTypes.string,
    role: PropTypes.string,
  },
  render(h, context) {
    return renderIcon(h, context)
  },
}


export default Icon
