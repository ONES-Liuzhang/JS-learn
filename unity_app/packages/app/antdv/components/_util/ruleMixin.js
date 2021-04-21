
import AsyncValidator from 'async-validator'

const noop = () => { }

function inputRuleSetting(vm) {
  vm.$watch('rules', (rules) => {
    vm.validate(vm.stateValue)
  })
  vm.$watch('stateValue', (value) => {
    vm.validate(value)
  })
  vm.getFieldValue = () => {
    return vm.stateValue
  }
}

function selectRuleSetting(vm) {
  vm.$watch('rules', (rules) => {
    vm.validate(vm.value)
  })
  vm.__value = vm.value || vm.defaultValue || ''
  const fn = (value) => {
    vm.__value = value
    vm.validate(value)
  }
  vm.ruleListeners = {}
  // 监听值变化
  if (vm.$listeners.change) {
    vm.ruleListeners.change = [vm.$listeners.change, fn]
  } else {
    vm.ruleListeners.change = fn
  }
  vm.getFieldValue = () => {
    return vm.__value
  }
}

let i = 0

// 域混合
export const fieldMixin = {
  props: {
    k: { type: String, default: () => `field${i++}` },
    rules: { type: Array },
  },
  data() {
    if (this.rules) {
      return {
        validateStatus: '', // 校验状态
        help: '',  // 提示信息 
      }
    }
    return {}
  },
  inject: {
    // 注入收集依赖
    collectField: { default: () => noop },
  },
  created() {
    if (this.rules) {
      const tag = this.$options._componentTag
      if (tag === 'a-input') {
        inputRuleSetting(this)
      } else if (tag === 'a-select') {
        selectRuleSetting(this)
      }
      // 表单域收集
      this.collectField(this)
    }
  },
  methods: {
    // 校验
    validate() {
      const { rules } = this
      const value = this.getFieldValue()
      const key = this.k || 'key'
      const validator = new AsyncValidator({ [key]: rules })
      validator.validate({ [key]: value }, (errors) => {
        setFieldValidateState(this, errors && errors[0])

      })
    },
    renderValidateContent(h, children) {
      // eslint-disable-next-line no-undefined
      if (this.validateStatus === undefined) {
        return children
      }
      return <a-tooltip
        placement="topLeft"
        title={this.help}
        autoAdjustOverflow={false}
        arrowPointAtCenter
      >{children}</a-tooltip>
    },
  },
  beforeDestory() {
    this.collectField(this, 'delete')
  },
}
/// /////////////////////////////////////////////////////////////////////
// 表单混合
export const formMixin = {
  provide() {
    return {
      // 收集域
      collectField: (c, type = 'add') => {
        const fieldMap = this.fieldMap || (this.fieldMap = {})
        const key = c.k
        const item = fieldMap[key]
        if (type === 'delete' && item) {
          delete fieldMap[key]
        } else if (type === 'add' && !item) {
          fieldMap[key] = c
        }
      },
    }
  },
  mounted() {
    console.log(this.fieldMap);

  },
  methods: {
    // 整个表单字段的验证
    validate() {
      const fieldMap = this.fieldMap
      if (!fieldMap) return true
      let keys = Object.keys(fieldMap)
      if (keys.length === 0) return true

      const descriptor = {}
      const data = {}
      keys.forEach((key) => {
        const field = fieldMap[key]
        const { getFieldValue, rules } = field
        descriptor[key] = rules
        data[key] = getFieldValue()
      })
      const validator = new AsyncValidator(descriptor)
      validator.validate(data, (errors) => {
        if (errors) {
          let errorsMap = errors.reduce((sum, err) => {
            sum[err.field] = err
            return sum
          }, {})
          keys.forEach(key => {
            setFieldValidateState(fieldMap[key], errorsMap[key])
          })
        } else {
          keys.forEach(key => setFieldValidateState(fieldMap[key], null))
        }
      })
    },
  },

}


function setFieldValidateState(filed, err) {
  if (err) {
    filed.validateStatus = 'error'
    filed.help = err.message
  } else {
    filed.validateStatus = ''
    filed.help = ''
  }
}
