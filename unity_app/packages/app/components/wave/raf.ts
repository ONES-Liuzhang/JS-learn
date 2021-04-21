import raf from 'raf'

let id: number = 0
const ids: any = {}

// Support call raf with delay specified frame
export default function wrapperRaf(callback: any, delayFrames = 1) {
  const myId: any = id++
  let restFrames = delayFrames

  function internalCallback() {
    restFrames -= 1

    if (restFrames <= 0) {
      callback()
      delete ids[id]
    } else {
      ids[id] = raf(internalCallback)
    }
  }

  ids[id] = raf(internalCallback)

  return myId
}

wrapperRaf.cancel = function (pid: any) {
  raf.cancel(ids[pid])
  delete ids[pid]
}
