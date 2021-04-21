import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import { state, mutations } from './store'
import { RgLayout, RgLayoutHeader, RgLayoutFooter, RgLayoutAside } from '@/app/components/layout/rg-layout'


@Component({})
export default class Base extends Vue {

  private get hide() {
    return state.hide
  }
  // private hide = false
  // @Watch('hide')
  // changeHide(val: boolean) {
  //   let layout = this.$refs.layout2 as RgLayout
  //   layout.triggerAside(val)
  // }
  @Watch('hide')
  handleChangeHide(value: boolean) {
    let layout = this.$refs.layout2 as RgLayout
    layout.triggerAside(value)
  }
  public render(h: CreateElement) {
    return <div class={style.box} >
      <div style={{ height: '500px', border: `1px solid`, width: '300px' }}>
        <RgLayout ref='layout1'>
          <RgLayoutHeader
            height={80}
            fixed
          >
            <div style={{ height: '100%', backgroundColor: 'cyan' }}>3242s</div>
          </RgLayoutHeader>

          <h1 h={323}>2242342342</h1>
          <h1 h={323}>2242342342</h1>

          <RgLayoutFooter
            height={220}
            fixed
          >
            <div style={{ height: '100%', backgroundColor: 'yellow' }}>324234432</div>
          </RgLayoutFooter>

        </RgLayout>
      </div>

      <a-button onClick={this.handleTrigger}>侧边栏切换</a-button>

      <div style={{ height: '300px', border: `1px solid`, width: '500px' }}>
        <RgLayout ref='layout2' >
          <RgLayoutAside width={200} >
            <div style={{ width: '100%', height: '100%', backgroundColor: 'green' }}>3423434242</div>
          </RgLayoutAside>
          <div >244242</div>

        </RgLayout>
      </div>
    </div >
  }
  private handleTrigger() {
    mutations.setHide(!state.hide)
    // state.hide = !state.hide
    // this.hide = !this.hide
    // let layout = this.$refs.layout2 as RgLayout
    // layout.triggerAside()
  }
}
