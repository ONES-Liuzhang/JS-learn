import antdv from '@/app/antdv'
import Vue from 'vue'

import style from './index.module.less'

import LoginBox from '../components/login-box'
const { Modal } = antdv
let modalInstance: any

function initInstance() {
  const div = document.createElement('div')
  const el = document.createElement('div')
  div.appendChild(el)
  document.body.appendChild(div)

  function render() {
    return new Vue({
      el: el,
      data() {
        return {
          //
          visible: true,
        }
      },
      methods: {
        handleCancel() {
          this.visible = false
        },
      },
      render() {
        // 先解构，避免报错，原因不详
        const cdProps = {
          props: {
            title: () => null,
            footer: null,
            visible: this.visible,
            centered: true,
            width: 300,
          },
          // ...this.confirmDialogProps,
          class: style.box,
        }
        return <Modal {...cdProps} onCancel={this.handleCancel} >
          <LoginBox></LoginBox>
        </Modal>
      },
    })
  }
  let instance = render()

  return {
    show() {
      instance.visible = true
    },
    close() {
      instance.visible = false
    },
    destroy() {
      if (instance && div.parentNode) {
        instance.$destroy()
        modalInstance = null
        div.parentNode.removeChild(div)
      }
    },
  }
}

export function show() {
  const instance: any = modalInstance || (modalInstance = initInstance())
  instance.show()
}

export function close() {
  if (modalInstance) modalInstance.close()
}

export function destroy() {
  if (modalInstance) modalInstance.destroy()
}
