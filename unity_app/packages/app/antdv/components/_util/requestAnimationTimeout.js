import getRequestAnimationFrame, { cancelRequestAnimationFrame as caf } from './getRequestAnimationFrame'
const raf = getRequestAnimationFrame()

export const cancelAnimationTimeout = (frame) => caf(frame.id)

export const requestAnimationTimeout = (callback, delay) => {
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
