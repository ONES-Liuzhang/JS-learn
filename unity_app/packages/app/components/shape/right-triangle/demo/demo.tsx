import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import RightTriangle from '@/app/components/shape/right-triangle'

@Component({ functional: true })
export default class RightTriangleDemo extends Vue {
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          {/*  card 的标签图标 */}
          <RightTriangle quadrant={1} bgc='#f03' class={style.pad} ></RightTriangle>
          <RightTriangle quadrant={2} style={{ marginRight: '10px' }}></RightTriangle>
          <RightTriangle
            quadrant={3} width={40} height={30}
            style={{ marginRight: '10px' }}></RightTriangle>
          <RightTriangle quadrant={4} style={{ marginRight: '10px' }}></RightTriangle>
        </div>
      </div >
    )
  }
}

