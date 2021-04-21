import getRequestAnimationFrame, { cancelRequestAnimationFrame as caf } from './get-request-animation-frame'
const raf = getRequestAnimationFrame()

export const cancelAnimationTimeout = (frame: any) => caf(frame.id)

export const requestAnimationTimeout = (callback: any, delay: any) => {
  const start = Date.now()
  const frame = { id: raf(timeout) }

  function timeout() {
    if (Date.now() - start >= delay) {
      callback.call()
    } else {
      frame.id = raf(timeout)
    }
  }

  return frame
}
