import { Vue } from 'vue-property-decorator'


export default class BaseMixin extends Vue {
  public setState(state: any, callback: any = undefined) {
    const newState = typeof state === 'function' ? state(this.$data, this.$props) : state
    // if (this.getDerivedStateFromProps) {
    //   Object.assign(newState, this.getDerivedStateFromProps(getOptionProps(this), { ...this.$data, ...newState }, true) || {})
    // }
    Object.assign(this.$data, newState)
    Object.assign(this, newState)
    this.$nextTick(() => {
      // eslint-disable-next-line no-unused-expressions
      callback && callback()
    })
  }
  public __emit(..._args: any[]) {
    // 直接调用listeners，底层组件不需要vueTool记录events
    // eslint-disable-next-line prefer-rest-params

    const args = [].slice.call(_args, 0)
    const filterEvent: string | never[] = []
    // eslint-disable-next-line prefer-destructuring
    const eventName = args[0] as never
    if (args.length && this.$listeners[eventName]) {
      if (filterEvent.includes(eventName)) {
        this.$emit(eventName, ...args.slice(1))
      } else {
        (this.$listeners as any)[eventName](...args.slice(1))
      }
    }
  }
}
