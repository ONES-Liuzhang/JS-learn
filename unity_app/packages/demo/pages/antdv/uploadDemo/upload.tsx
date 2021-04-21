import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './upload.module.less'
import { CreateElement } from 'vue'
import UpdateNew from './uploadNew'

function getBase64(img: Blob, callback: { (imageUrl: any): void; (arg0: string | ArrayBuffer | null): any }) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
@Component
class UploadDemo extends Vue {

  private handleChange(info: { file: { status: string; originFileObj: Blob } }) {
    if (info.file.status === 'uploading') {
      this.loading = true
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        this.imageUrl = imageUrl
        this.loading = false
      })
    }
  }
  private beforeUpload(file: { type: string; size: number }) {
    // const isJPG = file.type === 'image/jpeg'
    // if (!isJPG) {
    //   this.$message.error('You can only upload JPG file!')
    // }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      this.$message.error('Image must smaller than 2MB!')
    }
    return isLt2M
  }
  public loading = false
  public imageUrl = ''

  private render(h: CreateElement) {
    let imgNode
    // const imgNode = () => {
    if (this.imageUrl) {
      imgNode = <img src={this.imageUrl} alt='avatar' />
    } else {
      imgNode = (
        <div>
          <a-icon type={this.loading ? 'loading' : 'plus'} />
          <div class="ant-upload-text">Upload</div>
        </div>
      )
    }
    return (
      <div class={style.box}>
        <a-upload
          name={'avatar'}
          listType='picture-card'
          class='avatar-uploader'
          showUploadList={false}
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {imgNode}
        </a-upload>

        {h(UpdateNew)}
      </div >
    )
  }
}

export default UploadDemo
