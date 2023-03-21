export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  viewBtn: false,
  addBtn: false,
  editBtn: false,
  searchMenuSpan: 6,
  column: [
    {
      label: '用户ID',
      prop: 'userId',
      align: 'center'
    },
    {
      label: '用户名',
      prop: 'username',
      align: 'center',
      search: true
    },
    {
      label: '客户端',
      prop: 'clientId',
      align: 'center'
    },
    {
      label: '令牌',
      prop: 'accessToken',
      align: 'center',
      overHidden: true
    },
    {
      label: '过期时间',
      prop: 'expiresAt',
      align: 'center'
    }
  ]
}
