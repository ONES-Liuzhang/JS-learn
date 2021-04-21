/* eslint-disable indent */
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import style from './index.module.less'

import Item from './components/item'


function getRender(vm: Vue, key: string) {
  const scopedSlots = vm.$scopedSlots || {}
  return scopedSlots[key]
}

@Component({})
export default class RgPaSelect extends Vue {
  @Prop() value!: string
  @Prop() list!: any[]
  private outList: any[] = []
  private innerList: any[] = []
  private stateValue = ''

  @Watch('list', { immediate: true, })
  onListChange(list: any) {
    if (!Array.isArray(list)) return
    if (list.length > 5) {
      this.outList = list.slice(0, 4)
      this.innerList = list.slice(4)
    } else {
      this.outList = this.list.slice()
      this.innerList = []
    }
  }

  @Watch('value', { immediate: true })
  private handlerValueChange(value: string) {
    this.stateValue = value
  }

  private handlerClickItem(item: any) {
    this.stateValue = item.key
    this.$emit('input', item.key, item)
    this.$emit('change', item.key, item)
  }

  private render(h: CreateElement) {
    // if (this.list.length === 0) return
    const outNotes = this.outList.map(item => {

      if (this.$scopedSlots && item.scopedSlot) {
        let scoptedRender = getRender(this, item.scopedSlot.custom)
        // let renderMethod = this.$scopedSlots[(this.$scopedSlots.name as string)] as any
      }
      return <Item
        key={item.key}
        label={item.value}
        active={this.stateValue === item.key}
        onClick={() => this.handlerClickItem(item)}
      ></Item>
    })
    let innerNotes
    if (this.innerList.length > 0) {
      innerNotes = <a-dropdown>
        <span class='link'>更多</span>
        <div slot="overlay">
          {this.innerList.map(item => {
            return <Item
              key={item.key}
              label={item.value}
              active={this.stateValue === item.key}
              onClick={() => this.handlerClickItem(item)}
            ></Item>
          })}
        </div>
      </a-dropdown>
    }
    return (
      <div class={style.box}>
        {outNotes}
        {innerNotes}
      </div>
    )
  }
}

