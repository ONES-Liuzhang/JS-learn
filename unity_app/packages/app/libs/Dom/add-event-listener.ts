// @ts-ignore
import addDOMEventListener from 'add-dom-event-listener'

export default function addEventListenerWrap(target: any, eventType: any, cb: any, option: any = undefined) {
  return addDOMEventListener(target, eventType, cb, option)
}
