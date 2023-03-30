export const tableOption = {
  selection: true,
  reserveSelection: true,
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 150,
  align: 'center',
  refreshBtn: true,
  showClomnuBtn: false,
  searchSize: 'mini',
  searchMenuSpan: 6,
  addBtn: false,
  editBtn: false,
  viewBtn: true,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '类型',
    prop: 'logType',
    type: 'select',
    dicUrl: '/admin/dict/type/log_type',
    search: true
  }, {
    label: '标题',
    prop: 'title'
  }, {
    label: 'IP地址',
    prop: 'remoteAddr'
  }, {
    label: '请求方式',
    prop: 'method'
  }, {
    label: '客户端',
    prop: 'serviceId'
  }, {
    width: 80,
    label: '请求时间',
    prop: 'time'
  }, {
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    search: true,
    searchRange: true
  }]
}
