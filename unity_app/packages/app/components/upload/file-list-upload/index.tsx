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
export default class PicListUpload extends Vue {
  @Prop(Array) value!: Upload.IFileMeta[]
  @Prop({ default: false }) multiple!: boolean   // 是否多选
  // @Prop({ default: false }) direcotry!: boolean  // 是否选择文件
  // @Prop(String) accept?: string   // 能选择的文件类型

  @Prop(Number) max!: number // 最大
  private stateValue: Upload.IFileMeta[]
  constructor() {
    super()
    if (this.value) this.stateValue = this.value
    else this.stateValue = []
    // if (this.value) this.stateValue = this.value
  }
  private render(h: CreateElement) {
    let fileNodes = this.stateValue.map((item, index) => {
      let tempNode
      if (item.status === 'uploading') {
        tempNode = <LoadingShow></LoadingShow>
      } else {
        tempNode = [
          <a-icon class={style.clear} type='close' onClick={() => this.handleDelete(index)}></a-icon>,
          <FileShow value={item} isImg={true}></FileShow>,
        ]
      }
      return <div class={style.item} key={item.id}>{tempNode}</div>
    })
    return <div>
      {fileNodes}
      {
        (this.max === this.stateValue.length) ? '' : <InputMgr
          onChange={this.handleChange}
          {...{ props: { ...this.$attrs } }}
          multiple={false} >
          <SelFile></SelFile>
        </InputMgr>
      }
    </div>

  }
  private handleDelete(index: number) {
    this.stateValue.splice(index, 1)
    let tempData = this.stateValue.slice()
    this.$emit('input', tempData)
    this.$emit('change', tempData)
  }
  // 
  private handleChange(file: File) {
    let formData = new FormData()
    formData.append('file', file)
    let self = this
    this.loading = true
    let tempData: Upload.IFileMeta = {
      id: generateUUID(),
      name: file.name,
      status: 'uploading',
      url: '',
      // type: file.type,
      file,
    }
    this.stateValue = [...self.stateValue, tempData]
    requestUpload(formData).then(({ data }) => {
      if (data.code === '0000' && data.data) {
        let res = data.data
        tempData.url = res.path
        tempData.id = generateUUID()
        tempData.status = 'done'
        self.$emit('input', tempData)
        self.$emit('change', tempData)
        self.$forceUpdate()
      } else {
        console.log(data)
        self.$message.error('上传图片失败')
      }
    }).catch(err => {
      console.log(err)
      this.$message.error('上传图片失败')
    })
  }
}
