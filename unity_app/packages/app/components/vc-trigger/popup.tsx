import { Component, Prop, Vue } from 'vue-property-decorator'


import Align from '../vc-align'
import PopupInner from './popup-inner'
import LazyRenderBox from './lazy-render-box'
import animate from '@/app/libs/css-animation'
import BaseMixin from '@/app/libs/base-mixin'

@Component
export default class Popup extends BaseMixin {
  @Prop() public visible!: boolean
  @Prop() public getClassNameFromAlign!: Function
  @Prop() public getRootDomNode!: Function
  @Prop() public align!: any
  @Prop() public destroyPopupOnHide!: boolean
  @Prop() public getContainer!: Function
  @Prop() public transitionName!: string
  @Prop() public animation!: any
  @Prop() public maskAnimation!: string
  @Prop() public maskTransitionName!: string
  @Prop() public mask!: boolean
  @Prop() public zIndex!: number
  @Prop() public popupClassName!: any
  @Prop({ default: {} }) public popupStyle!: object
  @Prop() public stretch!: string

  @Prop() public point: any = {
    pageX: 0,
    pageY: 0
  }

  private stretchChecked: boolean = false
  private targetWidth: any = undefined
  private targetHeight: any = undefined

  private created() {
    this.domEl = null
  }
  private mounted() {
    this.$nextTick(() => {
      this.rootNode = this.getPopupDomNode()
      this.setStretchSize()
    })
  }
  private beforeUpdate() {
    if (this.domEl && this.domEl.rcEndListener) {
      this.domEl.rcEndListener()
      this.domEl = null
    }
  }
  private updated() {
    this.$nextTick(() => {
      this.setStretchSize()
    })
  }

