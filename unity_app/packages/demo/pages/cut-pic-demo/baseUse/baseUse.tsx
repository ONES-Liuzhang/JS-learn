/* eslint-disable no-nested-ternary */
/* eslint-disable no-script-url */
/*
 * html2canvas
 * 链接 https://html2canvas.hertzen.com/getting-started
 */

import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import html2canvas from 'html2canvas'
import Content from './components/content'
import jsPDF from 'jspdf'

@Component({})
export default class BaseUse extends Vue {

  public render(h: CreateElement) {
    return (
      <div class={style.box}>
        <div>
          <a-button
            onClick={() => {
              html2canvas(this.$refs.cut as HTMLElement).then(canvas => {
                const data = canvas.toDataURL('image/png')
                const oA = document.createElement('a')
                oA.download = `下载_${new Date().toLocaleTimeString()}` // 设置下载的文件名，默认是'下载'
                oA.href = data
                document.body.appendChild(oA)
                oA.click()
                oA.remove() // 下载之后把创建的元素删除
              })
            }}
          >
            截图
          </a-button>
          <a-button
            onClick={() => {
              html2canvas(this.$refs.cut as HTMLElement).then(canvas => {
                const doc = new jsPDF('', 'pt', 'a4')

                const data = canvas.toDataURL('image/jpeg')
                const imgWidth = 595.28
                const imgHeight = 592.28 / canvas.width * canvas.height
                doc.addImage(data, 'jpeg', 0, 0, imgWidth, imgHeight)

                doc.addPage()
                doc.text(20, 20, 'Do you like that?')
                doc.addImage(data, 'jpeg', 20, 0, imgWidth, imgHeight)

                doc.save(`下载_${new Date().toLocaleTimeString()}.pdf`)
              })
            }}
          >
            生成pdf
          </a-button>
        </div>
        <div class={style.item} >
          <div ref="cut" >
            {h(Content)}
          </div>
        </div>
      </div >
    )
  }
  private handleReqest() { }
}
