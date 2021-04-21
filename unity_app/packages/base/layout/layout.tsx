import { Component, Vue, Watch } from 'vue-property-decorator'

import BaseLayoutAside from './components/aside'
import style from './index.module.less'
import { RgLayout, RgLayoutAside } from '@/app/components/layout/rg-layout'
@Component({})
export default class BaseLayout extends Vue {
  private render(h: CreateElement) {
    return <RgLayout ref='layout'>
      <RgLayoutAside width={220}>
        <BaseLayoutAside></BaseLayoutAside>
      </RgLayoutAside>
      <keep-alive>
        <router-view />
      </keep-alive>
    </RgLayout>
  }
}


