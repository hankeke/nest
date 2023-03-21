export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  viewBtn: true,
  addBtn: false,
  editBtn: true,
  align: 'center',
  searchMenuSpan: 6,
  column: [
    {
      label: '主键',
      prop: 'id',
      hide: false,
      editDisplay: false,
      addDisplay: false
    },
    {
      label: '公众号',
      prop: 'wxAccountName',
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '公众号',
      prop: 'wxAccountAppid',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '用户标识',
      prop: 'openid',
      overHidden: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '昵称',
      prop: 'nickname',
      overHidden: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '备注',
      prop: 'remark',
      overHidden: true
    },
    {
      label: '分组',
      prop: 'tagIds',
      width: 200,
      overHidden: true,
      formslot: true,
      slot: true,
      props: {
        label: 'tag',
        value: 'tagId'
      }
    },
    {
      label: '语言',
      prop: 'language',
      hide: true,
      editDisplay: false,
      addDisplay: false
    },
    {
      label: '订阅状态',
      prop: 'subscribeStatus',
      type: 'select',
      dicUrl: '/admin/dict/type/subscribe',
      editDisplay: false,
      addDisplay: false
    },
    {
      label: '订阅时间',
      prop: 'subscribeTime',
      editDisplay: false,
      addDisplay: false
    }
  ]
}
