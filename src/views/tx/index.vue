

<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        :data="data"
        :option="option"/>
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
            label: '属性名称',
            prop: 'key'
          },
          {
            label: '属性值',
            prop: 'value'
          }
        ]
      }
    }
  },
  created() {
    request({
      url: '/tx/admin/avueSetting',
      method: 'get'
    }).then((resp) => {
      this.data = resp.data
    })
  }
}
</script>
