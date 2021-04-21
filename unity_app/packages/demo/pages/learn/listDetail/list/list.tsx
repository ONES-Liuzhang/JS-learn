import { Component, Vue, Prop } from 'vue-property-decorator'
import style from './index.module.less'
import { go as detailGo } from '../detail'
/**
 * vModel  =   @Prop value  + onInput()
 *  
 */

@Component({})
export default class List extends Vue {
  private data = [{
    id: 'aaa',
    name: 'xxxx',
    age: 32,
  },
  {
    id: 'bbb',
    name: 'yyy',
    age: 32,
  }]
  public render(h: CreateElement) {
    console.log('father render')
    return (
      <div class={style.box}>

        列表页面
        {
          this.data.map(item => {
            return <div>
              <span>{item.name}</span>
              <span>{item.age}</span>

              <a-button onClick={() => this.handlerClick(item)}>详情</a-button>
            </div>
          })
        }

      </div>
    )
  }
  private handlerClick(item: any) {
    console.log(item)
    detailGo(item)
  }
}
