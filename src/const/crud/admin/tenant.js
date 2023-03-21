import {getObj} from '@/api/admin/tenant.js'
import {validatenull} from '@/util/validate.js'

const validateTenantCode = (rule, value, callback) => {
  const obj = {'code': value}
  getObj(obj).then(response => {
    if (window.boxType === 'edit') {
      return callback()
    }
    const result = response.data.data
    if (result && result.length !== 0) {
      callback(new Error('同名租户标识已存在'))
    } else {
      callback()
    }
  })
}

const validateTenantDomain = (rule, value, callback) => {
  if (validatenull(value)) {
    return callback()
  }

  const obj = {'tenantDomain': value}
  getObj(obj).then(response => {
    if (window.boxType === 'edit') {
      return callback()
    }
    const result = response.data.data
    if (result && result.length !== 0) {
      callback(new Error('域名已存在'))
    } else {
      callback()
    }
  })
}

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
      label: '租户id',
      prop: 'id',
      hide: true,
      editDisabled: true,
      editDisplay: false,
      addDisplay: false
    },
    {
      label: '租户名称',
      prop: 'name',
      search: true,
      rules: [
        {required: true, message: '请输入租户名称', trigger: 'blur'},
        {min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
      ]
    },
    {
      label: '租户编号',
      type: 'number',
      prop: 'code',
      editDisabled: true,
      rules: [{
        required: true,
        message: '请输入租户编号',
        trigger: 'blur'
      }, {validator: validateTenantCode, trigger: 'blur'}]
    },
    {
      label: '租户域名',
      prop: 'tenantDomain',
      search: true,
      rules: [{
        required: false,
        message: '请输入租户域名',
        trigger: 'blur'
      }, {validator: validateTenantDomain, trigger: 'blur'}]
    },
    {
      label: '功能套餐',
      prop: 'menuId',
      type: 'select',
      border: true,
      dicUrl: '/admin/tenant-menu/list',
      value: '',
      props: {
        label: 'name',
        value: 'id'
      },
      rules: [
        {required: true, message: '请选择租户套餐', trigger: 'blur'}
      ]
    },
    {
      label: '开始时间',
      prop: 'startTime',
      type: 'datetime',
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
      rules: [{
        required: true,
        message: '请输入结束时间',
        trigger: 'blur'
      }]
    },
    {
      label: '结束时间',
      prop: 'endTime',
      type: 'datetime',
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
      rules: [{
        required: true,
        message: '请输入结束时间',
        trigger: 'blur'
      }]
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      border: true,
      dicUrl: '/admin/dict/type/status_type',
      search: true,
      value: '0'
    }
  ]
}
