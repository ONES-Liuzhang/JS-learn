import { Component, Prop, Emit, Vue, Model, Watch, Inject, Ref } from 'vue-property-decorator'
import classNames from 'classnames'
// import shallowequal from 'shallowequal'
import style from './index.module.less'
import { noop, omit } from 'lodash'
import { hasProp } from '@/app/libs/props-util'
import addEventListener from '@/app/libs/Dom/add-event-listener'
import getScroll from '@/app/libs/get-scroll'
import throttleByAnimationFrame from '@/app/libs/throttle-by-animation-frame'
import BaseMixin from '@/app/libs/base-mixin'
// @ts-ignore
import { ConfigConsumerProps } from '@/app/antdv/components/config-provider'
// import Base from '../base'
function getTargetRect(target: any) {
  return target !== window ? target.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 }
}

function getOffset(element: any, target: any) {
  const elemRect = element.getBoundingClientRect()
  const targetRect = getTargetRect(target)

  const scrollTop = getScroll(target, true)
  const scrollLeft = getScroll(target, false)

  const docElem = window.document.body
  const clientTop = docElem.clientTop || 0
  const clientLeft = docElem.clientLeft || 0

  return {
    top: elemRect.top - targetRect.top + scrollTop - clientTop,
    left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
    width: elemRect.width,
    height: elemRect.height,
  }
}

let target = typeof window !== 'undefined' ? window : null
function getDefaultTarget() {
  return target
}

export function setDefaultTarget(value: any) {
  if (value && value.constructor === HTMLDivElement) {
    target = value
  }
}

export interface IAffixProps {
  readonly offsetTop?: number
  readonly offset?: number
  readonly offsetBottom?: number
  readonly target?: any
  readonly prefixCls?: string
}
export const affixProps = {
  offsetTop: Number,
  offset: Number,
  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom: Number,
  /** 固定状态改变时触发的回调函数 */
  // onChange?: (affixed?: boolean) => void;
  /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target: Function,
  prefixCls: String,
}


@Component({
  props: {
    ...affixProps
  },
  mixins: [BaseMixin]
})
class RgAffix extends BaseMixin {
  @Ref() private readonly placeholderNode!: any
  @Ref() private readonly fixedNode!: any
  @Inject({ default: () => ConfigConsumerProps }) private readonly configProvider!: any

  public affixStyle: any = null
  private placeholderStyle: any = null
  private events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load']
  private eventHandlers = {}

  activated() {
    this.updatePosition({})
    const target = this.target || getDefaultTarget
    this.timeout = setTimeout(() => {
      this.setTargetEventListeners(target)
      this.updatePosition({})
    })
  }
  deactivated() {
    this.clearEventListeners()
    clearTimeout(this.timeout);
    (this.updatePosition as any).cancel()
  }
  created() {
    this.updatePosition = throttleByAnimationFrame(this.updatePosition)
    console.log('this.placeholderNode', this.placeholderNode)
  }
  mounted() {
    const target = this.target || getDefaultTarget
    console.log('this.placeholderNode2', this.placeholderNode)
    // Wait for parent component ref has its value
    this.timeout = setTimeout(() => {
      this.setTargetEventListeners(target)
      // Mock Event object.
      this.updatePosition({})
    })

  }
  beforeDestroy() {
    this.clearEventListeners()
    clearTimeout(this.timeout);
    (this.updatePosition as any).cancel()
  }

  @Watch('target')
  private onTargetChanged(val: string) {
    this.clearEventListeners()
    this.setTargetEventListeners(val)
    // Mock Event object.
    this.updatePosition({})
  }
  @Watch('offsetTop')
  private onOffsetTopChanged() {
    this.updatePosition({})
  }
  @Watch('offsetBottom')
  private onOffsetBottomChanged() {
    this.updatePosition({})
  }

