import { Component, Vue } from 'vue-property-decorator'

import style from './index.module.less'

@Component({ functional: true })
export default class App extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    return (
      <div class={style.box} role='app'>


        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    )
  }
}
