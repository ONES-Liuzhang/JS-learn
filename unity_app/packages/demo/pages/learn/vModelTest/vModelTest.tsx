import { Component, Vue, Prop } from 'vue-property-decorator'
import style from './index.module.less'


@Component({})
export class Child extends Vue {
  @Prop(String) value!: string
  private created() {

  }


  private render(h: CreateElement) {
    console.log('child render')

    return <div role='child'>
      <a-input onChange={this.handlerChange}></a-input>
      <a-button onClick={() => {
        this.$emit('input', new Date().getTime() + '')
      }}>点击</a-button>
    </div>
  }
  private handlerChange(e: Event) {
    let el = e.target as any
    console.log(el.value)
    this.$emit('input', el.value)

  }
}


/**
 * vModel  =   @Prop value  + onInput()
 */
@Component({})
export default class Father extends Vue {

  private fVal = ''
  public render(h: CreateElement) {
    console.log('father render')
    return (
      <div class={style.box} role='vModel'>
        <div>fVal: {this.fVal}</div>
        <Child vModel={this.fVal} foo='dfsddfasdfas'></Child>
      </div>
    )
  }
}
