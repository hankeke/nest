export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 150,
  menuBtn: true,
  align: 'center',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  menuType: 'menu',
  searchMenuSpan: 6,
  column: [{
    fixed: true,
    label: '流程ID',
    prop: 'processonDefinitionId'
  }, {
    fixed: true,
    label: '模型标识',
    prop: 'key',
    editDisabled: true
  }, {
    label: '流程分类',
    prop: 'category',
    search: true
  }, {
    label: '模型名称',
    prop: 'name'
  }, {
    label: '版本号',
    prop: 'revision',
    editDisabled: true,
    addDisplay: false
  }, {
    label: '部署时间',
    prop: 'deploymentTime',
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'timestamp',
    editDisabled: true,
    addDisplay: false
  }]
}
