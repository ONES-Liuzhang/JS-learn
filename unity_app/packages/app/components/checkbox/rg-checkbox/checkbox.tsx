import { Component, Prop, Model, Vue, Inject } from 'vue-property-decorator'
import classNames from 'classnames'
import CheckboxInner from './checkbox-inner'
import { getOptionProps, getAttrs } from '@/app/libs/props-util'
import style from './index.module.less'

const noop = () => { }

@Component
export default class RgCheckbox extends Vue {

  @Prop() public name!: string
  @Prop() public id!: string
  @Prop({ type: String, default: 'checkbox' }) public type!: string
  @Prop({ type: Boolean || Number, default: false }) public readonly defaultChecked!: boolean | number
  @Prop() public disabled!: boolean
  @Prop([String, Number]) public value!: any
  @Prop() public indeterminate!: boolean
  @Prop() public autoFocus!: boolean
  @Model('', { type: Boolean || Number, default: undefined }) public checked!: boolean | number
  @Inject({ default: () => noop }) private getCheckboxGroup!: Function

  private get checkboxInner() {
    return this.$refs.checkboxInner as any
  }

  private get checkboxGroup() {
    return this.getCheckboxGroup()
  }

  private handleChange(event: any) {
    const targetChecked = event.target.checked
    this.$emit('input', targetChecked)
    this.$emit('change', event)
  }
  public focus() {
    this.checkboxInner.focus()
  }
  public blur() {
    this.checkboxInner.blur()
  }

  private render(h: CreateElement) {
    const { checkboxGroup, $listeners, $slots } = this

    const props = getOptionProps(this)
    const children = $slots.default
    const { mouseenter = noop, mouseleave = noop, ...restListeners } = $listeners
    const { indeterminate } = props

    const checkboxProps = {
      props: props,
      on: restListeners,
      attrs: getAttrs(this)
    }

    if (checkboxGroup) {
      checkboxProps.on.change = (...args: any) => {
        this.$emit('change', ...args)
        checkboxGroup.toggleOption({ label: children, value: props.value })
      }
      checkboxProps.props.checked = checkboxGroup.sValue.indexOf(props.value) !== -1
      checkboxProps.props.disabled = props.disabled || checkboxGroup.disabled
    } else {
      checkboxProps.on.change = this.handleChange
    }

    const prefixCls = 'rg-checkbox'
    const classString = classNames({
      [style[`${prefixCls}-wrapper`]]: true,
      [style[`${prefixCls}-wrapper-checked`]]: checkboxProps.props.checked,
      [style[`${prefixCls}-wrapper-disabled`]]: checkboxProps.props.disabled
    })

    const checkboxClass = classNames({ [style[`${prefixCls}-indeterminate`]]: indeterminate })
    return (
      <label class={classString} onMouseenter={mouseenter} onMouseleave={mouseleave}>
        <CheckboxInner {...checkboxProps} class={checkboxClass} ref="checkboxInner" />
        {children !== undefined && <span>{children}</span>}
      </label>
    )
  }
}

