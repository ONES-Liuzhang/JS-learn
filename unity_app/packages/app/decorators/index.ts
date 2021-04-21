// decorators.js
import { createDecorator } from 'vue-class-component'


// Declare Log decorator.
export function Log() {
  return createDecorator((componentOptions, key) => {
    const methods = componentOptions.methods
    if (!methods) return
    // Keep the original method for later.
    const originalMethod = methods[key]

    // Wrap the method with the logging logic.
    methods[key] = function wrapperMethod(...args) {
      // Print a log.
      console.log(`调用: ${key}(`, ...args, ')')

      // Invoke the original method.
      originalMethod.apply(this, args)
    }
  })
}
