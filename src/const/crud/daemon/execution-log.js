const DIC = {
  isSuccess: [{
    label: '成功',
    value: 1
  },
    {
      label: '失败',
      value: 0
    }
  ]
}

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  searchMenuSpan: 6,
  editBtn: false,
  addBtn: false,
  viewBtn: true,
  column: [
    {
      label: 'ID',
      prop: 'id',
      hide: true
    },
    {
      label: '任务名称',
      prop: 'jobName'
    },
    {
      label: '任务ID',
      prop: 'taskId',
      hide: true,
      overHidden: true
    },
    {
      label: '主机名',
      prop: 'hostname',
      hide: true
    },
    {
      label: 'IP',
      prop: 'ip'
    },
    {
      width: 80,
      label: '分片项',
      prop: 'shardingItem'
    },
    {
      label: '执行源',
      prop: 'executionSource',
      hide: true
    },
    {
      label: '失败原因',
      prop: 'failureCause',
      hide: true
    },
    {
      width: 100,
      label: '执行结果',
      prop: 'isSuccess',
      type: 'select',
      dicData: DIC.isSuccess
    },
    {
      label: '开始时间',
      prop: 'startTime',
      hide: true
    },
    {
      label: '完成时间',
      prop: 'completeTime'
    }
  ]
}
