//  !和可选参数?是相反的, !告诉TypeScript我这里一定有值.

import { Component, Prop, Vue, Watch, Model, Emit } from 'vue-property-decorator'
import style from './index.module.less'

@Component({
  mixins: [], // mixin引入
  // 定义过滤器
  filters: {
    toFixed: (num: number, fix: number = 2) => {
      return num.toFixed(fix)
    },
  },
})
export default class 组件名 extends Vue {
  // 定义computed
  get evenList() {
    return this.list.filter((item: number) => item % 2 === 0)
  }
  // 值传递
  @Prop(Number) propA!: number
  @Prop({ default: 'default value' }) propB!: string
  @Prop([String, Boolean]) propC: string | boolean = ''

  // $data里面的属性定义
  public list: number[] = [0, 1, 2, 3, 4]
  // 定义model
  @Model('change', { type: String, default: '123' }) public value!: string
  private str: string = 'abc'

  @Emit()
  public addToCount() {
    this.count += 1
  }
  /**
   * 等同于
   addToCount() {
      this.count += 1
      this.$emit('add-to-count', 1)
    }
   */
  @Emit('reset')
  public resetCount() { }
  @Emit()
  public returnValue() { }

  // 监听str属性的变化
  @Watch('str', { immediate: true, deep: true })
  private onChangeValue(newVal: string, oldVal: string) { }
  @Watch('msg')
  private onMsgChanged(newValue: string, oldValue: string) { }

  private render(h: CreateElement) {
    return <div class={style.box}>
      {/*  */}
    </div>
  }

  // 路由守卫
  private beforeRouteEnter(to: Route, from: Route, next: () => void) {
    next()
  }
  // 路由守卫
  private beforeRouteLeave(to: Route, form: Route, next: () => void) {
    next()
  }
}
