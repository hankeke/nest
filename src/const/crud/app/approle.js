import {rule} from '@/util/validateRules'

export const tableOption = {
  'border': true,
  'index': true,
  'indexLabel': '序号',
  'stripe': true,
  'menuAlign': 'center',
  'align': 'center',
  'searchMenuSpan': 6,
  'column': [
    {
      'type': 'input',
      'label': '角色名称',
      'prop': 'roleName',
      search: true,
      rules: [
        {required: true, message: '角色名称不能为空', trigger: 'blur'},
        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
      ],
      'span': 12
    },
    {
      'type': 'input',
      'label': '角色标识',
      'prop': 'roleCode',
      rules: [
        {required: true, message: '角色标识不能为空', trigger: 'blur'},
        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'},
        {validator: rule.validatorKey, trigger: 'blur'}
        // { validator: validateRoleCode, trigger: 'blur' }
      ],
      'span': 12
    },
    {
      'type': 'input',
      'label': '角色描述',
      'prop': 'roleDesc',
      'span': 12,
      rules: [
        {max: 128, message: '长度在 128 个字符内', trigger: 'blur'}
      ]
    },
    {
      'type': 'input',
      'label': '创建时间',
      'prop': 'createTime',
      'span': 12,
      editDisabled: true,
      addDisplay: false
    }
  ]
}
