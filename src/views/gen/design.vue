<template>
  <div class="webapp">
    <basic-container>
      <avue-form-design :options="option" @submit="handleSubmit"></avue-form-design>
    </basic-container>
  </div>
</template>


<script>
import AvueUeditor from 'avue-plugin-ueditor'
import {getForm, postForm} from '@/api/gen/gen'
import {removeStore} from '@/util/store'

function stringifyWithFunctions(object) {
  return JSON.stringify(object, (key, val) => {
    if (key === 'onLoad') {
      return `(${val})`
    }
    if (['uploadPreview', 'change', 'focus', 'click', 'blur'].includes(key)) {
      return `${val}`
    }
    return val
  })
}

export default {
  comments: {
    AvueUeditor
  },
  data() {
    return {
      option: {
        column: []
      }
    }
  },
  created() {
    this.getFormInfo()
  },
  methods: {
    handleSubmit(json) {
      const params = this.$route.query
      if (this.validatenull(params)) {
        return false
      }
      const result = stringifyWithFunctions(json)

      console.log('写入res ', result)
      postForm(result, params.tableName, params.dsName).then((response) => {
        this.$message.success('生成并保存成功')
        const cacheKey = `${params.dsName}_${params.tableName}_config`
        removeStore({name: cacheKey})
      })
    },
    getFormInfo() {
      const params = this.$route.query
      if (this.validatenull(params)) {
        return false
      }
      getForm(params.tableName, params.dsName).then((response) => {
        if (!this.validatenull(response.data.data)) {
          const parseWithFunctions = (obj) => {
            return JSON.parse(obj, (key, val) => {
              if (key === 'onLoad' || key === 'uploadPreview') {
                return new Function('return ' + val + ';').apply(this)
              }
              return val
            })
          }
          const res = parseWithFunctions(response.data.data)
          this.option = res
        }
      })
    }
  }
}
</script>
<style lang="scss">
.webapp {
  background-color: #fff;
  position: relative;
  width: 100%;
  height: 100%;

  .form-designer {
    height: 800px;
    overflow-y: scroll;
  }

  .form-designer .widget-config-container .el-tabs__header {
    position: relative;
  }
}
</style>
