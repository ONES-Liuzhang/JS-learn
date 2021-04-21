import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
@Component
class SpinDemo extends Vue {
  private spinning = false
  private delayTime = 500
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          <a-spin />
          <a-spin spinning={this.spinning} delay={this.delayTime}>
            <div class={style.example}>
              可以点击‘切换’按钮，延迟显示 loading 效果。当 spinning 状态在 `delay`
              时间内结束，则不显示 loading 状态。
            </div>
          </a-spin>
          <a-button
            onClick={() => {
              this.spinning = !this.spinning
            }}
          >
            切换
          </a-button>
        </div>
      </div>
    )
  }
}

export default SpinDemo
