import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'
import RgAvatar from '@/app/components/avatar/rg-avatar'

@Component
export default class CheckBoxDemo extends Vue {
  private created() { }

  public render(h: CreateElement) {
    return (<div>
      <div class="block">
        <div class={style.relax}>
          <RgAvatar size="{64}" icon="heart" />
          <RgAvatar size="large" icon="heart" />
          <RgAvatar icon="heart" />
          <RgAvatar size="small" icon="heart" />
        </div>
      </div>
      <div class="block">
        <div class={style.relax}>
          <RgAvatar shape="square" size="{64}" icon="heart" />
          <RgAvatar shape="square" size="large" icon="heart" />
          <RgAvatar shape="square" icon="heart" />
          <RgAvatar shape="square" size="small" icon="heart" />
        </div>
      </div>
    </div >)
  }
}
