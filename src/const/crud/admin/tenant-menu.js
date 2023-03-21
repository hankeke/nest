export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  searchMenuSpan: 6,
  column: [
    {
      type: 'input',
      label: '租户套餐名称',
      prop: 'name',
      span: 12,
      rules: [{
        min: 2,
        max: 64,
        required: true,
        message: '请输入租户套餐名称',
        trigger: 'blur'
      }]
    },
    {
      type: 'radio',
      label: '状态',
      prop: 'status',
      dicUrl: '/admin/dict/type/status_type',
      span: 12,
      value: '0'
    },
    {
      label: '',
      prop: 'menuTree',
      formslot: true,
      showClomnu: false,
      hide: true
    },
    {
      type: 'input',
      label: '创建时间',
      prop: 'createTime',
      span: 12,
      editDisabled: true,
      addDisplay: false,
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  ]
}
