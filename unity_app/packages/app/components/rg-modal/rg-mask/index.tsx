
import { createInstance } from './createInstance'



let bodyInstance: any

export const show = () => {
  if (!bodyInstance) bodyInstance = createInstance({ target: document.body })
  bodyInstance.show()
}


export const hide = () => {
  if (bodyInstance) bodyInstance.hide()
}

export const destroy = () => {
  if (bodyInstance) bodyInstance.destory()
}


export * from './createInstance'
