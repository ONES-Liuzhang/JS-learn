/* eslint-disable indent */
import { Component, Vue, Prop } from 'vue-property-decorator'
import style from './index.module.less'

const duration = 500

@Component({})
export default class Item extends Vue {

  private left = '100%'
  private animate = false
  private absolute = true
  public leftOut() {
    this.animate = true
    this.left = '100%'

    // this.absolute = false 
    setTimeout(() => {
      this.absolute = true
    }, duration)
  }
  public rightOut() {
    this.animate = true
    this.left = '-100%'
    setTimeout(() => {
      this.absolute = true
    }, duration)
  }
  public leftIn() {
    this.load()
    if (this.left === '-100%') {
      this.animate = true
      this.left = '0'
    } else {
      this.left = '-100%'
      this.animate = false
      setTimeout(() => {
        this.left = '0'
        this.animate = true

        // this.absolute = false
      }, 0)
    }
    setTimeout(() => {
      this.absolute = false
    }, duration)
  }
  public rightIn() {
    this.load()
    if (this.left === '100%') {
      this.animate = true
      this.left = '0'
    } else {
      this.left = '100%'
      this.animate = false
      setTimeout(() => {
        this.left = '0'
        this.animate = true
      }, 0)
    }
    setTimeout(() => {
      this.absolute = false
    }, duration)
  }
  public show() {
    this.load()
    this.left = '0'
    this.absolute = false
  }
  public load() {

    if (this.__loaded) return
    this.__loaded = true
  }
  private render(h: CreateElement) {
    const { component } = this.$attrs as any
    let innerNode
    if (!this.__loaded) {
      innerNode = ''
    } else if (component) {
      innerNode = h(component)
    } else {
      innerNode = this.$slots.default
      console.log(innerNode)

    }
    return (
      <div
        class={[style.box, this.animate ? style.trans : '', this.absolute ? style.absolute : '']}
        style={{ left: this.left }}>
        {innerNode}
      </div>
    )
  }
}
