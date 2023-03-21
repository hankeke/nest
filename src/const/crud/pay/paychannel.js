export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  viewBtn: true,
  searchMenuSpan: 6,
  column: [
    {
      label: '主键',
      prop: 'id',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: 'appId',
      prop: 'appId',
      rules: [{
        required: true,
        message: '请输入应用标识',
        trigger: 'blur'
      }]
    },
    {
      label: '支付类型',
      prop: 'channelId',
      type: 'select',
      dicUrl: '/admin/dict/type/channel_id',
      search: true,
      rules: [{
        required: true,
        message: '请选择支付类型',
        trigger: 'blur'
      }]
    },
    {
      label: '渠道名称',
      prop: 'channelName',
      rules: [{
        required: true,
        message: '请输入渠道名称',
        trigger: 'blur'
      }]
    },
    {
      label: '商户号',
      prop: 'channelMchId',
      placeholder: '渠道商户号',
      rules: [{
        required: true,
        message: '请输入商户编号',
        trigger: 'blur'
      }]
    },
    {
      label: '渠道状态',
      prop: 'state',
      type: 'select',
      dicUrl: '/admin/dict/type/channel_status',
      search: true
    },
    {
      label: '前端回调地址',
      prop: 'returnUrl'
    }, {
      label: '后端回调域名',
      prop: 'notifyUrl'
    }, {
      label: '备注',
      prop: 'remark'
    },
    {
      label: '配置参数',
      prop: 'param',
      type: 'textarea',
      placeholder: '扩展参数,json字符串',
      minRows: 4,
      row: true,
      span: 24,
      overHidden: true,
      rules: [{
        required: true,
        message: '请输入支付参数',
        trigger: 'blur'
      }]
    },
    {
      width: 150,
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisplay: false,
      addDisplay: false
    }
  ]
}
