import { Component, Vue } from 'vue-property-decorator'

import BaseLayoutAside from './components/aside'
import style from './index.module.less'
import { RgLayout, RgLayoutAside } from '@/app/components/layout/rg-layout'
import { topMenuMixin } from '@/app/layout/mixins'

@Component({ mixins: [topMenuMixin] })
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


