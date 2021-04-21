import { Component, Prop, Watch, Inject, Provide, Vue } from 'vue-property-decorator'

// @ts-ignore
import ref from 'vue-ref'
import contains from '@/app/libs/Dom/contains'
import { hasProp, getComponentFromProp, getEvents, filterEmpty } from '@/app/libs/props-util'
import { requestAnimationTimeout, cancelAnimationTimeout } from '@/app/libs/request-animation-timeout'
import addEventListener from '@/app/libs/Dom/add-event-listener'
import warning from '@/app/libs/warning'
import Popup from './popup'
import { getAlignFromPlacement, getAlignPopupClassName, noop } from './utils'
import BaseMixin from '@/app/libs/base-mixin'
import { cloneElement } from '@/app/libs/vnode'
import ContainerRender from '@/app/components/container-render/container-render'

Vue.use(ref, { name: 'ant-ref' })

const returnEmptyString = () => ''
const returnDocument = () => window.document

const ALL_HANDLERS = ['click', 'mousedown', 'touchstart', 'mouseenter', 'mouseleave', 'focus', 'blur', 'contextmenu']

@Component
export default class Trigger extends BaseMixin {


  @Prop({ default: () => [] }) public action!: any
  @Prop({ default: () => [] }) public showAction!: any
  @Prop({ default: () => [] }) public hideAction!: any
  @Prop({ default: returnEmptyString }) public getPopupClassNameFromAlign!: any
  @Prop({ default: noop }) public afterPopupVisibleChange!: Function
  @Prop() public popup!: any
  @Prop({ default: () => { } }) @Prop({ default: {} }) popupStyle!: object
  @Prop({ default: 'rc-trigger-popup' }) public prefixCls!: string
  @Prop({ default: '' }) public popupClassName!: string
  @Prop() public popupPlacement!: string
  @Prop() public builtinPlacements!: object
  @Prop() public popupTransitionName!: string | object
  @Prop() public popupAnimation!: any
  @Prop({ default: 0 }) public mouseEnterDelay!: number
  @Prop({ default: 0.1 }) public mouseLeaveDelay!: number
  @Prop() public zIndex!: number
  @Prop({ default: 0 }) public focusDelay!: number
  @Prop({ default: 0.15 }) public blurDelay!: number
  @Prop() public getPopupContainer!: Function
  @Prop({ default: returnDocument }) public getDocument!: Function
  @Prop() public forceRender!: boolean
  @Prop({ default: false }) public destroyPopupOnHide!: boolean
  @Prop({ default: false }) public mask!: boolean
  @Prop({ default: true }) public maskClosable!: boolean
  @Prop({ default: () => { } }) public popupAlign!: object
  @Prop() public popupVisible!: boolean
  @Prop({ default: false }) public defaultPopupVisible!: boolean
  @Prop() public maskTransitionName!: string | object
  @Prop() public maskAnimation!: string
  @Prop() public stretch!: string
  @Prop() public alignPoint!: boolean

  private get vcTriggerContext() {
    return this.getVcTriggerContext() //this.$vnode.componentInstance //
  }
  @Inject({ default: () => noop }) private getVcTriggerContext!: Function

  @Inject({ default: () => noop }) readonly savePopupRef!: any
  @Inject({ default: () => null }) readonly dialogContext!: any

  private sPopupVisible!: any
  private point: any = null
  private created() {
    const props = this.$props
    let popupVisible
    if (hasProp(this, 'popupVisible')) {
      popupVisible = !!props.popupVisible
    } else {
      popupVisible = !!props.defaultPopupVisible
    }
    this.sPopupVisible = popupVisible

  }

  @Watch('popupVisible')
  private onPopupVisibleChanged(val: any) {
    // eslint-disable-next-line no-undefined
    if (val !== undefined) {
      this.sPopupVisible = val
    }
  }


