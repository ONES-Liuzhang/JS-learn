// import { Component, Prop, Emit, Vue, Model, Watch } from 'vue-property-decorator'

import { hasProp } from '@/app/libs/props-util'
import AsyncValidator from 'async-validator'

import { noop } from 'lodash'

interface IRuleProps {
  readonly rules ? : RuleItem[] // 校验rule
  readonly validateStatus ? : string // 校验状态
}


let i = 1

export const ruleProps = {
  rules: { type: Array, },
  ruleStatus: {
    type: Object,
    default: () => ({ msg: '', state: '' })
  }
}

// 校验项目的混合
export const itemRuleMixin: ComponentOptions = {
  props: {
    ...ruleProps
  },
  data() {
    if (hasProp(this, 'rules')) {
      return { __ruleStatus: this.ruleStatus, }
    }
    // return {}
  },
  inject: {
    collectField: { default: () => noop },
  },
  created() {
    if (hasProp(this, 'rules')) {
      this.ruleKey = this.$attrs.ruleKey || `field${i++}`
      this.$watch('rules', (rules: RuleItem[]) => {
        this.validate()
      })
      this.$watch('stateValue', (value: any) => {
        this.validate(value)
      })

      this.collectField(this)
      this.$once('hooks:beforeDestory', () => { this.collectField(this, 'delete') })
    }
  },
  methods: {
    // 校验
    validate() {
      const { rules } = this
      const value = this.stateValue
      const key = this.k || 'key'
      const validator = new AsyncValidator({
        [key]: rules
      })
      validator.validate(this, {
        [key]: value
      }).then((errs: any) => {
        this.setValidateState(errs && errs[0])
      })
    },

    // 设置校验状态
    setValidateState(err: any) {
      if (err) {
        this.validateStatus = 'error'
        this.help = err.message
      } else {
        this.validateStatus = ''
        this.help = ''
      }
    }
    // renderValidateContent(h, children) {
    //   // eslint-disable-next-line no-undefined
    //   if (this.validateStatus === undefined) {
    //     return children
    //   }
    //   return <a - tooltip
    //   placement = "topLeft"
    //   title = { this.help }
    //   autoAdjustOverflow = { false }
    //   arrowPointAtCenter
    //     >
    //     { children } < /a-tooltip>
    // },
  },
}
// /// /////////////////////////////////////////////////////////////////////

// // 
// export const wrapperRuleMixin = {
//   provide() {
//     return {
//       // 收集域
//       collectField: (c, type = 'add') => {
//         const fieldMap = this.fieldMap || (this.fieldMap = {})
//         const key = c.k
//         const item = fieldMap[key]
//         if (type === 'delete' && item) {
//           delete fieldMap[key]
//         } else if (type === 'add' && !item) {
//           fieldMap[key] = c
//         }
//       },
//     }
//   },
//   mounted() {
//     console.log(this.fieldMap);

//   },
//   methods: {
//     // 整个表单字段的验证
//     validate() {
//       const fieldMap = this.fieldMap
//       if (!fieldMap) return true
//       let keys = Object.keys(fieldMap)
//       if (keys.length === 0) return true

//       const descriptor = {}
//       const data = {}
//       keys.forEach((key) => {
//         const field = fieldMap[key]
//         const { getFieldValue, rules } = field
//         descriptor[key] = rules
//         data[key] = getFieldValue()
//       })
//       const validator = new AsyncValidator(descriptor)
//       validator.validate(data, (errors) => {
//         if (errors) {
//           let errorsMap = errors.reduce((sum, err) => {
//             sum[err.field] = err
//             return sum
//           }, {})
//           keys.forEach(key => {
//             setFieldValidateState(fieldMap[key], errorsMap[key])
//           })
//         } else {
//           keys.forEach(key => setFieldValidateState(fieldMap[key], null))
//         }
//       })
//     },
//   },

// }


// function setFieldValidateState(filed, err) {
//   if (err) {
//     filed.validateStatus = 'error'
//     filed.help = err.message
//   } else {
//     filed.validateStatus = ''
//     filed.help = ''
//   }
// }


// 设置域的状态
function setFieldValidateState(filed: any, err ? : any) {
  if (err) {
    filed.validateStatus = 'error'
    filed.help = err.message
  } else {
    filed.validateStatus = ''
    filed.help = ''
  }
}
