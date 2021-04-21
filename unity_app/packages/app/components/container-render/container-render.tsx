import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ContainerRender extends Vue {

  @Prop({ default: true }) public autoMount!: boolean
  @Prop({ default: true }) public autoDestroy!: boolean
  @Prop() public visible!: boolean
  @Prop({ default: false }) public forceRender!: boolean
  @Prop() public parent!: any
  @Prop({ required: true }) public getComponent!: Function
  @Prop({ required: true }) public getContainer!: Function
  @Prop({ required: true }) public children!: Function


  private mounted() {
    if (this.autoMount) {
      (this as any).renderComponent()
    }
  }

  private updated() {
    if (this.autoMount) {
      (this as any).renderComponent()
    }
  }

  private beforeDestroy() {
    if (this.autoDestroy) {
      this.removeContainer()
    }
  }

  private removeContainer() {
    if (this.container) {
      this._component && this._component.$destroy()
      this.container.parentNode.removeChild(this.container)
      this.container = null
      this._component = null
    }
  }

  private renderComponent(props: any = {}, ready: any) {
    const { visible, forceRender, getContainer, parent } = this
    const self = this
    if (visible || parent.$refs._component || forceRender) {
      let el = this.componentEl
      if (!this.container) {
        this.container = getContainer()
        el = document.createElement('div')
        this.componentEl = el
        this.container.appendChild(el)
      }
      if (!this._component) {

        //todo new this.$root.constructor
        // @ts-ignore
        this._component = new this.$root.constructor({
          el: el,
          parent: self,
          data: { comProps: props },
          mounted() {
            this.$nextTick(() => {
              if (ready) {
                ready.call(self)
              }
            })
          },
          updated() {
            this.$nextTick(() => {
              if (ready) {
                ready.call(self)
              }
            })
          },
          render() {
            return self.getComponent(this.comProps)
          },
        })
      } else {
        this._component.comProps = props
      }
    }
  }


  private render() {
    return this.children({
      renderComponent: this.renderComponent,
      removeContainer: this.removeContainer,
    })
  }
}