  @Watch('sPopupVisible')
  private onSPopupVisibleChanged(val: any) {
    this.$nextTick(() => {
      this.renderComponent(null, () => {
        this.afterPopupVisibleChange(this.sPopupVisible)
      })
    })
  }

  private beforeCreate() {
    ALL_HANDLERS.forEach((h) => {
      this[`fire${h}`] = (e: any) => {
        this.fireEvents(h, e)
      }
    })
  }
  private deactivated() {
    this.setPopupVisible(false)
  }
  private mounted() {
    this.$nextTick(() => {
      this.renderComponent(null)
      this.updatedCal()
    })
  }

  private updated() {
    this.$nextTick(() => {
      this.updatedCal()
    })
  }

  private beforeDestroy() {
    this.clearDelayTimer()
    this.clearOutsideHandler()
    clearTimeout(this.mouseDownTimeout)
  }
  private updatedCal() {
    const props = this.$props
    const state = this.$data

    // We must listen to `mousedown` or `touchstart`, edge case:
    // https://github.com/ant-design/ant-design/issues/5804
    // https://github.com/react-component/calendar/issues/250
    // https://github.com/react-component/trigger/issues/50
    if (state.sPopupVisible) {
      let currentDocument
      if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextmenuToShow())) {
        currentDocument = props.getDocument()
        this.clickOutsideHandler = addEventListener(currentDocument, 'mousedown', this.onDocumentClick)
      }
      // always hide on mobile
      if (!this.touchOutsideHandler) {
        currentDocument = currentDocument || props.getDocument()
        this.touchOutsideHandler = addEventListener(currentDocument, 'touchstart', this.onDocumentClick)
      }
      // close popup when trigger type contains 'onContextmenu' and document is scrolling.
      if (!this.contextmenuOutsideHandler1 && this.isContextmenuToShow()) {
        currentDocument = currentDocument || props.getDocument()
        this.contextmenuOutsideHandler1 = addEventListener(currentDocument, 'scroll', this.onContextmenuClose)
      }
      // close popup when trigger type contains 'onContextmenu' and window is blur.
      if (!this.contextmenuOutsideHandler2 && this.isContextmenuToShow()) {
        this.contextmenuOutsideHandler2 = addEventListener(window, 'blur', this.onContextmenuClose)
      }
    } else {
      this.clearOutsideHandler()
    }
  }
  private onMouseenter(e: any) {
    const { mouseEnterDelay } = this.$props
    this.fireEvents('mouseenter', e)
    this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e)
  }

  private onMouseMove(e: any) {
    this.fireEvents('mousemove', e)
    this.setPoint(e)
  }

  private onMouseleave(e: any) {
    this.fireEvents('mouseleave', e)
    this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay)
  }

  private onPopupMouseenter() {
    this.clearDelayTimer()
  }

  private onPopupMouseleave(e: any) {
    if (
      e &&
      e.relatedTarget &&
      !e.relatedTarget.setTimeout &&
      this._component &&
      this._component.getPopupDomNode &&
      contains(this._component.getPopupDomNode(), e.relatedTarget)
    ) {
      return
    }
    this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay)
  }

  private onFocus(e: any) {
    this.fireEvents('focus', e)
    // incase focusin and focusout
    this.clearDelayTimer()
    if (this.isFocusToShow()) {
      this.focusTime = Date.now()
      this.delaySetPopupVisible(true, this.$props.focusDelay)
    }
  }

  private onMousedown(e: any) {
    this.fireEvents('mousedown', e)
    this.preClickTime = Date.now()
  }

  private onTouchstart(e: any) {
    this.fireEvents('touchstart', e)
    this.preTouchTime = Date.now()
  }

  private onBlur(e: any) {
    if (!contains(e.target, e.relatedTarget || document.activeElement)) {
      this.fireEvents('blur', e)
      this.clearDelayTimer()
      if (this.isBlurToHide()) {
        this.delaySetPopupVisible(false, this.$props.blurDelay)
      }
    }
  }

  private onContextmenu(e: any) {
    e.preventDefault()
    this.fireEvents('contextmenu', e)
    this.setPopupVisible(true, e)
  }

  private onContextmenuClose() {
    if (this.isContextmenuToShow()) {
      this.close()
    }
  }

  private onClick(event: any) {
    this.fireEvents('click', event)
    // focus will trigger click
    if (this.focusTime) {
      let preTime
      if (this.preClickTime && this.preTouchTime) {
        preTime = Math.min(this.preClickTime, this.preTouchTime)
      } else if (this.preClickTime) {
        preTime = this.preClickTime
      } else if (this.preTouchTime) {
        preTime = this.preTouchTime
      }
      if (Math.abs(preTime - this.focusTime) < 20) {
        return
      }
      this.focusTime = 0
    }
    this.preClickTime = 0
    this.preTouchTime = 0
    if (event && event.preventDefault) {
      event.preventDefault()
    }
    if (event && event.domEvent) {
      event.domEvent.preventDefault()
    }
    const nextVisible = !this.$data.sPopupVisible
    if ((this.isClickToHide() && !nextVisible) || (nextVisible && this.isClickToShow())) {
      this.setPopupVisible(!this.$data.sPopupVisible, event)
    }
  }
  private onPopupMouseDown(...args: any) {
    const { vcTriggerContext } = this
    this.hasPopupMouseDown = true

    clearTimeout(this.mouseDownTimeout)
    this.mouseDownTimeout = setTimeout(() => {
      this.hasPopupMouseDown = false
    }, 0)

    if (vcTriggerContext.onPopupMouseDown) {
      vcTriggerContext.onPopupMouseDown(...args)
    }
  }

  private onDocumentClick(event: any) {
    if (this.$props.mask && !this.$props.maskClosable) {
      return
    }
    const { target } = event
    const root = this.$el
    if (!contains(root, target) && !this.hasPopupMouseDown) {
      this.close()
    }
  }
  private getPopupDomNode() {
    if (this._component && this._component.getPopupDomNode) {
      return this._component.getPopupDomNode()
    }
    return null
  }

  private getRootDomNode() {
    return this.$el
    // return this.$el.children[0] || this.$el
  }

  private handleGetPopupClassFromAlign(align: any) {
    const className = []
    const props = this.$props
    const { popupPlacement, builtinPlacements, prefixCls, alignPoint, getPopupClassNameFromAlign } = props
    if (popupPlacement && builtinPlacements) {
      className.push(getAlignPopupClassName(builtinPlacements, prefixCls, align, alignPoint))
    }
    if (getPopupClassNameFromAlign) {
      className.push(getPopupClassNameFromAlign(align))
    }
    return className.join(' ')
  }

  private getPopupAlign() {
    const props = this.$props
    const { popupPlacement, popupAlign, builtinPlacements } = props
    if (popupPlacement && builtinPlacements) {
      return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign)
    }
    return popupAlign
  }
  private savePopup(node: any) {
    this._component = node
    this.savePopupRef(node)
  }
  private getComponent() {
    const self = this
    const mouseProps: any = {}
    if (this.isMouseEnterToShow()) {
      mouseProps.mouseenter = self.onPopupMouseenter
    }
    if (this.isMouseLeaveToHide()) {
      mouseProps.mouseleave = self.onPopupMouseleave
    }
    mouseProps.mousedown = this.onPopupMouseDown
    mouseProps.touchstart = this.onPopupMouseDown
    const { handleGetPopupClassFromAlign, getRootDomNode, getContainer, $listeners } = self
    const {
      prefixCls,
      destroyPopupOnHide,
      popupClassName,
      action,
      popupAnimation,
      popupTransitionName,
      popupStyle,
      mask,
      maskAnimation,
      maskTransitionName,
      zIndex,
      stretch,
      alignPoint,
    } = self.$props
    const { sPopupVisible, point } = this.$data
    const align = this.getPopupAlign()
    const popupProps: any = {
      props: {
        prefixCls,
        destroyPopupOnHide,
        visible: sPopupVisible,
        point: alignPoint && point,
        action,
        align,
        animation: popupAnimation,
        getClassNameFromAlign: handleGetPopupClassFromAlign,
        stretch,
        getRootDomNode,
        mask,
        zIndex,
        transitionName: popupTransitionName,
        maskAnimation,
        maskTransitionName,
        getContainer,
        popupClassName,
        popupStyle,
      },
      on: {
        align: $listeners.popupAlign || noop,
        ...mouseProps,
      },
      directives: [
        {
          name: 'ant-ref',
          value: this.savePopup,
        },
      ],
    }
    return <Popup {...popupProps}>{getComponentFromProp(self, 'popup')}</Popup>
  }

  private getContainer() {
    const { $props: props, dialogContext } = this
    const popupContainer = document.createElement('div')
    // Make sure default popup container will never cause scrollbar appearing
    // https://github.com/react-component/trigger/issues/41
    popupContainer.style.position = 'absolute'
    popupContainer.style.top = '0'
    popupContainer.style.left = '0'
    popupContainer.style.width = '100%'

    const mountNode = props.getPopupContainer ? props.getPopupContainer(this.$el, dialogContext) : props.getDocument().body
    mountNode.appendChild(popupContainer)
    this.popupContainer = popupContainer
    return popupContainer
  }

  private setPopupVisible(sPopupVisible: any, event: any = undefined) {
    const { alignPoint } = this.$props
    this.clearDelayTimer()
    if (this.$data.sPopupVisible !== sPopupVisible) {
      if (!hasProp(this, 'popupVisible')) {
        this.setState({ sPopupVisible })
      }
      // eslint-disable-next-line no-unused-expressions
      this.$listeners.popupVisibleChange && (this.$listeners as any).popupVisibleChange(sPopupVisible)
    }
    // Always record the point position since mouseEnterDelay will delay the show
    if (sPopupVisible && alignPoint && event) {
      this.setPoint(event)
    }
  }

  private setPoint(point: any) {
    const { alignPoint } = this.$props
    if (!alignPoint || !point) return

    this.setState({
      point: {
        pageX: point.pageX,
        pageY: point.pageY,
      },
    })
  }

  private delaySetPopupVisible(visible: any, delayS: any, event: any = undefined) {
    const delay = delayS * 1000
    this.clearDelayTimer()
    if (delay) {
      const point = event ? { pageX: event.pageX, pageY: event.pageY } : null
      this.delayTimer = requestAnimationTimeout(() => {
        this.setPopupVisible(visible, point)
        this.clearDelayTimer()
      }, delay)
    } else {
      this.setPopupVisible(visible, event)
    }
  }

  private clearDelayTimer() {
    if (this.delayTimer) {
      cancelAnimationTimeout(this.delayTimer)
      this.delayTimer = null
    }
  }

  private clearOutsideHandler() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove()
      this.clickOutsideHandler = null
    }

    if (this.contextmenuOutsideHandler1) {
      this.contextmenuOutsideHandler1.remove()
      this.contextmenuOutsideHandler1 = null
    }

    if (this.contextmenuOutsideHandler2) {
      this.contextmenuOutsideHandler2.remove()
      this.contextmenuOutsideHandler2 = null
    }

    if (this.touchOutsideHandler) {
      this.touchOutsideHandler.remove()
      this.touchOutsideHandler = null
    }
  }

  private createTwoChains(event: any) {
    // eslint-disable-next-line no-empty-function
    let fn = () => { }
    const events = this.$listeners
    if (this.childOriginEvents[event] && events[event]) {
      return this[`fire${event}`]
    }
    fn = this.childOriginEvents[event] || events[event] || fn
    return fn
  }

  private isClickToShow() {
    const { action, showAction } = this.$props
    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1
  }

  private isContextmenuToShow() {
    const { action, showAction } = this.$props
    return action.indexOf('contextmenu') !== -1 || showAction.indexOf('contextmenu') !== -1
  }

  private isClickToHide() {
    const { action, hideAction } = this.$props
    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1
  }

  private isMouseEnterToShow() {
    const { action, showAction } = this.$props
    return action.indexOf('hover') !== -1 || showAction.indexOf('mouseenter') !== -1
  }

  private isMouseLeaveToHide() {
    const { action, hideAction } = this.$props
    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseleave') !== -1
  }

  private isFocusToShow() {
    const { action, showAction } = this.$props
    return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1
  }

  private isBlurToHide() {
    const { action, hideAction } = this.$props
    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1
  }
  private forcePopupAlign() {
    if (this.$data.sPopupVisible && this._component && this._component.$refs.alignInstance) {
      this._component.$refs.alignInstance.forceAlign()
    }
  }
  private fireEvents(type: any, e: any) {
    if (this.childOriginEvents[type]) {
      this.childOriginEvents[type](e)
    }
    this.__emit(type, e)
  }

  private close() {
    this.setPopupVisible(false)
  }

  private render() {
    const { sPopupVisible } = this
    const children = filterEmpty(this.$slots.default)
    const { forceRender, alignPoint } = this.$props

    if (children.length > 1) {
      warning(false, 'Trigger $slots.default.length > 1, just support only one default')
    }
    // eslint-disable-next-line prefer-destructuring
    const child = children[0]
    this.childOriginEvents = getEvents(child)
    const newChildProps = {
      props: {},
      on: {},
      key: 'trigger',
    }

    let newChildPropsOn = newChildProps.on as any

    if (this.isContextmenuToShow()) {
      newChildPropsOn.contextmenu = this.onContextmenu
    } else {
      newChildPropsOn.contextmenu = this.createTwoChains('contextmenu')
    }

    if (this.isClickToHide() || this.isClickToShow()) {
      newChildPropsOn.click = this.onClick
      newChildPropsOn.mousedown = this.onMousedown
      newChildPropsOn.touchstart = this.onTouchstart
    } else {
      newChildPropsOn.click = this.createTwoChains('click')
      newChildPropsOn.mousedown = this.createTwoChains('mousedown')
      newChildPropsOn.touchstart = this.createTwoChains('onTouchstart')
    }
    if (this.isMouseEnterToShow()) {
      newChildPropsOn.mouseenter = this.onMouseenter
      if (alignPoint) {
        newChildPropsOn.mousemove = this.onMouseMove
      }
    } else {
      newChildPropsOn.mouseenter = this.createTwoChains('mouseenter')
    }
    if (this.isMouseLeaveToHide()) {
      newChildPropsOn.mouseleave = this.onMouseleave
    } else {
      newChildPropsOn.mouseleave = this.createTwoChains('mouseleave')
    }

    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildPropsOn.focus = this.onFocus
      newChildPropsOn.blur = this.onBlur
    } else {
      newChildPropsOn.focus = this.createTwoChains('focus')
      newChildPropsOn.blur = (e: any) => {
        if (e && (!e.relatedTarget || !contains(e.target, e.relatedTarget))) {
          this.createTwoChains('blur')(e)
        }
      }
    }

    this.trigger = cloneElement(child, newChildProps)
    // eslint-disable-next-line consistent-this
    let that: any = this.$vnode.componentInstance

    return (
      <ContainerRender
        parent={this}
        visible={sPopupVisible}
        autoMount={false}
        forceRender={forceRender}
        getComponent={this.getComponent}
        getContainer={this.getContainer}
        children={(obj: any) => {
          that.renderComponent = obj.renderComponent
          return this.trigger
        }}
      />
    )
  }
}
