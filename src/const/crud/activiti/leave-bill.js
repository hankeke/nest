export const tableOption = {
  border: true,
  index: true,
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuBtn: true,
  editBtn: false,
  delBtn: false,
  addBtn: false,
  searchMenuSpan: 6,
  menuType: 'menu',
  column: [
    {
      label: 'ID',
      prop: 'leaveId',
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '申请人',
      prop: 'username',
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '天数',
      prop: 'days',
      type: 'number'
    },
    {
      label: '请假时间',
      prop: 'leaveTime',
      type: 'datetime',
      overHidden: true,
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd hh:mm:ss'
    },
    {
      label: '提交时间',
      prop: 'createTime',
      type: 'datetime',
      overHidden: true,
      format: 'yyyy-MM-dd HH:mm',
      editDisabled: true,
      addDisplay: false,
      hide: true
    },
    {
      label: '状态',
      prop: 'state',
      type: 'select',
      dicUrl: '/admin/dict/type/leave_status',
      search: true,
      addDisplay: false
    },
    {
      hide: true,
      label: '备注',
      prop: 'content',
      type: 'ueditor',
      component: 'avueUeditor',
      span: 24,
      options: {
        action: '/admin/sys-file/upload',
        props: {
          res: 'data',
          url: 'url'
        }
      }
    }
  ]
}
