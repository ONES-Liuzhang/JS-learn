import { Component, Vue } from 'vue-property-decorator'

import style from './index.module.less'

@Component({})
export default class FundDetail extends Vue {
  private render(h: CreateElement) {
    return (
      <div class={style.box}>
        <h1>基金详情</h1>
      </div>
    )
  }
}
