log('注册')

const data = {
  code: '000000',
  msg: '注册成功',
  data: {
    cust_no: '3242342424', // 客户号
    self_fnc_acct_no: '3242424', // 自由理财账户
    fnc_trans_acct_no: '3234242424',   // 理财交易账号
  },
}

res.send(data)
