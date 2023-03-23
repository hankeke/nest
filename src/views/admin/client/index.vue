<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        :permission="permissionList"
        :before-open="beforeOpen"
        @on-load="getList"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="handleDelete"
      >
        <template slot="menuLeft">
          <el-button
            v-if="permissions.sys_client_del"
            class="filter-item"
            type="primary"
            size="small"
            icon="el-icon-refresh-left"
            @click="handleRefreshCache"
          >缓存
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {addObj, delObj, fetchList, putObj, refreshCache} from '@/api/admin/client'
import {tableOption} from '@/const/crud/admin/client'
import {mapGetters} from 'vuex'

export default {
  name: 'Client',
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.sys_client_add, false),
        delBtn: this.vaildData(this.permissions.sys_client_del, false),
        editBtn: this.vaildData(this.permissions.sys_client_edit, false)
      }
    }
  },
  methods: {
    getList(page, params) {
      this.tableLoading = true
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize
          },
          params
        )
      ).then((response) => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
      })
    },
    handleDelete: function (row, index) {
      this.$confirm('是否确认删除ID为' + row.clientId, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function () {
          return delObj(row.clientId)
        })
        .then(() => {
          this.$message.success('删除成功')
          this.refreshChange()
        })
    },
    handleUpdate: function (row, index, done) {
      if (this.validatenull(row.accessTokenValidity)) {
        row.accessTokenValidity = 60 * 60 * 12
      }
      if (this.validatenull(row.refreshTokenValidity)) {
        row.refreshTokenValidity = 60 * 60 * 24 * 30
      }
      if (this.validatenull(row.additionalInformation)) {
        row.additionalInformation = undefined
      }

      putObj(row).then(() => {
        this.$message.success('修改成功')
        this.refreshChange()
        done()
      })
    },
    handleSave: function (row, done) {
      if (this.validatenull(row.accessTokenValidity)) {
        row.accessTokenValidity = 60 * 60 * 12
      }
      if (this.validatenull(row.refreshTokenValidity)) {
        row.refreshTokenValidity = 60 * 60 * 24 * 30
      }
      if (this.validatenull(row.additionalInformation)) {
        row.additionalInformation = undefined
      }

      addObj(row).then(() => {
        this.$message.success('添加成功')
        this.refreshChange()
        done()
      })
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
    beforeOpen(show, type) {
      window.boxType = type
      show()
    },
    handleRefreshCache: function () {
      refreshCache().then(() => {
        this.$message.success('同步成功')
      }).catch(function () {
      })
    }
  }
}
</script>
