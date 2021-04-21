/* eslint-disable indent */
import { Component, Vue, Prop } from 'vue-property-decorator'
import style from './index.module.less'
import { requestDownload } from '@/app/libs/request'
@Component({ functional: true })
export default class Download extends Vue {

  private render(h: CreateElement, context: RenderContext) {
    const { props, slots } = context

    return (
      <div class={style.box} onClick={() => {
        if (props.local) {
          downloadLocalFile(props.path, props.name)
        } else {
          downloadFile()
        }
      }}>
        {slots().default || <span class='link' >下载</span>}
      </div>
    )
  }

}


function getPathname(path: string) {

  let pathname = window.location.pathname + '/' + path

  let list = pathname.split('/').filter(item => {
    if (!item) return false
    return item !== 'index.html'
  })

  return list.join('/')
}
// 下载本地文件
function downloadLocalFile(path: string, name: string) {

  const downloadElement = document.createElement('a')
  let tempPath = getPathname(path)
  console.log('下载链接的决定路径', tempPath)

  downloadElement.href = tempPath

  downloadElement.download = name || '' //下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() //点击下载
  document.body.removeChild(downloadElement) //下载完成移除元素
}
function downloadFile() {
  requestDownload({}).then((res) => {
    const blob = res.data
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob) //创建下载的链接
    downloadElement.href = href
    downloadElement.download = '' //下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() //点击下载
    document.body.removeChild(downloadElement) //下载完成移除元素
    window.URL.revokeObjectURL(href) //释放掉blob对象 
  })

}
