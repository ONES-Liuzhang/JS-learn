import { Component, Vue, Prop } from 'vue-property-decorator'
import style from './index.module.less'
import { show as maskShow, hide as maskHide } from './rg-mask'

export interface ICreateInstanceArg {
  close?: boolean   // 是否渲染关闭按钮
  component: Component  // 中间的组件
  data?: VNodeData  // 上下文
}

export function createInstance(arg: ICreateInstanceArg) {
  const wrapper = document.createElement('div')
  wrapper.setAttribute('class', style.box)
  wrapper.setAttribute('role', 'modal')

  const wrapperClassList = wrapper.classList
  wrapperClassList.add('dn')
  document.body.append(wrapper)

  const el = document.createElement('div')
  wrapper.append(el)

  const state = Vue.observable({ data: arg.data })

  const Box = arg.component
  const instance = new Vue({
    name: 'model',

    render(h: CreateElement) {
      return <div>
        {arg.close === false ? '' : (
          <a-icon
            class={style.close}
            type='close'
            onClick={hide}></a-icon>)}
        {h(Box, {
          ...state.data,
          on: {
            ...state.data!.on,
            close: hide,
          }

        })}
      </div>
    }
  })
  instance.$mount(el)

  function show(props?: VNodeData) {
    maskShow()
    wrapperClassList.remove('dn')
    setTimeout(() => {
      wrapper.classList.add(style.show)
    }, 0)
    state.data = props
  }

  function hide() {
    maskHide()
    wrapper.classList.remove(style.show)
    setTimeout(() => {
      wrapperClassList.add('dn')
    }, 300)
  }
  return {
    show,
    hide,
    destroy() {
      instance.$destroy()
      wrapper.remove()
    }
  }
}


