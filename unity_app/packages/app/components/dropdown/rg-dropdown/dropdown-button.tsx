import { Component, Prop, Provide } from 'vue-property-decorator'
import { RgButton, RgButtonGroup } from '../../button/rg-button'
import RgDropdown from './dropdown'
import { hasProp, getComponentFromProp } from '@/app/libs/props-util'
import { DropdownProps } from './dropdown-props'

class DropdownButtonProps extends DropdownProps {
  @Prop({ type: String, default: 'default' }) public type!: string//['primary', 'ghost', 'dashed', 'danger', 'default']
  @Prop({ type: String, default: 'default' }) public size!: string//['small', 'large', 'default']
  @Prop() public htmlType!: string
  @Prop() public href!: string
  @Prop({ type: String, default: 'bottomRight' }) public placement!: string

}
export { DropdownButtonProps }


@Component
export default class ADropdownButton extends DropdownButtonProps {

  @Provide() private savePopupRef?: Function = (ref: any) => {
    // eslint-disable-next-line no-invalid-this
    this.popupRef = ref
  }
  private onClick(e: any) {
    this.$emit('click', e)
  }
  private onVisibleChange(val: any) {
    this.$emit('visibleChange', val)
  }

  private render() {
    const { type, disabled, htmlType, trigger, align, visible, placement, getPopupContainer, href, ...restProps } = this.$props
    //const { getPopupContainer: getContextPopupContainer } = this.configProvider
    //const { getPrefixCls } = this.configProvider
    const prefixCls = 'rg-dropdown-button'//getPrefixCls('dropdown-button', customizePrefixCls)
    const dropdownProps = {
      props: {
        align,
        disabled,
        trigger: disabled ? [] : trigger,
        placement,
        getPopupContainer: getPopupContainer //|| getContextPopupContainer,
      },
      on: { visibleChange: this.onVisibleChange },
    }
    if (hasProp(this, 'visible')) {
      (dropdownProps.props as any).visible = visible
    }

    const buttonGroupProps = {
      props: { ...restProps },
      class: prefixCls,
    }

    return (
      <RgButtonGroup {...buttonGroupProps}>
        <RgButton type={type} disabled={disabled} onClick={this.onClick} htmlType={htmlType} href={href}>
          {this.$slots.default}
        </RgButton>
        <RgDropdown {...dropdownProps}>
          <template slot="overlay">{getComponentFromProp(this, 'overlay')}</template>
          <RgButton type={type} disabled={disabled} icon="ellipsis" />
        </RgDropdown>
      </RgButtonGroup>
    )
  }
}