  private setAffixStyle(e: any, affixStyle: any) {
    const { target = getDefaultTarget } = this
    const originalAffixStyle = this.affixStyle
    const isWindow = target() === window
    if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
      return
    }
    // if (shallowequal(affixStyle, originalAffixStyle)) {
    //   return
    // }
    this.setState({ affixStyle: affixStyle }, () => {
      console.log('this是什么', this)
      const affixed = !!this.affixStyle
      if ((affixStyle && !originalAffixStyle) || (!affixStyle && originalAffixStyle)) {
        this.$emit('change', affixed)
      }
    })
  }

  private setPlaceholderStyle(placeholderStyle: any) {
    const originalPlaceholderStyle = this.placeholderStyle
    // if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
    //   return
    // }
    this.setState({ placeholderStyle: placeholderStyle })
  }

  private syncPlaceholderStyle(e: any) {
    const { affixStyle } = this
    if (!affixStyle) {
      return
    }
    this.placeholderNode.style.cssText = ''

    this.setAffixStyle(e, {
      ...affixStyle,
      width: this.placeholderNode.offsetWidth + 'px',
    })
    this.setPlaceholderStyle({ width: this.placeholderNode.offsetWidth + 'px' })
  }

  private updatePosition(e: any) {
    const { offsetBottom, offset, target = getDefaultTarget } = this
    let { offsetTop } = this
    console.log('target', target)
    const targetNode = target()
    console.log('targetNode', targetNode)
    // Backwards support
    // Fix: if offsetTop === 0, it will get undefined,
    //   if offsetBottom is type of number, offsetMode will be { top: false, ... }
    offsetTop = typeof offsetTop === 'undefined' ? offset : offsetTop
    const scrollTop = getScroll(targetNode, true)
    const affixNode = this.$el
    const elemOffset = getOffset(affixNode, targetNode)
    const elemSize = {
      width: this.fixedNode.offsetWidth,
      height: this.fixedNode.offsetHeight,
    }

    const offsetMode = {
      top: false,
      bottom: false,
    }
    // Default to `offsetTop=0`.
    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      offsetMode.top = true
      offsetTop = 0
    } else {
      offsetMode.top = typeof offsetTop === 'number'
      offsetMode.bottom = typeof offsetBottom === 'number'
    }

    const targetRect = getTargetRect(targetNode)
    const targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight
    // ref: https://github.com/ant-design/ant-design/issues/13662
    if (scrollTop >= elemOffset.top - (offsetTop || 0) && offsetMode.top) {
      // Fixed Top
      const width = `${elemOffset.width}px`
      const top = `${targetRect.top + offsetTop}px`
      this.setAffixStyle(e, {
        position: 'fixed',
        top,
        left: `${targetRect.left + elemOffset.left}px`,
        width,
      })
      this.setPlaceholderStyle({
        width,
        height: `${elemSize.height}px`,
      })
    } else if (scrollTop <= elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight && offsetMode.bottom) {
      // Fixed Bottom
      const targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom
      const width = `${elemOffset.width}px`
      this.setAffixStyle(e, {
        position: 'fixed',
        bottom: targetBottomOffet + (offsetBottom || 0) + 'px',
        left: targetRect.left + elemOffset.left + 'px',
        width,
      })
      this.setPlaceholderStyle({
        width,
        height: elemOffset.height + 'px',
      })
    } else {
      const { affixStyle } = this
      if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && (affixNode as any).offsetWidth) {
        this.setAffixStyle(e, { ...affixStyle, width: (affixNode as any).offsetWidth + 'px' })
      } else {
        this.setAffixStyle(e, null)
      }
      this.setPlaceholderStyle(null)
    }
    if (e.type === 'resize') {
      this.syncPlaceholderStyle(e)
    }
  }

  private setTargetEventListeners(getTarget: any) {
    const target = getTarget()
    if (!target) {
      return
    }
    this.clearEventListeners()
    this.events.forEach((eventName: any) => {
      (this.eventHandlers as any)[eventName] = addEventListener(target, eventName, this.updatePosition)
    })
  }

  private clearEventListeners() {
    this.events.forEach((eventName) => {
      const handler = (this.eventHandlers as any)[eventName]
      if (handler && handler.remove) {
        handler.remove()
      }
    })
  }

  private render(h: CreateElement) {
    const { prefixCls, affixStyle, placeholderStyle, $slots, $props } = this
    const { getPrefixCls } = this.configProvider
    console.log('affixStyle', affixStyle)
    const className = classNames({ [getPrefixCls('affix', prefixCls)]: affixStyle })
    const props = { attrs: omit($props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target']) }
    return (
      <div {...props} style={placeholderStyle} ref="placeholderNode">
        <div class={className} ref="fixedNode" style={affixStyle}>
          {$slots.default}
        </div>
      </div>
    )
  }

}

// /* istanbul ignore next */
// Affix.install = function(Vue) {
//   Vue.use(Base)
//   Vue.component(Affix.name, Affix)
// }

export default RgAffix
