import { Component, Watch, Prop, Model, Provide, Vue } from 'vue-property-decorator'
import RgCheckbox from './checkbox'
import { hasProp } from '@/app/libs/props-util'
import style from './index.module.less'

const noop = () => { }


@Component
export default class RgCheckboxGroup extends Vue {

  @Prop({ type: Array, default: () => [] }) public defaultValue!: []
  @Prop({ type: Array, default: () => [] }) public options!: []
  @Prop() public disabled!: boolean
  @Model('', { type: Array, default: () => [] }) public value!: []

  public sValue: Array<any> = []
  @Provide() private getCheckboxGroup?: Function = () => {
    // eslint-disable-next-line no-invalid-this
    return this.$vnode.componentInstance
  }

  @Watch('value', { immediate: true, deep: true })
  private onValueChanged(val: any) {
    this.sValue = val || []
  }

  private created() {
    const { value, defaultValue } = this
    this.sValue = value || defaultValue || []
    this.checkboxGroup = this

  }
  private getOptions() {
    const { options, $scopedSlots } = this
    return (options || []).map((option: any) => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option
        }
      }
      let { label } = option

      if (label === undefined && $scopedSlots.label) {
        label = $scopedSlots.label(option)
      }
      return { ...option, label }
    })
  }

  public toggleOption(option: any) {
    const optionIndex = this.sValue.indexOf(option.value)
    const value = [...this.sValue]
    if (optionIndex === -1) {
      value.push(option.value)
    } else {
      value.splice(optionIndex, 1)
    }
    if (!hasProp(this, 'value')) {
      this.sValue = value
    }

    this.$emit('input', value)
    this.$emit('change', value)
  }
  private render(h: CreateElement) {
    const { $props: props, $data: state, $slots } = this
    const { options } = props
    const prefixCls = 'rg-checkbox'

    let children = $slots.default
    const groupPrefixCls = `${prefixCls}-group`
    if (options && options.length > 0) {
      children = this.getOptions().map((option: any) => (
        <RgCheckbox
          key={option.value.toString()}
          disabled={'disabled' in option ? option.disabled : props.disabled}
          value={option.value}
          checked={state.sValue.indexOf(option.value) !== -1}
          onChange={option.onChange || noop}
          class={style[`${groupPrefixCls}-item`]}
        >
          {option.label}
        </RgCheckbox>
      ))
    }
    return <div class={style[groupPrefixCls]}>{children}</div>
  }
}
