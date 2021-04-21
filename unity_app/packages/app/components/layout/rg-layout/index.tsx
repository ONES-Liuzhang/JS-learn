/* eslint-disable indent */

import { Component, Vue } from 'vue-property-decorator'

import style from './index.module.less'



@Component({ functional: true })
export class RgLayoutHeader extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props, slots } = context
    const { height, fixed } = props
    return (
      <div
        role='header'
        class={[style.header, fixed ? style.fixed : '']}
        {...context}
        style={{ height: `${height}px` }} >
        {slots().default}
      </div>
    )
  }
}



@Component({ functional: true })
export class RgLayoutFooter extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props, slots } = context
    const { height, fixed } = props
    return (
      <div
        role='footer'
        class={[style.footer, fixed ? style.fixed : '']}
        {...context}
        style={{ height: `${height}px` }} >
        {slots().default}
      </div>
    )
  }
}

@Component({ functional: true })
export class RgLayoutAside extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props, slots } = context
    const { width } = props
    return (
      <div
        role='aside'
        class={[style.aside]}
        {...context}
        style={{ width: `${width}px` }} >
        {slots().default}
      </div>
    )
  }
}

@Component({})
export class RgLayout extends Vue {

  public triggerAside(val?: boolean) {
    const $el = this.$el
    const classList = $el.classList
    // eslint-disable-next-line no-undefined
    if (val === undefined) {
      classList.toggle(style.hideAside)
      return
    }
    if (val) {
      classList.add(style.hideAside)
    } else {
      classList.remove(style.hideAside)
    }
  }

  // 获取滚动标签
  public getScrollElement() {
    return this.$refs['scroll']
  }
  private render(h: CreateElement) {

    const children = this.$slots.default
    if (!children) return
    const tempChildren: any[] = []

    let header: any
    let footer: any
    let aside: any
    children.forEach(((item: any, index) => {
      let role = item.data.attrs && item.data.attrs.role
      switch (role) {
        case 'header': {
          header = item
          break
        }
        case 'footer': {
          footer = item
          break
        }
        case 'aside': {
          aside = item
          break
        }
        default:
          tempChildren.push(item)
          break
      }
    }))


    if (aside) {
      return renderHorizontalLayout(h, aside, tempChildren)
    }
    return renderVerticalLayout(h, header, footer, tempChildren)
  }
}

// 渲染垂直布局
function renderVerticalLayout(h: CreateElement, header: VNode, footer: VNode, other: VNode[]) {
  const boxStyle = {} as any
  const innerNode = []
  const scrollChildNodes = []
  if (header) {
    const { height, fixed } = header.data!.props as any
    if (fixed) {
      innerNode.push(header)
      boxStyle.paddingTop = `${height}px`
    } else {
      scrollChildNodes.push(header)
    }
  }

  if (footer) {
    const { height, fixed } = footer.data!.props as any
    if (fixed) {
      innerNode.push(footer)
      boxStyle.paddingBottom = `${height}px`
      scrollChildNodes.push(<div class={style.content} role='content'>
        {other}
      </div>)
    } else {
      scrollChildNodes.push(<div class={style.content}
        style={{ minHeight: height ? `calc(100% - ${height}px)` : '100%' }}
        role='content'>
        {other}
      </div>)
      scrollChildNodes.push(footer)
    }
  }

  innerNode.unshift(<div role="scroll" ref="scroll" class={[style.scroll, 'hideScrollBar']}>
    {scrollChildNodes}
  </div>)

  return (
    <div class={style.box} style={boxStyle}>
      {innerNode}
    </div>
  )
}

// 渲染水平布局
function renderHorizontalLayout(h: CreateElement, aside: VNode, other: VNode[]) {
  const { width } = aside.data!.props as any

  return <div class={[style.box, style.h]} >
    {aside}
    <div class={[style.content, style.h]} style={{ width: width ? `calc(100% - ${width}px)` : '100%' }}>
      {other}
    </div>

  </div>
}
