log('机构注册审批进度信息查询')

const data = {
  code: '000000',
  msg: '成功',
  data: {
    reg_check_flag: '1', // 复核状态
    logid: '3243242234', // 记录编号
    office_tel: '18565759087',   // 经办人电话
    chk_flag: '1', // 审批操作标志
    recheck_remark: '我的审批意见为同意',  // 审批意见
    last_reg_time: '20190303',  // 操作时间
    cust_name: 'rogen', // 客户名称
    cust_type: '', // 客户角色
    instrepr_name: '',  // 法人名称
    instrepr_id_type: '33333',  // 法人证件类型
    instrepr_id_code: '3333333333333', // 法人证件号码
    id_code: '2423424',  // 组织机构代码/统一社会信用代码
    org_id_code: '324242',  // 组织机构代码

  },
}

res.send(data)
