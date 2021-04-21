import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'
import { RgCheckbox, RgCheckboxGroup } from '@/app/components/checkbox/rg-checkbox'

@Component
export default class CheckBoxDemo extends Vue {
  private created() { }

  private onChange(checkedValues: any) {
    console.log('checked = ', checkedValues)

  }
  public render(h: CreateElement) {
    return (<div>
      <div class="block">
        <RgCheckbox onChange={this.onChange}>Checkbox</RgCheckbox>
      </div>
      <div class="block">
        <RgCheckboxGroup onChange={this.onChange}>
          <RgCheckbox value="A">A</RgCheckbox>
          <RgCheckbox value="B">B</RgCheckbox>
          <RgCheckbox value="C">C</RgCheckbox>
          <RgCheckbox value="D">D</RgCheckbox>
          <RgCheckbox value="E">E</RgCheckbox>
        </RgCheckboxGroup>
      </div>
    </div >)
  }
}