  private beforeDestroy() {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    } else if (this.$el.remove) {
      this.$el.remove()
    }
  }
  private onAlign(popupDomNode: any, align: any) {
    const props = this.$props
    const currentAlignClassName = props.getClassNameFromAlign(align)
    // FIX: https://github.com/react-component/trigger/issues/56
    // FIX: https://github.com/react-component/tooltip/issues/79
    if (this.currentAlignClassName !== currentAlignClassName) {
      this.currentAlignClassName = currentAlignClassName
      popupDomNode.className = this.getClassName(currentAlignClassName)
    }
    // eslint-disable-next-line no-unused-expressions
    this.$listeners.align && (this.$listeners as any).align(popupDomNode, align)
  }

  // Record size if stretch needed
  private setStretchSize() {
    const { stretch, getRootDomNode, visible } = this.$props
    const { stretchChecked, targetHeight, targetWidth } = this.$data

    if (!stretch || !visible) {
      if (stretchChecked) {
        this.setState({ stretchChecked: false })
      }
      return
    }

    const $ele = getRootDomNode()
    if (!$ele) return

    const height = $ele.offsetHeight
    const width = $ele.offsetWidth

    if (targetHeight !== height || targetWidth !== width || !stretchChecked) {
      this.setState({
        stretchChecked: true,
        targetHeight: height,
        targetWidth: width,
      })
    }
  }

  private getPopupDomNode() {
    return this.$refs.popupInstance ? (this.$refs.popupInstance as any).$el : null
  }

  private getTargetElement() {
    return this.$props.getRootDomNode()
  }

  // `target` on `rc-align` can accept as a function to get the bind element or a point.
  // ref: https://www.npmjs.com/package/rc-align
  private getAlignTarget() {
    const { point } = this.$props
    if (point) {
      return point
    }
    return this.getTargetElement
  }

  private getMaskTransitionName() {
    const props = this.$props
    let transitionName = props.maskTransitionName
    const animation = props.maskAnimation
    if (!transitionName && animation) {
      transitionName = `${props.prefixCls}-${animation}`
    }
    return transitionName
  }

  private getTransitionName() {
    const props = this.$props
    let { transitionName } = props
    const { animation } = props
    if (!transitionName) {
      if (typeof animation === 'string') {
        transitionName = `${animation}`
      } else if (animation && animation.props && animation.props.name) {
        transitionName = animation.props.name
      }
    }
    return transitionName
  }

  private getClassName(currentAlignClassName: any) {
    return `${this.$props.prefixCls} ${this.$props.popupClassName} ${currentAlignClassName}`
  }
  private getPopupElement() {
    const { $props: props, $slots, $listeners, getTransitionName } = this
    const { stretchChecked, targetHeight, targetWidth } = this.$data

    const { align, visible, prefixCls, animation, popupStyle, getClassNameFromAlign, destroyPopupOnHide, stretch } = props
    // const { mouseenter, mouseleave } = $listeners
    const className = this.getClassName(this.currentAlignClassName || getClassNameFromAlign(align))
    // const hiddenClassName = `${prefixCls}-hidden`
    if (!visible) {
      this.currentAlignClassName = null
    }
    const sizeStyle = {}
    if (stretch) {
      // Stretch with target
      if (stretch.indexOf('height') !== -1) {
        (sizeStyle as any).height = typeof targetHeight === 'number' ? `${targetHeight}px` : targetHeight
      } else if (stretch.indexOf('minHeight') !== -1) {
        (sizeStyle as any).minHeight = typeof targetHeight === 'number' ? `${targetHeight}px` : targetHeight
      }
      if (stretch.indexOf('width') !== -1) {
        (sizeStyle as any).width = typeof targetWidth === 'number' ? `${targetWidth}px` : targetWidth
      } else if (stretch.indexOf('minWidth') !== -1) {
        (sizeStyle as any).minWidth = typeof targetWidth === 'number' ? `${targetWidth}px` : targetWidth
      }

      // Delay force align to makes ui smooth
      if (!stretchChecked) {
        // sizeStyle.visibility = 'hidden'
        setTimeout(() => {
          if (this.$refs.alignInstance) {
            (this.$refs.alignInstance as any).forceAlign()
          }
        }, 0)
      }
    }
    const popupInnerProps = {
      props: {
        prefixCls,
        visible,
        // hiddenClassName,
      },
      class: className,
      on: $listeners,
      ref: 'popupInstance',
      style: { ...sizeStyle, ...popupStyle, ...this.getZIndexStyle() },
    }

    let transitionProps: any = {
      props: Object.assign({
        appear: true,
        css: false,
      })
    }
    const transitionName = getTransitionName()
    let useTransition = !!transitionName
    const transitionEvent = {
      beforeEnter: () => {
        // el.style.display = el.__vOriginalDisplay
        // this.$refs.alignInstance.forceAlign();
      },
      enter: (el: any, done: any) => {
        // render 后 vue 会移除通过animate动态添加的 class导致动画闪动，延迟两帧添加动画class，可以进一步定位或者重写 transition 组件
        this.$nextTick(() => {
          if (this.$refs.alignInstance) {
            (this.$refs.alignInstance as any).$nextTick(() => {
              this.domEl = el
              animate(el, `${transitionName}-enter`, done)
            })
          }
        })
      },
      beforeLeave: () => {
        this.domEl = null
      },
      leave: (el: any, done: any) => {
        animate(el, `${transitionName}-leave`, done)
      },
    }

    if (typeof animation === 'object') {
      useTransition = true
      // eslint-disable-next-line no-shadow
      const { on = {}, props = {} } = animation
      transitionProps.props = { ...transitionProps.props, ...props }
      transitionProps.on = { ...transitionEvent, ...on }
    } else {
      (transitionProps as any).on = transitionEvent
    }
    if (!useTransition) {
      transitionProps = {}
    }
    if (destroyPopupOnHide) {
      return (
        <transition {...transitionProps}>
          {visible ? (
            <Align target={this.getAlignTarget()} key="popup" ref="alignInstance" monitorWindowResize align={align} onAlign={this.onAlign}>
              <PopupInner {...popupInnerProps}>{$slots.default}</PopupInner>
            </Align>
          ) : null}
        </transition>
      )
    }
    return (
      <transition {...transitionProps}>
        <Align
          v-show={visible}
          target={this.getAlignTarget()}
          key="popup"
          ref="alignInstance"
          monitorWindowResize
          disabled={!visible}
          align={align}
          onAlign={this.onAlign}
        >
          <PopupInner {...popupInnerProps}>{$slots.default}</PopupInner>
        </Align>
      </transition>
    )
  }

  private getZIndexStyle() {
    const style = {}
    const props = this.$props
    if (props.zIndex !== undefined) {
      (style as any).zIndex = props.zIndex
    }
    return style
  }

  private getMaskElement() {
    const props = this.$props
    let maskElement = null
    if (props.mask) {
      const maskTransition = this.getMaskTransitionName()
      maskElement = (
        <LazyRenderBox v-show={props.visible} style={this.getZIndexStyle()} key="mask" class={`${props.prefixCls}-mask`} visible={props.visible} />
      )
      if (maskTransition) {
        maskElement = (
          <transition appear name={maskTransition}>
            {maskElement}
          </transition>
        )
      }
    }
    return maskElement
  }


  private render() {
    const { getMaskElement, getPopupElement } = this
    return (
      <div>
        {getMaskElement()}
        {getPopupElement()}
      </div>
    )
  }
}
