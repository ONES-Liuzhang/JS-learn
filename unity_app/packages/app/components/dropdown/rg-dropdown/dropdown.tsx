
import { Component, Prop, Model, Provide } from 'vue-property-decorator'
import DropdownInner from './dropdown-inner'
import RgDropdownButton from './dropdown-button'
import { cloneElement } from '@/app/libs/vnode'
import { getOptionProps, getPropsData, getComponentFromProp } from '@/app/libs/props-util'
import { DropdownProps } from './dropdown-props'
import Icon from '@/app/components/icon/rg-icon'
//import { ConfigConsumerProps } from '@app/antdv/components/config-provider/index'


@Component
export default class RgDropdown extends DropdownProps {

  @Prop() public prefixCls!: string
  @Prop({ default: 0.15 }) public mouseEnterDelay!: number
  @Prop({ default: 0.1 }) public mouseLeaveDelay!: number
  @Prop({ default: 'bottomLeft' }) public placement!: string

  @Model('visibleChange') readonly visible!: any

  @Provide() private savePopupRef?: Function = (ref: any) => {
    // eslint-disable-next-line no-invalid-this
    this.popupRef = ref
  }

  //@Inject({ default: () => ConfigConsumerProps }) readonly configProvider!: any

  private getTransitionName() {
    const { placement = '', transitionName } = this.$props
    // eslint-disable-next-line no-undefined
    if (transitionName !== undefined) {
      return transitionName
    }
    if (placement.indexOf('top') >= 0) {
      return 'slide-down'
    }
    return 'slide-up'
  }
  private renderOverlay(prefixCls: string) {
    const overlay = getComponentFromProp(this, 'overlay')
    const overlayNode = Array.isArray(overlay) ? overlay[0] : overlay
    // menu cannot be selectable in dropdown by default
    // menu should be focusable in dropdown by default
    const overlayProps = overlayNode && getPropsData(overlayNode)
    const { selectable = false, focusable = true } = overlayProps || {}
    const expandIcon = (
      <span class={`${prefixCls}-menu-submenu-arrow`}>
        <Icon type="right" class={`${prefixCls}-menu-submenu-arrow-icon`} />
      </span>
    )

    const fixedModeOverlay =
      overlayNode && overlayNode.componentOptions ?
        cloneElement(overlayNode, {
          props: {
            mode: 'vertical',
            selectable,
            focusable,
            expandIcon,
          },
        }) :
        overlay
    return fixedModeOverlay
  }

  private render() {
    const { $slots, $listeners } = this
    const props = getOptionProps(this)
    const { trigger, disabled, getPopupContainer } = props
    // const { getPopupContainer: getContextPopupContainer } = this.configProvider
    // const { getPrefixCls } = this.configProvider
    const prefixCls = 'rg-dropdown' //getPrefixCls('dropdown', customizePrefixCls)

    console.log('getPopupContainer', getPopupContainer)
    const dropdownTrigger = cloneElement($slots.default, {
      class: `${prefixCls}-trigger`,
      props: { disabled },
    })
    const triggerActions = disabled ? [] : trigger
    let alignPoint
    if (triggerActions && triggerActions.indexOf('contextmenu') !== -1) {
      alignPoint = true
    }
    const dropdownProps = {
      props: {
        alignPoint,
        ...props,
        prefixCls,
        getPopupContainer: getPopupContainer, //|| getContextPopupContainer,
        transitionName: this.getTransitionName(),
        trigger: triggerActions,
      },
      on: $listeners,
    }
    return (
      <DropdownInner {...dropdownProps}>
        {dropdownTrigger}
        <template slot="overlay">{this.renderOverlay(prefixCls)}</template>
      </DropdownInner>
    )
  }
}

export { RgDropdown, RgDropdownButton, DropdownProps }

