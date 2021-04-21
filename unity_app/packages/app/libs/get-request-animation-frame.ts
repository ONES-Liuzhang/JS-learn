/* eslint-disable prefer-destructuring */
const availablePrefixs = ['moz', 'ms', 'webkit'];

function requestAnimationFramePolyfill() {
  let lastTime = 0;
  return function(callback: any) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

export default function getRequestAnimationFrame() {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line no-empty-function
    return () => {};
  }
  if (window.requestAnimationFrame) {
    // https://github.com/vuejs/vue/issues/4465
    return window.requestAnimationFrame.bind(window);
  }

  const prefix = availablePrefixs.filter(key => `${key}RequestAnimationFrame` in window)[0];

  return prefix
    ? (window as any)[`${prefix}RequestAnimationFrame`]
    : requestAnimationFramePolyfill();
}

export const cancelRequestAnimationFrame = (id: number) => {
  if (typeof window === 'undefined') {
    return null;
  }
  if (window.cancelAnimationFrame) {
    return window.cancelAnimationFrame(id);
  }
  const prefix = availablePrefixs.filter(
    key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window,
  )[0];

  // @ts-ignore
  // let that = this;

  // return prefix
  //   ? (
  //       (window as any)[`${prefix}CancelAnimationFrame`] ||
  //       (window as any)[`${prefix}CancelRequestAnimationFrame`]
  //     ).call(that, id)
  //   : clearTimeout(id);
};
