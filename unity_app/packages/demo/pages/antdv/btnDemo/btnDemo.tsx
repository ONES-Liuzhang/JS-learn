import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './btn.module.less'

@Component
class BtnDemo extends Vue {
  private size = 'small'
  private render() {
    return (
      <div class={style.box}>
        <div>
          <a-button
            type="primary"
            onClick={() => {
              this.$message.info('This is a normal messageThis is a normssage')
              this.$message.error('This is a normal messaga normal message')
              this.$message.warn('This is a eThis is a normal message')
              this.$message.success('This is a  normal messageThis is a normal message')

              const hide = this.$message.loading('This is a normal messagesage', 0) as () => void
              setTimeout(hide, 2500)
            }}
          >
            信息提示
          </a-button>
          <a-button>Default</a-button>
          <a-button type="dashed">Dashed</a-button>
          <a-button type="danger">Danger</a-button>
          {/* <a-config-provider :autoInsertSpaceInButton="false"> */}
          <a-button type="primary">按钮</a-button>
          <a-button type="link">Link</a-button>
        </div>
        <div>
          <a-button-group>
            <a-button>Cancel</a-button>
            <a-button type="primary">OK</a-button>
          </a-button-group>
          <a-button-group>
            <a-button disabled>L</a-button>
            <a-button disabled>M</a-button>
            <a-button disabled>R</a-button>
          </a-button-group>
          <a-button-group>
            <a-button type="primary">L</a-button>
            <a-button>M</a-button>
            <a-button>M</a-button>
            <a-button type="dashed">R</a-button>
          </a-button-group>
        </div>

        {/* 幽灵按钮 */}
        <div style={{ background: 'rgb(190, 200, 200)', padding: '16px' }}>
          <a-button type="primary" ghost>
            Primary
          </a-button>
          <a-button ghost>Default</a-button>
          <a-button type="dashed" ghost>
            Dashed
          </a-button>
          <a-button type="danger" ghost>
            Danger
          </a-button>
          <a-button type="link" ghost>
            Link
          </a-button>
        </div>
        {/*  */}
        <div>
          {/* <a-radio-group value={this.size} onChange={() => {}}>
            <a-radio-button value="large">Large</a-radio-button>
            <a-radio-button value="default">Default</a-radio-button>
            <a-radio-button value="small">Small</a-radio-button>
          </a-radio-group> */}
          <a-button type="primary" shape="circle" icon="search"></a-button>
          <a-button type="dashed" shape="circle" icon="search" />
          <a-button type="primary" shape="circle" loading />
          <br />
          <br />
          <a-button type="primary" size={this.size}>
            Primary
          </a-button>
          <a-button size={this.size}>Normal</a-button>
          <a-button type="dashed" size={this.size}>
            Dashed
          </a-button>
          <a-button type="danger" size={this.size}>
            Danger
          </a-button>
          <a-button type="link" size={this.size}>
            Link
          </a-button>
          <br />
          <a-button type="primary" shape="circle" icon="download" size={this.size} />
          <a-button type="primary" shape="round" icon="download" size={this.size}>
            Download
          </a-button>
          <a-button type="primary" icon="download" size={this.size}>
            Download
          </a-button>
          <br />
          <a-button-group size={this.size}>
            <a-button type="primary">
              Backward
            </a-button>
            <a-button type="primary">
              Forward
              {/* <a-icon type="right" />{' '} */}
            </a-button>
          </a-button-group>
        </div>
        <div>
          <a-button type="primary" block>
            Primary
          </a-button>
          <a-button block>Default</a-button>
          <a-button type="dashed" block>
            Dashed
          </a-button>
          <a-button type="danger" block>
            Danger
          </a-button>
          <a-button type="link" block>
            Link
          </a-button>
        </div>
      </div>
    )
  }
  @Emit('test')
  private handlerChangeSize(size: string) {
    console.log(size)
    this.$data.size = size
  }

  @Watch('size')
  private onChangeValue(newVal: string, oldVal: string) {
    console.log(newVal)
  }

  private created() {
    this.$on('test', () => {
      console.log(32423424)
    })
  }
}

export default BtnDemo
