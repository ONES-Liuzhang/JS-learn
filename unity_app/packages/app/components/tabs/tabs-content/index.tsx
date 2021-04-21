/* eslint-disable indent */
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import Item from '@/app/components/scroll/item'
import { generateUUID } from '@/app/libs/util'

interface IContentList {
  key: string
  title?: string
  component?: Component
  vnode?: VNode,
}


@Component({})
export default class TabsContent extends Vue {

  @Prop() list!: IContentList[]

  private curIndex = 0

  private stateList: IContentList[] = []

  @Watch('curIndex')
  private handleIndexChange(newVal: number, oldVal: number) {
    let newKey = this.stateList[newVal].key
    let oldKey = this.stateList[oldVal].key
    let newCom = this.$refs[newKey] as Item
    let oldCom = this.$refs[oldKey] as Item
    if (newVal > oldVal) {
      newCom.rightIn()
      oldCom.rightOut()
    } else {
      newCom.leftIn()
      oldCom.leftOut()
    }
  }
  private created() {
    if (this.list) {
      this.stateList = this.list.slice()
    } else {
      let temp = this.$slots.default
      if (temp) {
        this.stateList = temp.map((item: any) => {
          let data = (item.asyncMeta && item.asyncMeta.data) || item.data
          let key = data.key || generateUUID()
          return {
            key,
            vnode: item,
          }
        })
      }
    }
    let defaultKey = this.$attrs.defaultKey
    if (defaultKey) {
      let index = this.stateList.findIndex(item => item.key === defaultKey)
      if (index >= 0) this.curIndex = index
    }
  }

  private mounted() {
    let curKey = this.stateList[this.curIndex].key
    let com = this.$refs[curKey] as Item
    com.show()
  }
  public go(key: string) {
    let index = this.stateList.findIndex(item => item.key === key)
    if (index >= 0) this.curIndex = index
  }
  private render(h: CreateElement) {
    const itemsNode = this.stateList.map(item => {
      let { key, component } = item
      return <Item
        ref={key}
        component={component}
        key={item.key}>
        {item.vnode}
      </Item>
    })
    return <div class={style.box}>
      {itemsNode}
    </div>
  }
}
