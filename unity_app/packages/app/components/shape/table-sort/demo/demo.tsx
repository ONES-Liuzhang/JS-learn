import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import TableSort from '@/app/components/shape/table-sort'

@Component({ functional: true })
export default class TableSortDemo extends Vue {
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          <TableSort></TableSort>
        </div>
      </div >
    )
  }
}

