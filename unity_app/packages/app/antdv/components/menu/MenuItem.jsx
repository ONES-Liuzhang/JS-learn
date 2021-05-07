import { Item, itemProps } from '../vc-menu'
import { getOptionProps } from '../_util/props-util'
import Tooltip from '../tooltip'
// eslint-disable-next-line no-empty-function
function noop() {}
export default {
  name: 'MenuItem',
  inheritAttrs: false,
  props: itemProps,
  inject: { getInlineCollapsed: { default: () => noop } },
  isMenuItem: 1,
  methods: {
    onKeyDown(e) {
      this.$refs.menuItem.onKeyDown(e)
    }
  },
  render() {
    const props = getOptionProps(this)
    const { level, title, rootPrefixCls } = props
    const { getInlineCollapsed, $slots, $attrs: attrs, $listeners } = this
    const inlineCollapsed = getInlineCollapsed()
    let titleNode
    if (inlineCollapsed) {
      titleNode = title || (level === 1 ? $slots.default : '')
    }

    // eslint-disable-next-line no-shadow
    const itemProps = {
      props: {
        ...props,
        title: inlineCollapsed ? null : title
      },
      attrs,
      on: $listeners
    }
    const toolTipProps = {
      props: {
        title: titleNode,
        placement: 'right',
        overlayClassName: `${rootPrefixCls}-inline-collapsed-tooltip`
      }
    }
    return (
      <Tooltip {...toolTipProps}>
        <Item {...itemProps} ref="menuItem">
          {$slots.default}
        </Item>
      </Tooltip>
    )
  }
}