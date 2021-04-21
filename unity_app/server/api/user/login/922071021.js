log('登录')

const data = {
  code: '0000',
  msg: '登录成功',
  data: {
    userid: 'userid', // 用户号
    username: 'rogen', // 用户名称
    usertype: '324242',   // 用户类型 ???????
    cust_no: '2342423424', // 客户号
    cust_type: '3242424', // 客户角色
    cust_name: '色入22', // 客户名称  
    mobileno: '183384343',  // 用户手机号码
    id_code: '32',  // 机构证件号码, 
    id_type: '',   // 机构整机类型
    organ_type: '3232',  // 用户角色
    cust_trade_type: '', // 客户行业
    agent_id_code: '342',
    agent_id_type: '', // 
  },
}

res.send(data)
