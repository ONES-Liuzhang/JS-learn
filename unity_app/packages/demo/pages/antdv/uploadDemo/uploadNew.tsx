import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './upload.module.less'
import { CreateElement } from 'vue'

@Component
class UploadDemo extends Vue {
  private previewVisible = false
  private previewImage = ''
  private fileList = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]

  private handleCancel() {
    this.previewVisible = false
  }
  private handlePreview(file: { url: any; thumbUrl: any }) {
    this.previewImage = file.url || file.thumbUrl
    this.previewVisible = true
  }
  private handleChange({ fileList }: any) {
    this.fileList = fileList
  }
  private render(h: CreateElement) {
    return (
      <div class={style.box}>
        <div class="clearfix">
          <a-upload
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            listType='picture-card'
            fileList={this.fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            <div>
              <a-icon type='plus' />
              <div class="an-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal visible={this.previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style="width: 100%" src={this.previewImage} />
          </a-modal>
        </div>
      </div >
    )
  }
}

export default UploadDemo
