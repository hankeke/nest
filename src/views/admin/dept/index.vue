<template>
  <basic-container>
    <div class="avue-crud">
      <el-form ref="queryForm" :model="queryParams" :inline="true">
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            v-model="queryParams.deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>

          <el-button
            v-if="permissions.sys_menu_add"
            icon="el-icon-plus"
            type="primary"
            @click="addOrUpdateHandle(false)">
            添加
          </el-button>

          <el-button
            class="filter-item"
            plain
            type="primary"
            size="small"
            icon="el-icon-download"
            @click="exportExcel"
          >导出
          </el-button>
          <el-button
            class="filter-item"
            plain
            type="primary"
            size="small"
            icon="el-icon-upload"
            @click="$refs.excelDeptUpload.show()"
          >导入
          </el-button>

          <el-dropdown v-if="website.connectSync" style="margin-left: 10px">
            <el-button type="primary">
              互联同步<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="sync(1)">钉钉部门同步</el-dropdown-item>
              <el-dropdown-item @click.native="sync(2)">钉钉用户同步</el-dropdown-item>
              <el-dropdown-item @click.native="sync(3)">企微部门同步</el-dropdown-item>
              <el-dropdown-item @click.native="sync(4)">企微用户同步</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
      </el-form>

      <el-table
        v-loading="loading"
        border
        :data="deptList"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children'}">
        <el-table-column prop="name" label="部门名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="weight" label="排序" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template v-slot="scope">
            <el-button
              v-if="permissions.sys_dept_add"
              size="small"
              type="text"
              icon="el-icon-plus"
              @click="addOrUpdateHandle(false,scope.row.id)">新增
            </el-button>
            <el-button
              v-if="permissions.sys_dept_edit"
              size="small"
              type="text"
              icon="el-icon-edit"
              @click="addOrUpdateHandle(true,scope.row.id)">修改
            </el-button>
            <el-button
              v-if="permissions.sys_dept_del"
              size="small"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <excel-upload
        ref="excelDeptUpload"
        title="部门信息导入"
        url="/admin/dept/import"
        @refreshDataList="refreshChange"
      ></excel-upload>

      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getList"></table-form>
    </div>
  </basic-container>
</template>

<script>
import {delObj, fetchTree, syncCpDept, syncCpUser, syncDept, syncUser} from '@/api/admin/dept'
import TableForm from './dept-form'
import {mapGetters} from 'vuex'
import ExcelUpload from '@/components/upload/excel'

export default {
  name: 'Dept',
  components: {TableForm, ExcelUpload},
  data() {
    return {
      addOrUpdateVisible: false,
      // 遮罩层
      loading: true,
      //表格树数据
      deptList: [],
      // 查询参数
      queryParams: {
        deptName: ''
      }
    }
  },
  computed: {
    ...mapGetters(['permissions', 'website'])
  },
  created() {
    this.getList()
  },
  methods: {
    refreshChange() {
      this.getList(this.page)
    },
    addOrUpdateHandle(isEdit, id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, id)
      })
    },
    getList() {
      this.loading = true
      fetchTree(this.queryParams).then(response => {
        this.deptList = response.data.data
        this.loading = false
      })
    },
    handleDelete(row) {
      this.$confirm('是否确认删除名称为"' + row.name + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj(row.id)
      }).then(() => {
        this.getList()
        this.$message.success('删除成功')
      })
    },
    // 互联数据同步
    sync(type) {
      this.$confirm('此操作将覆盖现有系统部门人员数据，请做好数据备份, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (type === 1) {
          return syncDept()
        }
        if (type === 2) {
          return syncUser()
        }

        if (type === 3) {
          return syncCpDept()
        }

        if (type === 4) {
          return syncCpUser()
        }
      }).then(() => {
        this.$message.success('操作成功')
        this.getList()
      })
    },
    exportExcel() {
      this.downBlobFile('/admin/dept/export', this.searchForm, 'dept.xlsx')
    }
  }
}
</script>
