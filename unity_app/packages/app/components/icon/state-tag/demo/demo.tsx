import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import StageTag from '@/app/components/icon/state-tag'


@Component({ functional: true })
export default class StageTagDemo extends Vue {
  private render() {
    return (
      <div class={style.box}>
        <div class='block'>
          <StageTag title="待复核" color="#fc9"></StageTag>
          <StageTag title="通过" ></StageTag>
          <StageTag title="不通过" color='#FAB4B4'></StageTag>
          <StageTag title="自定义" w={100}></StageTag>
          <StageTag title="正常" ></StageTag>
          <StageTag title="已停用" color='#FAB4B4'></StageTag>
        </div>

      </div >
    )
  }
}

