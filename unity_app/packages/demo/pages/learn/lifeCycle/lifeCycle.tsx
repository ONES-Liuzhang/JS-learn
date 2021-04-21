import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import style from './index.module.less'

//  push pop  shift unshift splice  sort reverse
//  arr[3] = {}
/**
 * 值传递是单向的
 *  事件中心: 收集父组件传入的on方法
 * 
 * watch   user watch 
 * 可以监听 $data ,  和  $prop 接收到的属性
 * 
 * $data $prop  的所有属性都代理到 this 下面
 * $attrs没有用 prop 接收的属性
 * $listeners 接收所有传入的方法, 通过 $emit调用
 * 
 * this.arr.splice(0, 1, this.arr[0])
 * this.$forceUpdate()  会强制调用render  
 */

/**
 * 函数式组件 为了性能, @Component({ functional: true })
 * 没有状态, 没有生命周期

 */


@Component({})
export class Child extends Vue {
  // @Prop() value!: string
  @Prop() test!: string


  private obj = {}

  private arr: any[] = []

  private abc = ''
  private beforeCreate() {
    console.log('Child beforecreate')
  }

  @Watch('abc', { immediate: true })
  private abcChange(value: string) {
    console.log('32424', value)
  }

  private created() {


    console.log('props', this.$props)
    console.log('attrs', this.$attrs)
    console.log('listeners', this.$listeners)
    this.abc = '32424'
    console.log('Child created')

    console.log('arr ', this.arr)

    setTimeout(() => {
      this.arr = [{ x: 324 }]
      this.arr[0].x = 3245453

      // this.arr.splice(0, 1, this.arr[0])

      // 需要显示的刷新
      // this.arr[0] = { x: 333 }
      // this.$forceUpdate()


      console.log('arr', this.arr)

      // setTimeout(() => {
      //   this.arr[0].x = 324242342342
      // }, 0)

      // this.arr = [...this.arr]
    }, 1000)
    // if (true) {
    //   this.$watch('abc', () => {

    //   })
    // }

  }
  private beforeMount() {
    console.log('Child beforeMount')
  }

  private mounted() {
    console.log('Child mounted')
  }

  private beforeUpdate() {
    console.log('Child beforeUpdate')
  }

  private updated() {
    console.log('Child updated')
  }
  private beforeDestory() {
    console.log('Child beforeDestory')
  }

  private destroyed() {
    console.log('Child destroyed')
  }


  public render(h: CreateElement) {
    console.log('Child render')

    return (
      <div class={style.box}>child
        <a-button onClick={() => {
          this.$emit('change', '323423424')
        }}></a-button>
        {
          this.arr.map(item => {
            return <span>{item.x}</span>
          })
        }
        {/* {this.arr[0].x} */}
      </div>
    )
  }
}

@Component({ functional: true })
export class FunChild extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    console.log('context', context)
    return <div>FunChild</div>
  }
}

/**
 *  
 */
const con = {
  name: 'Father',
  data() {
    return {
      abc: ''
    }
  },

}

// const a = {}
// a.test = '324'
// Object.defineProperty(a, 'abc',
//   {
//     value: 3224,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//     set: (val: string) => {

//     },
//     get: () => {
//       return ''
//     }
//   }
// )

// a.abc = '32342'

const pro = {}

@Component({})
export default class Father extends Vue {

  // private abc = { a: {} }
  private abc = ''

  private beforeCreate() {
    console.log('father beforecreate')

  }
  private created() {
    console.log('father created')

  }
  private beforeMount() {
    console.log('father beforeMount')
  }

  private mounted() {
    console.log('$el', this.$el)

    console.log('father mounted')
  }

  private beforeUpdate() {
    console.log('father beforeUpdate')
  }

  private updated() {
    console.log('father updated')
  }
  private beforeDestory() {
    console.log('father beforeDestory')
  }

  private destroyed() {
    console.log('father destroyed')
  }


  public render(h: CreateElement) {
    console.log('father render')

    return (
      <div class={style.box}>
        father
        {this.abc}

        {/* {h(Child, {
          attrs: {
            test: 'test',
            p1: '3242'
          },
          on: {
            change: (value: string) => {

            }
          }
        })} */}
        {/* <Child
          // class='fatherClass'
          // style={{ color: 'red' }}
          // p1='abc'
          // p2='3242'
          test='test'

          // vModel={this.abc}  //   vModel   value + onInput 

          // value={this.abc}
          // onInput={(value: string) => { this.abc = value }}

          onClick={() => { }}
          onTest={() => { }}
          onChange={[(value: string) => {

            console.log('接收的value', value)
            this.abc = value
          }, (value: string) => {
            console.log('接收的value1', value)
          }]}

        ></Child> */}
        <FunChild
          p1='abc'
          p2='3242'
          test='test'
          vModel={this.abc}
          onClick={() => { }}
          onChange={() => { }}
        ></FunChild>
      </div>
    )
  }
}

// render wather  ,     user Wather 

// Dep  [render wather ]
