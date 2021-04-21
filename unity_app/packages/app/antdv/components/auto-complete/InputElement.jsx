/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
import PropTypes from '../_util/vue-types'
import { cloneElement } from '../_util/vnode'
import { getOptionProps } from '../_util/props-util'
function chaining(...fns) {
  return function(...args) {
    // eslint-disable-line
    // eslint-disable-line
    for (let i = 0; i < fns.length; i++) {
      if (fns[i] && typeof fns[i] === 'function') {
        // eslint-disable-next-line no-invalid-this
        fns[i].apply(this, args)
      }
    }
  }
}
export default {
  name: 'InputElement',
  props: {
    value: PropTypes.any,
    disabled: PropTypes.bool
  },
  methods: {
    focus() {
      const { ele } = this.$refs
      ele.focus ? ele.focus() : this.$el.focus()
    },
    blur() {
      const { ele } = this.$refs
      ele.blur ? ele.blur() : this.$el.blur()
    }
  },

  render() {
    const { $slots = {}, $listeners = {}, $attrs = {} } = this
    const props = getOptionProps(this)
    // eslint-disable-next-line no-undefined
    const value = props.value === undefined ? '' : props.value
    const children = $slots.default[0]
    const { componentOptions = {} } = $slots.default[0]
    const { listeners = {} } = componentOptions
    const newEvent = { ...listeners }

    for (const [eventName, event] of Object.entries($listeners)) {
      newEvent[eventName] = chaining(event, listeners[eventName])
    }

    return cloneElement(children, {
      domProps: { value },
      props,
      on: newEvent,
      attrs: { ...$attrs, value },
      ref: 'ele'
    })
  }
}
