<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-change="handleFilter"
        @search-reset="handleSearchReset">
        <template slot="jobLogStatus" slot-scope="scope">
          <div v-if="scope.row.jobLogStatus === '0'">
            <el-tag type="success">{{ getDicNameJobExecuteStatus(scope.row.jobLogStatus) }}</el-tag>
          </div>
          <div v-else>
            <el-tag type="danger">{{ getDicNameJobExecuteStatus(scope.row.jobLogStatus) }}</el-tag>
          </div>
        </template>
        <template slot="menuLeft">
          <el-button
            class="filter-item"
            plain
            type="primary"
            icon="el-icon-remove"
            @click="handleDelLogs"
          >批量删除
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {fetchList} from '@/api/daemon/sys-job-log'

import {delObjs} from '@/api/daemon/sys-job'

import {tableOption} from '@/const/crud/daemon/sys-job-log'
import {remote} from '@/api/admin/dict'
import {mapGetters} from 'vuex'

export default {
  name: 'JobLog',
  data() {
    return {
      queryParams: {}, // 全局检索条件
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条,
      },
      tableLoading: false,
      tableOption: tableOption,
      JobExecuteStatusDicCache: []
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  mounted: function () {
    this.getDicNameCache('job_execute_status')// 获取定时任务运行时状态
  },
  methods: {
    getList(page) {
      this.tableLoading = true
      fetchList(Object.assign({
        descs: 'create_time',
        current: page.currentPage,
        size: page.pageSize
      }, this.queryParams)).then(response => {
        this.tableData = response.data.data.records
        this.page.pageSize = response.data.data.size
        this.page.total = response.data.data.total
        this.tableLoading = false
      })
    },
    handleSearchReset() {
      this.queryParams = {}
    },
    handleFilter(params, done) {
      this.queryParams = params
      this.page.currentPage = 1
      this.getList(this.page)
      done()
    },
    refreshChange() {
      this.getList(this.page)
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    getDicNameCache(type) {
      remote(type).then(response => {
        const code = response.data.code
        if (code === 0) {
          const _data = response.data.data
          this.JobExecuteStatusDicCache = _data
        }
      })
    },
    getDicNameJobExecuteStatus(value) {
      let re = ''
      this.JobExecuteStatusDicCache.forEach(obj => {
        if (obj.value === value) {
          re = obj.label
        }
      })
      return re
    },
    handleDelLogs() {
      if (this.$refs.crud.tableSelect.length === 0) {
        this.$message.error('请选择日志后进行删除')
        return false
      }
      const logIds = []
      for (const row of this.$refs.crud.tableSelect) {
        logIds.push(row.jobLogId)
      }
      delObjs(logIds).then(() => {
        this.$notify.success('删除成功')
        this.$refs.crud.toggleSelection()
        this.refreshChange()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
