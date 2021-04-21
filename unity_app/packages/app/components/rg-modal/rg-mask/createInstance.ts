import style from './index.module.less'


export const createInstance = (props: { target: HTMLElement }) => {

  let el = document.createElement('div')
  props.target.append(el)
  el.setAttribute('role', 'mask')
  // el.setAttribute('title', '点击可以关闭蒙版')


  const state = {
    visible: false
  }

  el.setAttribute('class', style.box)

  // el.addEventListener('click', () => {
  //   hide()
  // })
  const elStyle = el.style

  function show() {
    elStyle.display = 'block'
    state.visible = true
    setTimeout(() => {
      elStyle.opacity = '1'
    }, 0)
  }

  function hide() {
    elStyle.opacity = '0'
    state.visible = false
    setTimeout(() => {
      elStyle.display = 'none'
    }, 300)
  }

  return {
    show,
    hide,
    isShow() {
      return state.visible
    },
    destroy() {
      el.remove();
      (el as any) = null
    }
  }
}
