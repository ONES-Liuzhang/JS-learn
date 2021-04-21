import { createInstance } from '@/app/components/rg-modal'

import RgBox from './components/rg-box'

let instance: undefined | any


export const show = (data ? : VNodeData) => {
  if (!instance) instance = createInstance({
    // close: false,
    component: RgBox,
    data,
  })
  instance.show(data)
}

export const hide = () => {
  if (instance) instance.hide()
}


export const destroy = () => {
  if (instance) {

    instance.destroy()
    instance = null
  }
}
