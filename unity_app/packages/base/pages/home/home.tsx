import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'


// import { mutations } from '@/base/layout/store'
import style from './index.module.less'

@Component({})
export default class Home extends Vue {
  private render(h: CreateElement) {
    return (
      <div class={style.box}>
        <h1>首页</h1>
        <h1>首页</h1>

        <h1>首页</h1>

        <h1>首页</h1>

        首页
      </div>
    )
  }
  // private beforeRouteEnter(to: any, from: any, next: () => void) {
  //   mutations.setIsListenScroll(true)
  //   next()
  // }
  // private beforeRouteLeave(to: any, form: any, next: () => void) {
  //   mutations.setIsListenScroll(false)
  //   next()
  // }
}
