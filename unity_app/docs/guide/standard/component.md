# vue开发规范
[[toc]]
:::tip 
vue组件可以采用文件或文件的形式, 尽量采用文件夹的形式, 可以把相关样式导入进去. 
:::

## 组件

>组件名统一首字母大写

### 普通组件
- 组件编写
:::details
```tsx
//  !和可选参数?是相反的, !告诉TypeScript我这里一定有值.
import { Component, Prop, Vue, Watch, Model, Emit } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { Route } from 'vue-router'
import style from './index.module.less'

import topMenuMixin from '@/base/src/mixins/topMenu'

@Component({
  mixins: [topMenuMixin], // mixin引入
  // 定义过滤器
  filters: {
    toFixed: (num: number, fix: number = 2) => {
      return num.toFixed(fix)
    },
  },
})
export default class ComponentA extends Vue {
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
    return <div class={style.box}></div>
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

```
:::

### 函数组件
```tsx
import classnames from 'classnames'
import style from './index.module.less'
import { CreateElement } from 'vue'

const ComponentB = {
  functional: true,
  render(h: CreateElement, context: any) {
    return <div class={style.box}>函数组件</div>
  },
}

export default ComponentB

```


### 组件引用
```tsx
import { Component, Prop, Vue, Watch, Model, Emit } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import ComponetA from './components/componentA'  // 引入普通组件
import ComponetB from './components/componentB'  // 引入函数组件

@Component({})
export default class ComponentC extends Vue {
  provide render(h:CreateElement){
    return <div>
      <ComponetA {...{...}}/>
      {/* 函数组件必须以下面这种方式引用 */}
      {h(ComponentB),{}}
    </div>
  }
}

```


### 组件样式
单独组件的样式放到组件文件夹下面, 命名推荐使用 `index.module.less`, 
组件的命名尽量简洁, 尽量放到第一层, 减少嵌套
```less
.box {
  background-color: #fff;
  display: flex;
}

.active {
  color: #f00;
}

.item {
  display: inline-block;
  margin-top: 10px;
}

```

## 文档

每个组件及组件页面项目都必须有个markdown文档, 采用中文命名, 文档里面编写相关的逻辑.
