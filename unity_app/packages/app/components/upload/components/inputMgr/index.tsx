import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import style from './index.module.less'


/**
 * A valid case-insensitive filename extension, starting with a period (".") character. For example: .jpg, .pdf, or .doc.
A valid MIME type string, with no extensions.
The string audio/* meaning "any audio file".
The string video/* meaning "any video file".
The string image/* meaning "any image file".
 */


@Component({})
export default class InputMgr extends Vue {
  @Prop({ default: false }) multiple!: boolean   // 是否多选
  @Prop({ default: false }) direcotry!: boolean  // 是否选择文件
  @Prop(String) accept?: string   // 能选择的文件类型

  private render(h: CreateElement) {
    const { directory, multiple, accept } = this
    return <div class={style.box} onClick={this.handleClick}>
      <input
        type="file"
        ref="fileInputRef"
        key={this.uid}
        style={{ display: 'none' }}
        accept={accept}
        directory={directory ? 'directory' : null}
        webkitdirectory={directory ? 'webkitdirectory' : null}
        multiple={multiple}
        onChange={this.handleChange}
      />
      {this.$slots.default}
    </div>
  }
  handleChange(e: Event) {

    const { files } = e.target as HTMLInputElement
    if (!files) return
    const file = files[0]
    if (!file) return
    this.$emit('change', file)
  }
  // 点击选择文件
  handleClick() {
    const el = this.$refs.fileInputRef as HTMLInputElement
    el.click()
  }
}
