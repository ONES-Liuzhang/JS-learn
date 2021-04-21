const START_EVENT_NAME_MAP = {
  transitionstart: {
    transition: 'transitionstart',
    WebkitTransition: 'webkitTransitionStart',
    MozTransition: 'mozTransitionStart',
    OTransition: 'oTransitionStart',
    msTransition: 'MSTransitionStart',
  },

  animationstart: {
    animation: 'animationstart',
    WebkitAnimation: 'webkitAnimationStart',
    MozAnimation: 'mozAnimationStart',
    OAnimation: 'oAnimationStart',
    msAnimation: 'MSAnimationStart',
  },
}

const END_EVENT_NAME_MAP = {
  transitionend: {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'mozTransitionEnd',
    OTransition: 'oTransitionEnd',
    msTransition: 'MSTransitionEnd',
  },

  animationend: {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'MSAnimationEnd',
  },
}

const startEvents: any = []
const endEvents: any = []

function detectEvents() {
  const testEl = document.createElement('div')
  const { style } = testEl

  if (!('AnimationEvent' in window)) {
    delete START_EVENT_NAME_MAP.animationstart.animation
    delete END_EVENT_NAME_MAP.animationend.animation
  }

  if (!('TransitionEvent' in window)) {
    delete START_EVENT_NAME_MAP.transitionstart.transition
    delete END_EVENT_NAME_MAP.transitionend.transition
  }

  function process(EVENT_NAME_MAP: any, events: any) {
    for (const baseEventName in EVENT_NAME_MAP) {
      if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
        const baseEvents = EVENT_NAME_MAP[baseEventName]
        for (const styleName in baseEvents) {
          if (styleName in style) {
            events.push(baseEvents[styleName])
            break
          }
        }
      }
    }
  }

  process(START_EVENT_NAME_MAP, startEvents)
  process(END_EVENT_NAME_MAP, endEvents)
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  detectEvents()
}

function addEventListener(node: any, eventName: any, eventListener: any) {
  node.addEventListener(eventName, eventListener, false)
}

function removeEventListener(node: any, eventName: any, eventListener: any) {
  node.removeEventListener(eventName, eventListener, false)
}

const TransitionEvents = {
  // Start events
  startEvents,

  addStartEventListener(node: any, eventListener: any) {
    if (startEvents.length === 0) {
      window.setTimeout(eventListener, 0)
      return
    }
    startEvents.forEach((startEvent: any) => {
      addEventListener(node, startEvent, eventListener)
    })
  },

  removeStartEventListener(node: any, eventListener: any) {
    if (startEvents.length === 0) {
      return
    }
    startEvents.forEach((startEvent: any) => {
      removeEventListener(node, startEvent, eventListener)
    })
  },

  // End events
  endEvents,

  addEndEventListener(node: any, eventListener: any) {
    if (endEvents.length === 0) {
      window.setTimeout(eventListener, 0)
      return
    }
    endEvents.forEach((endEvent: any) => {
      addEventListener(node, endEvent, eventListener)
    })
  },

  removeEndEventListener(node: any, eventListener: any) {
    if (endEvents.length === 0) {
      return
    }
    endEvents.forEach((endEvent: any) => {
      removeEventListener(node, endEvent, eventListener)
    })
  },
}

export default TransitionEvents
