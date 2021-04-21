import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.less'


import { fieldList } from './data'

import FormItem from './components/form-item'
import FieldItem from './components/field-item'



@Component({})
export default class BaseUse extends Vue {
  private created() {
    console.log(fieldList)
    let renderList = []
    this.getFieldData().then(list => {
      fieldList.forEach(field => {

        renderList.push(this.parseFieldItem(field))
      })


    })
  }


  private getFieldData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(fieldList)
      }, 100)

    }).catch(err => {

    })

  }
  private parseFieldItem(field: any) {
    let tempMap = {
      label: '',

    }
    return tempMap
  }
  private render(h: CreateElement) {

    return (
      <div class={style.box}>
        <div class='title-bar'>Mode</div>

      </div >
    )
  }
}



