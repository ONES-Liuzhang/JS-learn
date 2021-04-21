import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './affix.module.less'
@Component
class DividerDemo extends Vue {
  private top: number = 10
  private bottom: number = 10
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          <div>32423423424</div>
          <a-affix offsetTop={120} >
            <div>
              <a-button type="primary">提交</a-button>
              <a-button type="primary">下一步</a-button>
            </div>
          </a-affix>

          <br />
          <div class={style.h}>站位元素</div>

          <a-affix offsetBottom={10}>
            <div>
              <a-button type="primary">提交</a-button>
              <a-button type="primary">下一步</a-button>
            </div>

          </a-affix>
        </div>
      </div>
    )
  }
}

export default DividerDemo
