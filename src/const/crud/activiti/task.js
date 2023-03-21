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
      prop: 'taskId',
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '任务名称',
      prop: 'taskName',
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '提交时间',
      prop: 'time',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm'
    }
  ]
}
export const formOption = {
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      label: '任务编号',
      prop: 'taskId',
      disabled: true
    },
    {
      label: '任务名称',
      prop: 'taskName',
      disabled: true
    },
    {
      label: '申请人',
      prop: 'username',
      disabled: true
    },
    {
      label: '请假时长',
      prop: 'days',
      disabled: true
    },
    {
      label: '请假时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      disabled: true
    },
    {
      label: '提交时间',
      prop: 'time',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      disabled: true
    },
    {
      disabled: true,
      hide: true,
      label: '事由',
      prop: 'content',
      type: 'ueditor',
      component: 'avueUeditor',
      row: true,
      span: 24,
      options: {
        action: '/admin/sys-file/upload',
        props: {
          res: 'data',
          url: 'url'
        }
      }
    },
    {
      label: '批注',
      prop: 'comment',
      type: 'textarea',
      row: true,
      span: 24,
      rules: [{
        required: true,
        message: '请输入备注',
        trigger: 'blur'
      }]
    }
  ]
}

export const taskOption = {
  menu: false,
  page: false,
  addBtn: false,
  align: 'center',
  menuAlign: 'center',
  column: [
    {
      label: 'id',
      prop: 'id',
      hide: true
    },
    {
      label: '用户',
      prop: 'userId'
    },
    {
      label: '批注',
      prop: 'fullMessage'
    }, {
      label: '操作时间',
      prop: 'time',
      type: 'datetime',
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss'
    }
  ]
}
