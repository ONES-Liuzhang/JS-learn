import { Component, Vue, Watch } from 'vue-property-decorator'


// import { state } from './store'
import { RgLayout, RgLayoutHeader, RgLayoutFooter } from '@/app/components/layout/rg-layout'

import LayoutHeader from './components/layout-header'
import LayoutFooter from './components/layout-footer'
import style from './index.module.less'
import antdv from '@/app/antdv'
const setDefaultTargetOld = antdv.Affix.setDefaultTarget as Function
import { setDefaultTarget } from '@/app/components/affix/rg-affix'


@Component({})
export default class Layout extends Vue {

  private render() {
    return <div class={style.box}>
      <RgLayout ref="layout">
        <RgLayoutHeader fixed height={80}>
          <LayoutHeader opacity={this.opacity}></LayoutHeader>
        </RgLayoutHeader>
        <div class={[style.scroll]} ref="scroll" >
          <a-config-provider getPopupContainer={this.getPopupContainer}>
            <div class={[style.inner, 'main-inner']} ref='inner'>
              <keep-alive>
                <router-view />
              </keep-alive>
            </div>
          </a-config-provider>
        </div>
        <RgLayoutFooter height={100} >
          <LayoutFooter></LayoutFooter>
        </RgLayoutFooter>
      </RgLayout>
    </div>

  }
  private mounted() {

    // 设置滚动的监听元素
    const layout = this.$refs.layout as RgLayout
    const scrollEl = layout.getScrollElement()
    setDefaultTargetOld(scrollEl)
    setDefaultTarget(scrollEl)
  }
  private getPopupContainer(el: HTMLElement, dialogContext: any) {
    if (dialogContext) {
      return dialogContext.getDialogWrap()
    }
    console.log(this.$refs.inner)
    return this.$refs.inner || document.body
  }
}

