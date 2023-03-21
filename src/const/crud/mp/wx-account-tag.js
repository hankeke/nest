export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  viewBtn: true,
  align: 'center',
  searchMenuSpan: 6,
  column: [
    {
      label: '主键',
      prop: 'id',
      hide: true,
      display: false
    },
    {
      label: '标签名称',
      prop: 'tag',
      rules: [{
        min: 1,
        max: 30,
        message: '请输入标签名称',
        trigger: 'blur'
      }]
    },
    {
      label: '标签ID',
      prop: 'tagId',
      editDisabled: true,
      addDisplay: false
    },
    {
      label: 'APPID',
      prop: 'wxAccountAppid',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '创建时间',
      prop: 'createTime',
      editDisabled: true,
      addDisplay: false
    }
  ]
}
