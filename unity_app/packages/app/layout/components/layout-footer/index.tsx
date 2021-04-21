import { Component, Vue } from 'vue-property-decorator'


import style from './index.module.less'

@Component({ functional: true })
export default class LayoutFooter extends Vue {
  private render(h: CreateElement) {
    return (
      <div class={style.box}>
        <div class={style.inner}>
          底部
        </div>
      </div>
    )
  }
}
