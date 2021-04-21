import { Component, Watch, Prop } from 'vue-property-decorator'
import Trigger from '../../vc-trigger'
import placements from './placements'
import { hasProp, getEvents, getOptionProps } from '@/app/libs/props-util'
import BaseMixin from '@/app/libs/base-mixin'
import { cloneElement } from '@/app/libs/vnode'

@Component
export default class DropdownInner extends BaseMixin {

  @Prop({ default: true }) public minOverlayWidthMatchTrigger!: boolean

  @Prop({ default: 'rc-dropdown' }) public prefixCls!: string
  @Prop() public transitionName!: string
  @Prop({ default: '' }) public overlayClassName!: string
  @Prop() public openClassName!: string
  @Prop() public animation!: any
  @Prop() public align!: object
  @Prop({ default: () => { } }) public overlayStyle!: object
  @Prop({ default: 'bottomLeft' }) public placement!: string
  @Prop() public overlay!: any
  @Prop({ default: () => ['hover'] }) public trigger!: []
  @Prop() public alignPoint!: boolean
  @Prop({ default: () => [] }) public showAction!: []
  @Prop({ default: () => [] }) public hideAction!: []
  @Prop() public getPopupContainer!: Function
  @Prop() public visible!: boolean
  @Prop({ default: false }) public defaultVisible!: boolean
  @Prop({ default: 0.15 }) public mouseEnterDelay!: number
  @Prop({ default: 0.1 }) public mouseLeaveDelay!: number

  private sVisible!: any
  private created() {
    let sVisible = this.defaultVisible
    if (hasProp(this, 'visible')) {
      sVisible = this.visible
    }
    this.sVisible = sVisible
  }
  @Watch('visible')
  private onVisibleChanged(val: any) {
    if (val !== undefined) {
      this.setState({ sVisible: val })
    }
  }
  private onClick(e: any) {
    // do no call onVisibleChange, if you need click to hide, use onClick and control visible
    if (!hasProp(this, 'visible')) {
      this.setState({ sVisible: false })
    }
    this.$emit('overlayClick', e)
    if (this.childOriginEvents.click) {
      this.childOriginEvents.click(e)
    }
  }

  private onVisibleChange(visible: any) {
    if (!hasProp(this, 'visible')) {
      this.setState({ sVisible: visible })
    }
    this.__emit('visibleChange', visible)
  }

  private getMinOverlayWidthMatchTrigger() {
    const props = getOptionProps(this)
    const { minOverlayWidthMatchTrigger, alignPoint } = props
    if ('minOverlayWidthMatchTrigger' in props) {
      return minOverlayWidthMatchTrigger
    }

    return !alignPoint
  }

  private getOverlayElement() {
    const overlay = this.overlay || this.$slots.overlay || this.$scopedSlots.overlay
    let overlayElement
    if (typeof overlay === 'function') {
      overlayElement = overlay()
    } else {
      overlayElement = overlay
    }
    return overlayElement
  }

  private getMenuElement() {
    const { onClick, prefixCls, $slots } = this
    this.childOriginEvents = getEvents(($slots.overlay as any)[0])
    const overlayElement = this.getOverlayElement()
    const extraOverlayProps = {
      props: {
        prefixCls: `${prefixCls}-menu`,
        getPopupContainer: () => this.getPopupDomNode(),
      },
      on: { click: onClick },
    }
    if (typeof overlayElement.type === 'string') {
      delete extraOverlayProps.props.prefixCls
    }
    return cloneElement(($slots.overlay as any)[0], extraOverlayProps)
  }

  private getMenuElementOrLambda() {
    const overlay = this.overlay || this.$slots.overlay || this.$scopedSlots.overlay
    if (typeof overlay === 'function') {
      return this.getMenuElement
    }
    return this.getMenuElement()
  }

  private getPopupDomNode() {
    return (this.$refs.trigger as any).getPopupDomNode()
  }

  private getOpenClassName() {
    const { openClassName, prefixCls } = this.$props
    if (openClassName !== undefined) {
      return openClassName
    }
    return `${prefixCls}-open`
  }

  private afterVisibleChange(visible: any) {
    if (visible && this.getMinOverlayWidthMatchTrigger()) {
      const overlayNode = this.getPopupDomNode()
      const rootNode = this.$el
      if (rootNode && overlayNode && (rootNode as any).offsetWidth > overlayNode.offsetWidth) {
        overlayNode.style.minWidth = `${(rootNode as any).offsetWidth}px`
        if (this.$refs.trigger && (this.$refs.trigger as any)._component && (this.$refs.trigger as any)._component.alignInstance) {
          (this.$refs.trigger as any)._component.alignInstance.forceAlign()
        }
      }
    }
  }

  private renderChildren() {
    const children = this.$slots.default && this.$slots.default[0]
    const { sVisible } = this
    return sVisible && children ? cloneElement(children, { class: this.getOpenClassName() }) : children
  }


  private render() {
    const {
      prefixCls,
      transitionName,
      animation,
      align,
      placement,
      getPopupContainer,
      showAction,
      hideAction,
      overlayClassName,
      overlayStyle,
      trigger,
      ...otherProps
    } = this.$props
    let triggerHideAction = hideAction
    if (!triggerHideAction && trigger.indexOf('contextmenu') !== -1) {
      triggerHideAction = ['click']
    }

    const triggerProps = {
      props: {
        ...otherProps,
        prefixCls,
        popupClassName: overlayClassName,
        popupStyle: overlayStyle,
        builtinPlacements: (placements as any)[placement],
        action: trigger,
        showAction,
        hideAction: triggerHideAction || [],
        popupPlacement: (placements as any)[placement],
        popupAlign: align,
        popupTransitionName: transitionName,
        popupAnimation: animation,
        popupVisible: this.sVisible,
        afterPopupVisibleChange: this.afterVisibleChange,
        getPopupContainer: (triggerNode: any) => triggerNode.parentNode,
      },
      on: { popupVisibleChange: this.onVisibleChange },
      ref: 'trigger',
    }
    //const child = this.$slots.default && this.$slots.default[0]
    return (
      <Trigger {...triggerProps}>
        {this.renderChildren()}
        <template slot="popup">ssss{this.$slots.overlay && this.getMenuElement()}</template>
      </Trigger>
    )
  }
}
