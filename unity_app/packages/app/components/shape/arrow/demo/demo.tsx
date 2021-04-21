import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import Arrow from '@/app/components/shape/arrow'
@Component({})
export default class IconDemo extends Vue {
  private render() {
    return (
      <div class={style.box}>

        <div class="block clearfix">
          <div class={style.itemBox}>
            <Arrow></Arrow>
          </div>
          <div class={style.itemBox}>
            <Arrow direction="right"></Arrow>
          </div>
          <div class={style.itemBox}>
            <Arrow direction='up'></Arrow>
          </div>
          <div class={style.itemBox}>
            <Arrow direction="down"></Arrow>
          </div>
        </div>

      </div >
    )
  }
}

