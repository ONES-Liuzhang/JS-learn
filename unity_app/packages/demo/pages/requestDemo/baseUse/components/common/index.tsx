import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import { callFunc } from '@/app/libs/request'
import { CreateElement } from 'vue'
@Component({})
export default class Common extends Vue {

  public render(h: CreateElement) {
    return (
      <div class="block">
        <a-button
          onClick={() => {
            // 全局的方法调用, 不需要引入
            this.$callFunc({ funcName: 'delay' }).then(res => {
              console.log(res)
            })
            // 直接引入调用
            callFunc({ funcName: 'delay', time: 1 }).then(res => {
              console.log(res)
            })
          }}
        >
          点击请求(成功)
        </a-button>
        <a-button
          onClick={() => {
            callFunc({ funcName: 'test_test' }) // 随便指定一个接口号
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                console.log(err)
              })
          }}
        >
          点击请求(失败,随便指定一个接口号 )
        </a-button>
      </div>
    )
  }
  private handleReqest() { }
}
