import { Component, Vue } from 'vue-property-decorator'

import style from './index.module.less'

@Component({})
export default class FundList extends Vue {
  private render(h: CreateElement) {
    return (
      <div class={style.box}>
        <h1>基金列表</h1>
      </div>
    )
  }
}
