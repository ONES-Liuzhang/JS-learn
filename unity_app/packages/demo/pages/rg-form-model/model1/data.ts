export const fieldList = [

  {
    component_id: '00000003232',
    fild_check: '',
    fild_name: '',
    fild_ename: '',
    fild_type: '',
    fild_dict: '',
    fild_init: '',
    placehold: '',
    fild_logics: JSON.stringify({
      rules: [
        // 获取必输校验
        {
          methods: 'getReqiredRuleObj',
        },
        // 获取最大字符串长度校验
        {
          methods: 'getMaxLengthRuleObj',
          params: 30,
        }
      ]
    })
  }
]
