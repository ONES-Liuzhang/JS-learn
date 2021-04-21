import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import { callFunc } from '@/app/libs/request'
import Common from './components/common'

import Cancel from './components/cancel'

import { CreateElement } from 'vue'

@Component({})
export default class BaseUse extends Vue {
  private loading = false
  public render(h: CreateElement) {
    return (
      <div class={style.box}>
        {h(Common)}
        <div class="block">
          <a-button
            onClick={() => {
              callFunc({ funcName: 'noRule' })
                .then((res) => {
                  console.log(res)
                })
                .catch((err) => {
                  console.log(err)
                })
            }}
          >
            点击请求(接口的数据不规范)
          </a-button>
        </div>
        <div class="block">
          <a-button
            loading={this.loading}
            onClick={() => {
              this.loading = true
              callFunc({ funcName: 'timeout' })
                .then((res) => {
                  console.log(res)
                  this.loading = false
                })
                .catch((err) => {
                  console.log(err)
                  this.loading = false
                })
            }}
          >
            点击请求(响应超时失败)
          </a-button>
        </div>
        {/* 取消请求 */}
        {h(Cancel)}
      </div>
    )
  }
  private handleReqest() { }
}
