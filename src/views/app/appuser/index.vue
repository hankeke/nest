<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        v-model="form"
        :page.sync="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        :before-open="handleOpenBefore"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="handleDel">
        <template slot="menuLeft">
          <el-button
            v-if="permissions.app_appuser_export"
            class="filter-item"
            plain
            type="primary"
            size="small"
            icon="el-icon-download"
            @click="exportExcel">导出
          </el-button>
        </template>
        <template slot="role" slot-scope="scope">
          <span v-for="(r, index) in scope.row.roleList" :key="index">
            <el-tag>{{ r.roleName }} </el-tag>&nbsp;&nbsp;
          </span>
        </template>
        <template slot="roleForm">
          <avue-select
            v-model="role"
            :dic="rolesOptions"
            :props="roleProps"
            multiple
            placeholder="请选择角色"
          />
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {addObj, delObj, fetchList, putObj} from '@/api/app/appuser'
import {list as roleList} from '@/api/app/approle'
import {tableOption} from '@/const/crud/app/appuser'
import {mapGetters} from 'vuex'

export default {
  name: 'appuser',
  data() {
    return {
      searchForm: {},
      tableData: [],
      role: [],
      rolesOptions: [],
      roleProps: {
        label: 'roleName',
        value: 'roleId'
      },
      form: {},
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
        addBtn: this.vaildData(this.permissions.app_appuser_add, false),
        delBtn: this.vaildData(this.permissions.app_appuser_del, false),
        editBtn: this.vaildData(this.permissions.app_appuser_edit, false)
      }
    }
  },
  watch: {
    role() {
      this.form.role = this.role
    }
  },
  methods: {
    // 列表查询
    getList(page, params) {
      this.tableLoading = true
      fetchList(Object.assign({
        current: page.currentPage,
        size: page.pageSize
      }, params, this.searchForm)).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    },
    handleOpenBefore(show, type) {
      window.boxType = type
      this.form.password = '******'
      roleList().then(res => {
        this.rolesOptions = res.data.data
      })
      if (['edit', 'view'].includes(type)) {
        this.role = []
        for (let i = 0; i < this.form.roleList.length; i++) {
          this.role[i] = this.form.roleList[i].roleId
        }
      } else if (type === 'add') {
        this.role = []
        this.post = []
        this.form.username = undefined
        this.form.phone = undefined
        this.form.password = undefined
      }
      show()
    },
    // 删除
    handleDel: function (row, index) {
      this.$confirm('此操作将永久删除该用户 (用户名:' + row.username + '), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj(row.userId)
      }).then(data => {
        this.$message.success('删除成功')
        this.getList(this.page)
      })
    },
    // 更新
    handleUpdate: function (row, index, done, loading) {
      if (this.form.phone && this.form.phone.indexOf('*') >= 0) {
        this.form.phone = undefined
      }
      if (this.form.password && this.form.password.indexOf('******') >= 0) {
        this.form.password = undefined
      }
      putObj(this.form).then(data => {
        this.$message.success('修改成功')
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    // 保存
    handleSave: function (row, done, loading) {
      if (this.form.phone && this.form.phone.indexOf('*') > 0) {
        this.form.phone = undefined
      }
      addObj(this.form).then(data => {
        this.$message.success('添加成功')
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    // 每页条数改变事件
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    // 当前页发生改变事件
    currentChange(current) {
      this.page.currentPage = current
    },
    // 查询事件
    searchChange(form, done) {
      this.searchForm = form
      this.page.currentPage = 1
      this.getList(this.page, form)
      done()
    },
    // 刷新事件
    refreshChange() {
      this.getList(this.page)
    },
    //  导出excel
    exportExcel() {
      this.downBlobFile('/app/appuser/export', this.searchForm, 'appuser.xlsx')
    }
  }
}
</script>
