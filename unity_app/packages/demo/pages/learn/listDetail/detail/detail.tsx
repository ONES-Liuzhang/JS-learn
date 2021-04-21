import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import { getSessionData } from '.'

/**
 * vModel  =   @Prop value  + onInput()
 *  
 */
@Component({})
export default class Detail extends Vue {

  private id = ''
  private info: any = {}

  private beforeRouteEnter(to: Route, from: Route, next: (vm?: any) => void) {
    next((vm: Detail) => {
      vm.id = to.query.id as string
    })
  }


  @Watch('id', { immediate: true })
  private onIdChange(id: string) {
    let data = getSessionData()
    console.log('详情数据', data)
    this.info = data
    // this.id = data.id
    console.log('id 改变', id)
  }

  private created() {
    this.__abc = '32424'
  }
  public render(h: CreateElement) {
    console.log('father render')   // 只做渲染的事情
    return (
      <div class={style.box}>
        <div>详情页面</div>
        <div>name: {this.info.name}</div>
        <div>name: {this.info.age}</div>
      </div>
    )
  }
}
