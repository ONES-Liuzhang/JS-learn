import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './divider.module.less'
@Component
class DividerDemo extends Vue {
  private render() {
    return (
      <div class={style.box}>
        <div class="block">
          Text
          <a-divider type="vertical" />
          <a href="#">Link</a>
          <a-divider type="vertical" />
          <a href="#">Link</a>
        </div>
        <div class="block">
          <p>Lorem ipsum dolor sit amet, dicta? Refert tamen, quo modo.</p>
          <a-divider />
          <p>Lorem ipsum dolorquae sunt a te dicta? Refert tamen, quo modo.</p>
          <a-divider>With Text</a-divider>
          <p>Lorem ipsum dolor sit ameta? Refert tamen, quo modo.</p>
          <a-divider dashed />
          <p>Lorem ipsum dolor sit amet, consedicta? Refert tamen, quo modo.</p>
        </div>
        <div class="block">
          <a-divider orientation="left">Left Text</a-divider>
          <p>Lorem ipsum dolor sit amet, coe sunt a te dicta? Refert tamen, quo modo.</p>
          <a-divider orientation="right">Right Text</a-divider>
          <p>Lorem ipsum dolor sit amet, coe dicta? Refert tamen, quo modo.</p>
        </div>
      </div>
    )
  }
}

export default DividerDemo
