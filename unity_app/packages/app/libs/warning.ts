/* eslint-disable no-undefined */
/* eslint-disable no-console */
let warned = {}

export function warning(valid: any, message: any) {
  // Support uglify
  if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
    console.error(`Warning: ${message}`)
  }
}

export function note(valid: any, message: any) {
  // Support uglify
  if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
    console.warn(`Note: ${message}`)
  }
}

export function resetWarned() {
  warned = {}
}

export function call(method: any, valid: any, message: any) {
  if (!valid && !(warned as any)[message]) {
    method(false, message);
    (warned as any)[message] = true
  }
}

export function warningOnce(valid: any, message: any) {
  call(warning, valid, message)
}

export function noteOnce(valid: any, message: any) {
  call(note, valid, message)
}

export default warningOnce
/* eslint-enable */
