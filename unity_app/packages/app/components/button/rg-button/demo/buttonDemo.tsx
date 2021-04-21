import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'
import { RgButton, RgButtonGroup } from '@/app/components/button/rg-button'

@Component
export default class ButtonDemo extends Vue {
  private created() { }
  public render(h: CreateElement) {
    return (<div>
      <div class='block'>
        <div class={style.relax}>
          <RgButton>Default</RgButton>
          <RgButton type="dashed">Dashed</RgButton>
          <RgButton type="danger">Danger</RgButton>
          <RgButton type="primary">按钮</RgButton>
          <RgButton type="primary" size="large">Large</RgButton>
          <RgButton type="link">Link</RgButton>
        </div>
      </div>


      <div class='block'>
        <div>
          <RgButtonGroup>
            <RgButton>Cancel</RgButton>
            <RgButton type="primary">OK</RgButton>
          </RgButtonGroup>
        </div>
      </div>


      <div class='block'>
        <div>
          <RgButtonGroup>
            <RgButton disabled>L</RgButton>
            <RgButton disabled>M</RgButton>
            <RgButton disabled>R</RgButton>
          </RgButtonGroup>
        </div>
      </div>


      <div class='block'>
        <div>
          <RgButtonGroup>
            <RgButton type="primary">L</RgButton>
            <RgButton>M</RgButton>
            <RgButton>M</RgButton>
            <RgButton type="dashed">R</RgButton>
          </RgButtonGroup>
        </div>
      </div>


      <div class='block'>
        <div class={style.relax}>
          <RgButton type="primary" ghost>
            Primary
          </RgButton>
          <RgButton ghost>Default</RgButton>
          <RgButton type="dashed" ghost>
            Dashed
          </RgButton>
          <RgButton type="danger" ghost>
            Danger
          </RgButton>
          <RgButton type="link" ghost>
            Link
          </RgButton>
        </div>
      </div>


      <div class='block'>
        <div class={style.relax}>

          <RgButton type="primary" shape="circle" icon="search"></RgButton>
          <RgButton type="dashed" shape="circle" icon="search" />
          <RgButton type="primary" shape="circle" loading />

        </div>
      </div>


      <div class='block'>
        <div class={style.relax}>
          <RgButton type="primary" size={this.size}>
            Primary
          </RgButton>
          <RgButton size={this.size}>Normal</RgButton>
          <RgButton type="dashed" size={this.size}>
            Dashed
          </RgButton>
          <RgButton type="danger" size={this.size}>
            Danger
          </RgButton>
          <RgButton type="link" size={this.size}>
            Link
          </RgButton>

        </div>
      </div>


      <div class='block'>
        <div class={style.relax}>
          <RgButton type="primary" shape="circle" icon="download" size={this.size} />
          <RgButton type="primary" shape="round" icon="download" size={this.size}>
            Download
          </RgButton>
          <RgButton type="primary" icon="download" size={this.size}>
            Download
          </RgButton>

        </div>
      </div>


      <div class='block'>
        <div>
          <RgButtonGroup size={this.size}>
            <RgButton type="primary">
              Backward
            </RgButton>
            <RgButton type="primary">
              Forward
            </RgButton>
          </RgButtonGroup>
        </div>
      </div>


      <div class='block'>
        <div class={style['relax-vertical']}>
          <RgButton type="primary" block>
            Primary
          </RgButton>
          <RgButton block>Default</RgButton>
          <RgButton type="dashed" block>
            Dashed
          </RgButton>
          <RgButton type="danger" block>
            Danger
          </RgButton>
          <RgButton type="link" block>
            Link
          </RgButton>
        </div>
      </div>
    </div >)
  }
}
