import { Component, Vue, Watch } from 'vue-property-decorator'
import style from './index.module.less'

import { show, hide, destroy } from './pv-ctrl'
import Block from '@/demo/components/block'

const list = [
  { name: 'rogen', age: 3242, },
  { name: 'other', age: 32632, },
]


@Component({})
export default class RgModalDemo extends Vue {
  private render(h: CreateElement) {
    return <div>
      <Block>
        {
          list.map(item => {
            return <div>
              <span>{item.name}</span>
              <span>{item.age}</span>
              <a-button onClick={() => {
                show({
                  attrs: { ...item },
                  // on: {
                  //   click: () => {
                  //     console.log('点击了按钮', item)
                  //   }
                  // }
                })
              }}>detail</a-button>
            </div>
          })
        }

        <a-button onClick={() => {
          destroy()
        }}>destroy</a-button>
      </Block>

      <Block>
        <a-button>
          不带关闭按钮
        </a-button>
      </Block>

    </div >
  }
}
