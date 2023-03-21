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
      label: '主键',
      prop: 'id',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '名称',
      prop: 'name',
      rules: [{
        required: true,
        message: '请输入名称',
        trigger: 'blur'
      }]
    },
    {
      label: '微信号',
      prop: 'account',
      overHidden: true,
      placeholder: '公众号设置->最下边原生ID',
      rules: [{
        required: true,
        message: '请输入微信号',
        trigger: 'blur'
      }]
    },
    {
      label: 'appid',
      prop: 'appid',
      overHidden: true,
      rules: [{
        required: true,
        message: '请输入appid',
        trigger: 'blur'
      }]
    },
    {
      label: '密钥',
      prop: 'appsecret',
      overHidden: true,
      rules: [{
        required: true,
        message: '请输入密钥',
        trigger: 'blur'
      }]
    },
    {
      label: '协议域名',
      prop: 'url',
      hide: true,
      placeholder: 'scheme://domain',
      rules: [{
        required: true,
        message: '输入不合法',
        trigger: 'blur'
      }]
    },
    {
      label: 'token',
      prop: 'token',
      overHidden: true,
      rules: [{
        required: true,
        message: '请输入token',
        trigger: 'blur'
      }]
    },
    {
      label: '加密密钥',
      prop: 'aeskey',
      overHidden: true,
      rules: [{
        required: true,
        message: '请输入加密密钥',
        trigger: 'blur'
      }]
    },
    {
      label: '图片',
      prop: 'qrUrl',
      type: 'upload',
      fileType: 'img',
      imgWidth: 60,
      imgFullscreen: true,
      editDisplay: false,
      addDisplay: false,
      listType: 'picture-img'
    }
  ]
}
