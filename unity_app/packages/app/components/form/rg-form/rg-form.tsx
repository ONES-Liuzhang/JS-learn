import { Component, Prop, Emit, Vue, Model, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import { noop } from 'lodash'


// keydown
@Component({})
export default class RgForm extends Vue {

  private handleSubmit(e: Event) {
    const { $listeners } = this
    if (!$listeners.submit) {
      e.preventDefault()
    } else {
      this.$emit('submit', e)
    }
  }
  private render(h: CreateElement) {
    const { handleSubmit, $slots, } = this

    return <form onSubmit={handleSubmit} >
      {$slots.default}
    </form>
  }
}

