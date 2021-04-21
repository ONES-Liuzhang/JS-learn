/* eslint-disable indent */
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import style from './index.module.less'


/**
 * A valid case-insensitive filename extension, starting with a period (".") character. For example: .jpg, .pdf, or .doc.
A valid MIME type string, with no extensions.
The string audio/* meaning "any audio file".
The string video/* meaning "any video file".
The string image/* meaning "any image file".
 */


@Component({ functional: true })
export default class FileShow extends Vue {
  private render(h: CreateElement, context: RenderContext) {
    const { props, data } = context
    const { value } = props
    const file = value.file
    let type = file && file.type
    let innerNode
    let filename = value.name
    let ext = filename.split('.')[1]

    switch (ext && ext.toLocaleLowerCase()) {
      case 'jpeg':
      case 'jpg':
      case 'png':
        innerNode = <img src={value.url} alt='图片' />
        break
      case 'pdf':
        innerNode = <a-icon component={require('svg/file/pdf.svg').default} class={style.icon} />
        break
      case 'doc':
      case 'docx':
        innerNode = <a-icon component={require('svg/file/word.svg').default} class={style.icon} />
        break
      case 'xls':
      case 'xlsx':
        innerNode = <a-icon component={require('svg/file/excel.svg').default} class={style.icon} />
        break
      case 'ppt':
      case 'pptx':
        innerNode = <a-icon component={require('svg/file/ppt.svg').default} class={style.icon} />
        break
      default:
        innerNode = <a-icon type="search" class={style.icon}></a-icon>
        break
    }
    // if (!type) {
    //   innerNode = <a-icon type="search"></a-icon>
    // } else if (type.indexOf('image') === 0) {
    // } else {

    //   // innerNode = <a-icon type="search"></a-icon>
    // }
    return <div class={style.box}>
      {innerNode}
    </div>
  }
}
