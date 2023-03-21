export const tableOption = {
  'border': true,
  'index': true,
  'indexLabel': '序号',
  'stripe': true,
  'menuAlign': 'center',
  'align': 'center',
  'searchMenuSpan': 6,
  'column': [{
    fixed: true, label: 'id', prop: 'userId', span: 24, hide: true, editDisplay: false, addDisplay: false
  }, {
    'type': 'input', 'label': '用户名', 'prop': 'username', 'span': 12, search: true, rules: [{
      required: true, message: '请输入用户名'
    }, {
      min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'
    }]
  },
    {
      label: '密码',
      prop: 'password',
      type: 'password',
      hide: true,
      span: 12,
      rules: [{
        min: 6,
        max: 20,
        required: true,
        message: '长度在 6 到 20 个字符',
        trigger: 'blur'
      }]
    }, {
      'type': 'input', 'label': '手机号', 'prop': 'phone', 'span': 12, rules: [{
        min: 11, max: 11, required: true, message: '长度在 11 个字符', trigger: 'blur'
      }]
    }, {
      'type': 'input', 'label': '昵称', 'prop': 'nickname', 'span': 12
    }, {
      'type': 'input', 'label': '姓名', 'prop': 'name', 'span': 12, rules: [{
        min: 2, max: 64, required: true, message: '请输入姓名', trigger: 'blur'
      }]
    }, {
      'type': 'input', 'label': '邮箱', 'prop': 'email', 'span': 12
    },
    {
      label: '状态',
      prop: 'lockFlag',
      type: 'radio',
      slot: true,
      border: true,
      span: 12,
      rules: [{
        required: true,
        message: '请选择状态',
        trigger: 'blur'
      }],
      value: '0',
      dicData: [{
        label: '有效',
        value: '0'
      }, {
        label: '锁定',
        value: '9'
      }]
    },
    {
      label: '角色',
      prop: 'role',
      formslot: true,
      slot: true,
      overHidden: true,
      span: 12,
      rules: [{
        required: true,
        message: '请选择角色',
        trigger: 'blur'
      }]
    },
    {
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisabled: true,
      addDisplay: false,
      span: 12
    }
  ]
}
