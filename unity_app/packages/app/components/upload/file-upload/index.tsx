import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import style from './index.module.less'
import InputMgr from '../components/inputMgr'
import SelFile from '../components/sel-file'
import FileShow from '../components/file-show'
import LoadingShow from '../components/loading-show'
import { requestUpload } from '@/app/libs/request'
import { generateUUID } from '@/app/libs/util'


/**
 * A valid case-insensitive filename extension, starting with a period (".") character. For example: .jpg, .pdf, or .doc.
A valid MIME type string, with no extensions.
The string audio/* meaning "any audio file".
The string video/* meaning "any video file".
The string image/* meaning "any image file".
 */
@Component({})
export default class FileUpload extends Vue {
  @Prop(Object) value!: Upload.IFileMeta
  @Prop({ default: false }) multiple!: boolean   // 是否多选
  @Prop({ default: false }) direcotry!: boolean  // 是否选择文件

  private stateValue: Upload.IFileMeta | null = null
  private loading = false
  constructor() {
    super()
    if (this.value) this.stateValue = this.value
  }
  private render(h: CreateElement) {
    const { stateValue } = this
    let innerNode
    if (this.loading) {
      innerNode = <LoadingShow />
    } else if (stateValue) {
      innerNode = <div class={style.contentWrapper}>
        <div class={style.reUpload}>重新上传</div>
        <FileShow value={stateValue} ></FileShow>
      </div>
    } else {
      innerNode = <SelFile text={this.$attrs.placeholder}></SelFile>
    }
    return <InputMgr
      onChange={this.handleChange}
      // accept='image/*'
      {...{ props: { ...this.$attrs } }}
      multiple={false} >
      {innerNode}
    </InputMgr>
  }

  // 
  private handleChange(file: File) {
    let formData = new FormData()
    formData.append('file', file)
    let self = this
    this.loading = true
    const { action, beforeUpload } = this.$attrs as any
    let p
    if (action) {
      p = action(formData) as Promise<any>
    } else {
      if (beforeUpload) {
        formData = beforeUpload(formData)
      }
      p = requestUpload(formData)
    }
    p.then(({ data }) => {
      if (data.code === '0000' && data.data) {
        let res = data.data
        let tempData: Upload.IFileMeta = {
          id: generateUUID(),
          name: file.name,
          status: 'done',
          url: res.path,
          file,
        }

        self.stateValue = tempData
        self.$emit('input', tempData)
        self.$emit('change', tempData)

        this.loading = false
      } else {
        console.log(data)
        this.loading = false
        this.$message.error('上传图片失败')
      }

    }).catch(err => {
      console.log(err)
      this.$message.error('上传图片失败')
    })

  }
}
