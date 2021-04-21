import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './radio.module.less'
@Component
class PaginationDemo extends Vue {
  private render() {
    return (
      <div class={style.box}>
        <div>
          <a-radio-group defaultValue="a" size="large">
            <a-radio-button value="a">Hangzhou</a-radio-button>
            <a-radio-button value="b">Shanghai</a-radio-button>
            <a-radio-button value="c">Beijing</a-radio-button>
            <a-radio-button value="d">Chengdu</a-radio-button>
          </a-radio-group>
        </div>
        <div>
          <a-radio-group defaultValue="a">
            <a-radio-button value="a">Hangzhou</a-radio-button>
            <a-radio-button value="b">Shanghai</a-radio-button>
            <a-radio-button value="c">Beijing</a-radio-button>
            <a-radio-button value="d">Chengdu</a-radio-button>
          </a-radio-group>
        </div>
        <div>
          <a-radio-group defaultValue="a" size="small">
            <a-radio-button value="a">Hangzhou</a-radio-button>
            <a-radio-button value="b">Shanghai</a-radio-button>
            <a-radio-button value="c">Beijing</a-radio-button>
            <a-radio-button value="d">Chengdu</a-radio-button>
          </a-radio-group>
        </div>

        <a-radio-group name="radioGroup" defaultValue="1">
          <div>111</div>
          <a-radio value="1">A</a-radio>
          <a-radio value="2">B</a-radio>
          <a-radio value="3">C</a-radio>
          <a-radio value="4">D</a-radio>
        </a-radio-group>
      </div>
    )
  }
}

export default PaginationDemo
