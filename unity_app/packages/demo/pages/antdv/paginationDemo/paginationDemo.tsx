import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './pagination.module.less'
@Component
class PaginationDemo extends Vue {
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          <a-pagination defaultCurrent={2} total={500} />
        </div>
      </div>
    )
  }
}

export default PaginationDemo
