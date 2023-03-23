<template>
  <div class="execution">
    <basic-container>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-select v-model="q.dsName" placeholder="请选择数据源" @change="search">
              <el-option
                v-for="item in dataSourceList"
                :key="item.id"
                :label="item.name"
                :value="item.name"/>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="q.tableName" placeholder="表名称"/>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="primary" icon="el-icon-document" @click="downDocument">导出文档</el-button>
            <el-button type="primary" icon="el-icon-download" @click="openBatch">批量生成</el-button>
          </div>
        </el-col>
      </el-row>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="refreshChange">
        <template v-slot:menuBtn="scope">
          <el-dropdown-item
            divided
            icon="el-icon-view"
            @click.native="handleTable(scope.row,scope.index)">字段
          </el-dropdown-item>
          <el-dropdown-item
            divided
            icon="el-icon-check"
            @click.native="handleDown(scope.row,scope.index)">下载
          </el-dropdown-item>
          <el-dropdown-item
            divided
            icon="el-icon-edit"
            @click.native="handleDesign(scope.row,scope.index)">设计
          </el-dropdown-item>
          <el-dropdown-item
            divided
            icon="el-icon-share"
            @click.native="copyLink(scope.row,scope.index)">运行
          </el-dropdown-item>
          <el-dropdown-item
            divided
            icon="el-icon-mouse"
            @click.native="lowCode(scope.row,scope.index)">低代码
          </el-dropdown-item>
        </template>
      </avue-crud>

      <el-dialog
        :visible.sync="box"
        title="生成配置"
        width="50%"
        lock-scroll>
        <div class="pull-auto">
          <avue-form
            ref="formData"
            v-model="formData"
            :option="formOption">
            <template slot="menuForm">
              <el-button
                type="primary"
                icon="el-icon-view"
                plain
                @click="handleView()"
              >预览
              </el-button>
              <el-button
                type="info"
                icon="el-icon-check"
                plain
                @click="gen()"
              >下载
              </el-button>
            </template>
          </avue-form>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="boxBatch"
        title="批量生成"
        width="50%"
        lock-scroll>
        <div class="pull-auto">
          <avue-form
            ref="formBatchData"
            v-model="formBatchData"
            :option="formBatchOption"
            @submit="batchGen"/>
        </div>
      </el-dialog>

    </basic-container>
    <!-- 预览界面 -->
    <el-dialog :title="preview.title" :visible.sync="preview.open" width="80%" top="5vh" append-to-body>
      <Preview v-if="preview.open" :query-data="formData"/>
    </el-dialog>
    <!--表字段-->
    <el-dialog :title="table.title" :visible.sync="table.open" width="80%" top="5vh" append-to-body>
      <Table v-if="table.open" :query-data="formData"/>
    </el-dialog>
  </div>
</template>

<script>
import {fetchList, fetchSelectDsList, handleDown} from '@/api/gen/gen'
import {dynamicApi} from '@/api/gen/dynamic'
import {formBatchOption, formOption, tableOption} from '@/const/crud/gen/gen'
import Preview from './preview'
import Table from './table'
import store from '@/store/index.js'

export default {
  name: 'CodeGenerator',
  components: {Preview, Table},
  data() {
    return {
      runUrl: undefined,
      q: {},
      dataSourceList: [],
      tableData: [],
      formData: {},
      formBatchData: {},
      box: false,
      boxBatch: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      formOption: formOption,
      formBatchOption: formBatchOption,
      // 预览参数
      preview: {
        open: false,
        title: '代码预览'
      },
      table: {
        open: false,
        title: '字段预览'
      }
    }
  },
  computed: {
    token() {
      return store.getters.access_token
    },
    tenant() {
      return store.getters.userInfo.tenantId ? store.getters.userInfo.tenantId : 1
    }
  },
  methods: {
    getList(page) {
      this.getDataSourceList().then(() => {
        this.tableLoading = true
        return fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, this.q))
      }).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    handleView: function () {
      this.formData.dsName = this.q.dsName
      this.preview.open = true
      this.table.open = false
    },
    handleDesign: function (row) {
      this.$router.push({path: '/gen/design', query: {tableName: row.tableName, dsName: this.q.dsName}})
    },
    handleTable: function (row) {
      this.formData.tableName = row.tableName
      this.formData.dsName = this.q.dsName
      this.table.open = true
      this.preview.open = false
    },
    handleDown: function (row) {
      this.formData.tableName = row.tableName
      this.box = true
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    refreshChange() {
      this.getList(this.page)
    },
    gen() {
      this.formData.dsName = this.q.dsName
      handleDown(this.formData).then(() => {
        this.box = false
      })
    },
    getDataSourceList() {
      return fetchSelectDsList().then(response => {
        this.dataSourceList = response.data.data

        if (this.dataSourceList.length === 0) {
          return new Promise((resolve, reject) => {
            reject('数据源信息列表为空,请添加数据源')
          })
        }

        if (this.dataSourceList.length > 0 && this.q.dsName === undefined) {
          this.q.dsName = this.dataSourceList[0].name
        }
      })
    },
    search() {
      this.getList(this.page)
    },
    openBatch() {
      if (this.$refs.crud.tableSelect.length <= 1 || this.$refs.crud.tableSelect.length > 10) {
        this.$message.error('选中表数量不合法，数量最少2个或最多为10个')
        return false
      }
      const tableName = []
      for (const table of this.$refs.crud.tableSelect) {
        tableName.push(table.tableName)
      }
      this.formBatchData.tableName = tableName.join('-')
      this.boxBatch = true
    },
    batchGen(form, done) {
      this.formBatchData.dsName = this.q.dsName
      handleDown(this.formBatchData).then(() => {
        done()
        this.boxBatch = false
      }).catch(() => {
        done()
      })
    },
    downDocument() {
      const tableNames = []
      for (const table of this.$refs.crud.tableSelect) {
        tableNames.push(table.tableName)
      }
      const queryParams = {dsName: this.q.dsName, tableNames: tableNames}
      this.downBlobFile('/gen/generator/doc', queryParams, this.q.dsName + '.html')
    },
    copyLink(row) {
      const queryParams = {dsName: this.q.dsName, tableName: row.tableName, style: 0}
      dynamicApi(queryParams).then(() => {
        window.location.href = `/#/gen/dynamic/${this.q.dsName}/${row.tableName}`
      })
    },
    lowCode() {
      const url = `/gen/api/designer/index.html?access_token=${this.token}&TENANT-ID=${this.tenant}`

      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

