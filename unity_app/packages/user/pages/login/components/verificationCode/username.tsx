import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import classnames from 'classnames'
import style from './index.module.less'
import { CreateElement } from 'vue'


@Component({})
export default class Username extends Vue {

  private render(h: CreateElement) {
    return (
      <div class={style.codeFormItem}>
        <a-input placeholder="图形验证码" type="text" class={style.left} />
        <div class={style.right}>
          {/* <img src="./components/images/timg.jpeg" /> */}
        </div>
      </div>
    )
  }
}
