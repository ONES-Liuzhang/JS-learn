import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import Icon from '@/app/components/icon/rg-icon'
import style from './index.module.less'


@Component
export default class RgAvatar extends Vue {

  @Prop({ default: 'circle' }) public shape!: string
  @Prop({ default: 'default' }) public size!: string
  @Prop() public src!: string
  @Prop() public srcSet!: string
  @Prop() public icon!: string
  @Prop() public alt!: string
  @Prop() public loadError!: Function

  private isImgExist: boolean = true
  private scale: number = 1


  @Watch('src')
  private onSrcChanged() {
    this.$nextTick(() => {
      this.isImgExist = true
      this.scale = 1
      // force update for position
      this.$forceUpdate()
    })
  }
  private mounted() {
    this.prevChildren = this.$slots.default
    this.prevState = { ...this.$data }
    this.$nextTick(() => {
      this.setScale()
    })
  }
  private updated() {
    if (
      this.preChildren !== this.$slots.default ||
      (this.prevState.scale !== this.$data.scale && this.$data.scale === 1) ||
      this.prevState.isImgExist !== this.$data.isImgExist
    ) {
      this.$nextTick(() => {
        this.setScale()
      })
    }
    this.preChildren = this.$slots.default
    this.prevState = { ...this.$data }
  }

  private setScale() {
    const childrenNode = this.$refs.avatarChildren
    if (childrenNode) {
      const childrenWidth = (childrenNode as any).offsetWidth
      const avatarWidth = this.$el.getBoundingClientRect().width
      if (avatarWidth - 8 < childrenWidth) {
        this.scale = (avatarWidth - 8) / childrenWidth
      } else {
        this.scale = 1
      }
      this.$forceUpdate()
    }
  }
  private handleImgLoadError() {
    const { loadError } = this.$props
    const errorFlag = loadError ? loadError() : undefined
    if (errorFlag !== false) {
      this.isImgExist = false
    }
  }
  private render() {
    const { shape, size, src, icon, alt, srcSet } = this.$props

    const prefixCls = 'rg-avatar'

    const { isImgExist, scale } = this.$data

    const sizeCls = {
      [style[`${prefixCls}-lg`]]: size === 'large',
      [style[`${prefixCls}-sm`]]: size === 'small'
    }

    const classString = {
      [style[prefixCls]]: true,
      ...sizeCls,
      [style[`${prefixCls}-${shape}`]]: shape,
      [style[`${prefixCls}-image`]]: src && isImgExist,
      [style[`${prefixCls}-icon`]]: icon
    }

    const sizeStyle =
      typeof size === 'number' ?
        {
          width: `${size}px`,
          height: `${size}px`,
          lineHeight: `${size}px`,
          fontSize: icon ? `${size / 2}px` : '18px'
        } :
        {}

    let children = this.$slots.default as any
    if (src && isImgExist) {
      children = <img src={src} srcSet={srcSet} onError={this.handleImgLoadError} alt={alt} />
    } else if (icon) {
      children = <Icon type={icon} />
    } else {
      const childrenNode = this.$refs.avatarChildren
      if (childrenNode || (scale !== 1 && childrenNode)) {
        const transformString = `scale(${scale}) translateX(-50%)`
        const childrenStyle = {
          msTransform: transformString,
          WebkitTransform: transformString,
          transform: transformString
        }
        const sizeChildrenStyle =
          typeof size === 'number' ?
            { lineHeight: `${size}px` } :
            {}
        children = (
          <span class={style[`${prefixCls}-string`]} ref="avatarChildren" style={{ ...sizeChildrenStyle, ...childrenStyle }}>
            {children}
          </span>
        )
      } else {
        children = (
          <span class={style[`${prefixCls}-string`]} ref="avatarChildren">
            {children}
          </span>
        )
      }
    }
    return <span {...{ on: this.$listeners, class: classString, style: sizeStyle }}>{children}</span>
  }
}

