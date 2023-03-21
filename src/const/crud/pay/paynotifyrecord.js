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
      label: 'ID',
      prop: 'id',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '响应ID',
      prop: 'notifyId'
    },
    {
      label: '订单号',
      prop: 'orderNo',
      search: true
    },
    {
      label: '回调报文',
      prop: 'request',
      overHidden: true,
      type: 'textarea',
      span: 24,
      minRows: 5
    },
    {
      label: '响应报文',
      prop: 'response'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisplay: false,
      overHidden: true,
      addDisplay: false
    }
  ]
}
