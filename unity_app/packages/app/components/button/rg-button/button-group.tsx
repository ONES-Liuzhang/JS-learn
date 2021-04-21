import { Component, Vue } from 'vue-property-decorator'
import { filterEmpty } from '@/app/libs/props-util'
import style from './index.module.less'

@Component
export default class RgButtonGroup extends Vue {

  private render(h: CreateElement) {
    const { size, $slots } = this

    const classes = {
      [style['rg-btn-group']]: true,
      [style['rg-btn-group-lg']]: size === 'large',
    }
    return <div class={classes}>{filterEmpty($slots.default)}</div>
  }
}
