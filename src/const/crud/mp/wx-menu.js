export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  align: 'center',
  column: [
    {
      label: '主键',
      prop: 'id'
    },
    {
      label: '父ID',
      prop: 'parentId'
    },
    {
      label: '菜单名称',
      prop: 'menuName'
    },
    {
      label: '菜单类型 1文本消息；2图文消息；3网址链接；4小程序',
      prop: 'menuType'
    },
    {
      label: '菜单等级',
      prop: 'menuLevel'
    },
    {
      label: '模板ID',
      prop: 'tplId'
    },
    {
      label: '菜单URL',
      prop: 'menuUrl'
    },
    {
      label: '排序',
      prop: 'menuSort'
    },
    {
      label: '微信账号ID',
      prop: 'wxAccountId'
    },
    {
      label: '小程序appid',
      prop: 'miniprogramAppid'
    },
    {
      label: '小程序页面路径',
      prop: 'miniprogramPagepath'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    },
    {
      label: '更新时间',
      prop: 'updateTime'
    }
  ]
}
