import { Component, Prop, Emit, Vue, Model, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import { noop, omit } from 'lodash'
import { hasProp } from '@/app/libs/props-util'

export interface IInputProps {
  readonly disabled?: boolean
  readonly spellCheck?: boolean
  readonly autoFocus?: boolean
  readonly allowClear?: boolean
  readonly value?: string | number
  readonly placeholder?: string | number
  readonly type?: string
  readonly readOnly?: boolean
  readonly lazy?: boolean
}

interface IRuleProps {
  readonly rules?: RuleItem[]
  readonly validateStatus?: string
}

const ruleProps = {
  rules: { type: Array, },
  validateStatus: String,
}

export const inputProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  spellCheck: Boolean,
  autoFocus: Boolean,
  allowClear: Boolean,
  // defaultValue: [String, Number],
  value: [String, Number],
  placeholder: [String, Number],
  type: {
    default: 'text',
    type: String,
  },
  readOnly: Boolean,
  lazy: {
    default: true,
    type: Boolean,
  },
}

@Component({
  props: {
    ...inputProps,
    ...ruleProps,
  },
  model: {
    prop: 'value',
    event: 'change.value'
  }
})
export default class RgInput extends Vue<IInputProps, IRuleProps> {

  // @Model('change.value', { default: '' }) readonly value !: number | string
  private created() {
    if (hasProp(this, 'value')) {// 定义了vModel
      this.stateValue = this.value || ''
    } else {
      this.stateValue = this.$attrs.defaultValue || ''
    }
  }

  @Watch('value')
  private handlerValueChange(value: string) {
    this.stateValue = value
  }
  public focus() { (this.$refs.input as HTMLInputElement).focus() }
  public blur() { (this.$refs.input as HTMLInputElement).blur() }
  public select() { (this.$refs.input as HTMLInputElement).select() }

  // 重置
  public handleReset(e: Event) {
    let event: any = { ...e }
    let target = this.$refs.input
    event.target = target
    event.currentTarget = target
    this.setValue('', event)

    this.$nextTick(() => {
      this.focus()
    })
  }

  // 值变化
  private handleChange(e: Event) {
    const { value } = e.target as HTMLInputElement
    // if (this.lazy) return
    this.setValue(value, e)
  }


  private setValue(value: string, e: Event) {
    if (value === this.stateValue) return

    if (!hasProp(this, 'value')) {  // 没有传入value
      this.stateValue = value
    } else {  // 传入了value, 绑定了vModel
      this.$emit('change.value', value)
      this.$forceUpdate()  // 必须强制刷新(解决用value绑定的情况)
    }
    this.$emit('change', e)
    this.$emit('input', e)
  }

  private getInputClassName() {
    const { disabled, validateStatus } = this.$props
    return {
      [`has-error`]: validateStatus === 'error',
      [style.input]: true,
      [style.disabled]: disabled,
    }
  }

  // 光标的输入位置位于最后
  private handleClick(e: Event) {
    let target = e.target as HTMLInputElement
    // selectionStart , selectionEnd 说明当前选中了输入框中的文字
    if (target.selectionStart && target.selectionEnd) return
    let len = target.value.length
    if (len === 0) return
    target.selectionStart = target.selectionEnd = len
  }

  // 双击就全选 
  private handleDblclick(e: Event) {
    let target = e.target as HTMLInputElement
    let len = target.value.length
    if (len === 0) return
    target.selectionStart = 0
    target.selectionEnd = len
  }

  private render(h: CreateElement) {
    // console.log('input render ')

    const otherProps = omit(this.$props, [
      'prefix', 'suffix', 'allowClear',
      'value', 'defaultValue', 'lazy',
      'rules'
    ])
    const { stateValue, getInputClassName, handleClick, handleDblclick, handleChange, $listeners } = this
    const inputProps: VNodeData = {
      domProps: { value: stateValue || '' },
      attrs: { ...otherProps, ...this.$attrs, },
      class: getInputClassName(),
      on: {
        ...$listeners,
        click: handleClick,
        dblclick: handleDblclick,
        input: handleChange,
        change: noop,
      },
      ref: 'input',
      key: 'rg-input',
    }
    // console.log(inputProps)

    return (
      <input {...inputProps} class={style.input} />
    )
  }
}
