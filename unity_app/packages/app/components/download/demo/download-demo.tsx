import { Component, Vue, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import Download from '@/app/components/download'

@Component({})
export default class PicUploadDemo extends Vue {
  private render(h: CreateElement) {
    return <div class={style.box}>
      <div class='block'>
        <Download path="/faefe/234"></Download>

      </div>
      <div class='block'>
        <Download local path='/static/abc.xlsx'>下载本地的静态文件</Download>
      </div>
    </div>
  }
}
