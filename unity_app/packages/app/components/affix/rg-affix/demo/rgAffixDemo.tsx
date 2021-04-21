import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import RgAffix from '@/app/components/affix/rg-affix'
import style from './index.module.less'
@Component
class DividerDemo extends Vue {
  private top: number = 10
  private bottom: number = 10
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          <div>ss</div>
          <RgAffix offsetTop={120} >
            <div>
              <a-button type="primary">提交</a-button>
              <a-button type="primary">下一步</a-button>
            </div>
          </RgAffix>

          <br />
          <div class={style.h}>站位元素</div>

          {/* <RgAffix offsetBottom={10}>
            <div>
              <a-button type="primary">提交</a-button>
              <a-button type="primary">下一步</a-button>
            </div>

          </RgAffix> */}
        </div>
      </div>
    )
  }
}

export default DividerDemo
