import { Component, Watch, Prop, Model } from 'vue-property-decorator'
import classNames from 'classnames'
import { getOptionProps, hasProp, getAttrs } from '@/app/libs/props-util'
import BaseMixin from '@/app/libs/base-mixin'
import style from './index.module.less'


@Component
export default class CheckboxInner extends BaseMixin {

  @Prop() public name?: string
  @Prop() public id?: string
  @Prop({ type: String, default: 'checkbox' }) public type?: string
  @Prop({ type: Boolean || Number, default: false }) public defaultChecked?: boolean | number
  @Prop() public disabled?: boolean
  @Prop([String, Number]) public tabIndex?: string | number
  @Prop() public readOnly?: string
  @Prop({ default: undefined }) public autoFocus?: boolean
  @Prop({ default: undefined }) public value?: any
  @Model('change', { type: Boolean || Number, default: undefined }) public checked?: boolean | number

  private get input() {
    return this.$refs.input as any
  }

  private sChecked: any = false

  @Watch('checked', { immediate: true })
  private onCheckedChanged(val: any) {
    this.sChecked = val
  }

  private created() {
    this.sChecked = hasProp(this, 'checked') ? this.checked : this.defaultChecked
  }
  private mounted() {
    this.$nextTick(() => {
      if (this.autoFocus) {
        this.input && this.input.focus()
      }
    })
  }
  public focus() {
    this.refsinput && this.input.focus()
  }

  public blur() {
    this.input && this.input.blur()
  }

  private handleChange(e: any) {
    const props = getOptionProps(this)
    if (props.disabled) {
      return
    }
    if (!('checked' in props)) {
      this.sChecked = e.target.checked
    }

    this.$forceUpdate() // change前，维持现有状态

    this.__emit('change', {
      target: {
        ...props,
        checked: e.target.checked
      },
      stopPropagation() {
        e.stopPropagation()
      },
      preventDefault() {
        e.preventDefault()
      },
      nativeEvent: { ...e, shiftKey: this.eventShiftKey }
    })
    this.eventShiftKey = false
  }
  private onClick(e: any) {
    this.__emit('click', e)
    // onChange没能获取到shiftKey，使用onClick hack
    this.eventShiftKey = e.shiftKey
  }

  private render(h: CreateElement) {
    const { name, id, type, disabled, readOnly, tabIndex, autoFocus, value, ...others } = getOptionProps(this)
    const attrs = getAttrs(this)
    const globalProps = Object.keys({ ...others, ...attrs }).reduce((prev: any, key) => {
      if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
        prev[key] = others[key]
      }
      return prev
    }, {})

    const { sChecked } = this
    const prefixCls = 'rg-checkbox'
    const classString = classNames(style[prefixCls], {
      [style[`${prefixCls}-checked`]]: sChecked,
      [style[`${prefixCls}-disabled`]]: disabled
    })

    return (
      <span class={classString}>
        <input
          name={name}
          id={id}
          type={type}
          readOnly={readOnly}
          disabled={disabled}
          tabIndex={tabIndex}
          class={style[`${prefixCls}-input`]}
          checked={!!sChecked}
          autoFocus={autoFocus}
          ref="input"
          value={value}
          {...{
            attrs: globalProps,
            on: {
              ...this.$listeners,
              change: this.handleChange,
              click: this.onClick
            }
          }}
        />
        <span class={style[`${prefixCls}-inner`]} />
      </span>
    )
  }
}

