

import { CreateElement } from 'vue'
import style from './index.module.less'
export default {
  name: 'RgFormItem',
  functional: true,
  render(h: CreateElement, context: any) {
    if (context.props.label) {
      context.props.labelCol = { span: 8 }
      context.props.wrapperCol = { span: 12 }
      return <a-form-item class={style.box} {...context}>{context.children}</a-form-item>

    }
    return <a-row>
      <a-col span={8}></a-col>
      <a-col span={12}>{context.children}</a-col>
    </a-row >
  },
} as any

