import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'


// import { mutations } from '@/base/layout/store'
import style from './index.module.less'

@Component({})
export default class Home extends Vue {
  private render(h: CreateElement) {
    return (
      <div class={style.box}>
        <h1>产品工厂首页</h1>
      </div>
    )
  }
}
