

<template>
  <div class="execution">
    <basic-container>
      <avue-crud :data="data" :option="option"/>
    </basic-container>
  </div>
</template>
<script>
import request from '@/router/axios'

export default {
  data() {
    return {
      obj: {},
      data: [],
      option: {
        menu: false,
        page: false,
        addBtn: false,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '模块名称',
            prop: 'model'
          },
          {
            label: '唯一标示',
            prop: 'uniqueKey'
          },
          {
            label: '模块地址',
            prop: 'ipAddress'
          },
          {
            label: '管道名称',
            prop: 'channelName'
          }
        ]
      }
    }
  },
  created() {
    request({
      url: '/tx/admin/onlines',
      method: 'get'
    }).then((resp) => {
      this.data = resp.data
    })
  }
}
</script>
