import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import { callFunc } from '@/app/libs/request'
import axios, { CancelTokenSource } from 'axios'
const { CancelToken } = axios
@Component({})
export default class Cancel extends Vue {
  private loading = false
  private loading1 = false

  private source?: CancelTokenSource
  private source1?: CancelTokenSource

  public render() {
    return (
      <div class="block">
        <div>
          <a-button
            loading={this.loading}
            onClick={() => {
              this.source = CancelToken.source()
              this.loading = true
              callFunc({ funcName: 'delay', time: 5 }, this.source.token)
                .then((res) => {
                  this.loading = false
                  console.log(res)
                })
                .catch((err) => {
                  this.loading = false
                  console.log(err)
                })
            }}
          >
            点击请求(取消请求案例)
          </a-button>
          <a-button
            type="danger"
            onClick={() => {
              this.source!.cancel()
            }}
          >
            点击取消请求
          </a-button>
        </div>

        <div>
          <a-button
            loading={this.loading1}
            onClick={() => {
              this.source1 = CancelToken.source()
              this.loading1 = true
              // 添加一个请求
              callFunc({ funcName: 'delay', time: 5 }, this.source1.token)
                .then((res) => {
                  this.loading1 = false
                  console.log(res)
                })
                .catch((err) => {
                  this.loading1 = false
                  console.log(err)
                })
              // 添加第二个请求
              callFunc({ funcName: 'delay', time: 8 }, this.source1.token)
                .then((res) => {
                  this.loading1 = false
                  console.log(res)
                })
                .catch((err) => {
                  this.loading1 = false
                  console.log(err)
                })
            }}
          >
            点击请求(取消多个请求案例)
          </a-button>
          <a-button
            type="danger"
            onClick={() => {
              this.source1!.cancel()
            }}
          >
            点击取消请求
          </a-button>
        </div>
      </div>
    )
  }
}
