import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
@Component
class ModalDemo extends Vue {
  private visible: boolean = false
  private confirmLoading: boolean = false
  private showModal() {
    this.visible = true
  }
  private handleOk() {
    this.ModalText = 'The modal will be closed after two seconds'
    this.confirmLoading = true
    setTimeout(() => {
      this.visible = false
      this.confirmLoading = false
    }, 2000)
  }
  private handleCancel() {
    console.log('Clicked cancel button')
    this.visible = false
  }
  private render() {
    return (
      <div class={style.box}>
        {/* <div class="block">
          <a-button type="primary" onClick={this.showModal}>
            点击显示模板
          </a-button>
          <a-modal
            title="模板"
            visible={this.visible}
            onOk={this.handleOk}
            confirmLoading={this.confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>模板内容</p>
          </a-modal>
        </div> */}
        <div class="block">
          <a-button type="primary" onClick={this.showModal}>
            Open Modal
          </a-button>
          <a-modal
            width={600}
            title="Basic Modal"
            v-model={this.visible}
            okButtonProps={{ props: { disabled: true } }}
            onOk={this.handleOk}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </a-modal>
        </div>
        <div class="block">
          <a-button
            onClick={() =>
              this.$confirm({
                type: 'info',
                // type: 'warning',
                // type: 'success',
                // type: 'error',
                // icon: 'search',  // 指定自定义icon
                title: 'Do you want delete these items?',
                content: 'When clicked the OK button, this dialog will be closed after 1 second',
                onOk() {
                  return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
                  }).catch(() => console.log('Oops errors!'))
                },
                onCancel() {},
              })
            }
          >
            Confirm
          </a-button>
        </div>
        <div class="block">
          <a-button
            onClick={() => {
              for (let i = 0; i < 3; i += 1) {
                setTimeout(() => {
                  this.$confirm({
                    content: 'destroy all',
                    onOk() {
                      return new Promise((resolve, reject) => {
                        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
                      }).catch(() => console.log('Oops errors!'))
                    },
                    cancelText: 'Click to destroy all',
                    onCancel: () => {
                      this.$destroyAll()
                    },
                  })
                }, i * 500)
              }
            }}
          >
            Confirm
          </a-button>
        </div>
      </div>
    )
  }
}

export default ModalDemo
