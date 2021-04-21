import { Component, Watch, Vue } from 'vue-property-decorator'
import Wave from '../../wave'
import Icon from '@/app/components/icon/rg-icon'
import { filterEmpty } from '@/app/libs/props-util'
import style from './index.module.less'

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)

export interface IButtonProps {
  readonly type?: string
  readonly icon?: string
  readonly shape?: string
  readonly size?: string
  readonly loading?: [boolean, object]
  readonly disabled?: boolean
  readonly ghost?: boolean
  readonly block?: boolean
}

export const buttonProps = {
  type: String,
  htmlType: {
    type: String,
    default: 'button'
  },
  icon: String,
  shape: String,
  size: {
    type: String,
    default: 'default'
  },
  loading: [Boolean, Object],
  disabled: Boolean,
  ghost: Boolean,
  block: Boolean
}

interface IRuleProps { }

const ruleProps = {}


@Component({
  props: {
    ...buttonProps,
    ...ruleProps,
  }
})
export default class RgButton extends Vue<IButtonProps, IRuleProps> {

  private sLoading = false
  private hasTwoCNChar = false
  private get classes(): any {
    const { type, shape, size, hasTwoCNChar, sLoading, ghost, block, icon, $slots } = this
    const prefixCls = 'rg-btn'
    const autoInsertSpace = true

    const iconType = sLoading ? 'loading' : icon
    const children = filterEmpty($slots.default)

    return {
      [style[`${prefixCls}`]]: true,
      [style[`${prefixCls}-${type}`]]: type,
      [style[`${prefixCls}-${shape}`]]: shape,
      [style[`${prefixCls}-lg`]]: size === 'large',
      [style[`${prefixCls}-icon-only`]]: children.length === 0 && iconType,
      [style[`${prefixCls}-loading`]]: sLoading,
      [style[`${prefixCls}-background-ghost`]]: ghost || type === 'ghost',
      [style[`${prefixCls}-two-chinese-chars`]]: hasTwoCNChar && autoInsertSpace,
      [style[`${prefixCls}-block`]]: block
    }
  }


  @Watch('loading')
  private onLoadingChanged(val: any, preVal: any) {
    if (preVal && typeof preVal !== 'boolean') {
      clearTimeout(this.delayTimeout)
    }
    if (val && typeof val !== 'boolean' && val.delay) {
      this.delayTimeout = setTimeout(() => {
        this.sLoading = !!val
      }, val.delay)
    } else {
      this.sLoading = !!val
    }
  }

  private created() {
    this.sLoading = !!this.loading
  }
  private mounted() {
    this.fixTwoCNChar()
  }
  private updated() {
    this.fixTwoCNChar()
  }
  private beforeDestroy() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout)
    }
  }
  private fixTwoCNChar() {
    // Fix for HOC usage like <FormatMessage />
    const node: any = this.$refs.buttonNode
    if (!node) {
      return
    }
    const buttonText = node.textContent || node.innerText
    if (this.isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!this.hasTwoCNChar) {
        this.hasTwoCNChar = true
      }
    } else if (this.hasTwoCNChar) {
      this.hasTwoCNChar = false
    }
  }
  private handleClick(event: any) {
    const { sLoading } = this.$data
    if (sLoading) {
      return
    }
    this.$emit('click', event)
  }
  private insertSpace(child: any, needInserted: any) {
    const SPACE = needInserted ? ' ' : ''
    if (typeof child.text === 'string') {
      let text = child.text.trim()
      if (isTwoCNChar(text)) {
        text = text.split('').join(SPACE)
      }
      return <span>{text}</span>
    }
    return child
  }
  private isNeedInserted() {
    const { icon, $slots } = this
    return $slots.default && $slots.default.length === 1 && !icon
  }
  private render(h: CreateElement) {
    const { type, htmlType, classes, icon, disabled, handleClick, sLoading, $slots, $attrs, $listeners } = this
    const buttonProps = {
      attrs: {
        ...$attrs,
        disabled
      },
      class: classes,
      on: {
        ...$listeners,
        click: handleClick
      }
    }
    const iconType = sLoading ? 'loading' : icon
    const iconNode = iconType ? <Icon type={iconType} /> : null
    const children = filterEmpty($slots.default)
    const autoInsertSpace = true //this.configProvider.autoInsertSpaceInButton !== false
    const kids = children.map((child) => this.insertSpace(child, this.isNeedInserted() && autoInsertSpace))

    if ($attrs.href !== undefined) {
      return (
        <a {...buttonProps} ref="buttonNode">
          {iconNode}
          {kids}
        </a>
      )
    }

    const buttonNode = (
      <button {...buttonProps} ref="buttonNode" type={htmlType || 'button'}>
        {iconNode}
        {kids}
      </button>
    )

    if (type === 'link') {
      return buttonNode
    }

    return <Wave>{buttonNode}</Wave>
  }
}
