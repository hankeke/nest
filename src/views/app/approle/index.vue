<!--
  -    Copyright (c) 2018-2025, lengleng All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the pig4cloud.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: lengleng (wangiegie@gmail.com)
  -->
<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :data="tableData"
        :option="tableOption"
        :page.sync="page"
        :permission="permissionList"
        :table-loading="tableLoading"
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
            v-if="permissions.app_approle_export"
            class="filter-item"
            icon="el-icon-download"
            plain
            size="small"
            type="primary"
            @click="exportExcel">导出
          </el-button>
        </template>
        <template
          slot="menu"
          slot-scope="scope">
          <el-button
            icon="el-icon-plus"
            size="small"
            type="text"
            @click="handlePermission(scope.row,scope.index)">权限
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog
      :visible.sync="dialogPermissionVisible"
      :close-on-click-modal="false"
      title="分配权限">
      <div class="dialog-main-tree">
        <el-tree
          ref="menuTree"
          :data="treeData"
          :default-checked-keys="checkedKeys"
          :check-strictly="false"
          :props="defaultProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          node-key="id"
          highlight-current
          show-checkbox
          default-expand-all/>
      </div>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="updatePermession(roleId)">更 新
        </el-button>
        <el-button
          type="default"
          size="small"
          @click="cancal()">取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addObj, delObj, fetchList, fetchRoleTree, permissionUpd, putObj} from '@/api/app/approle'
import {tableOption} from '@/const/crud/app/approle'
import {mapGetters} from 'vuex'
import {fetchMenuTree} from '@/api/app/appmenu'

export default {
  name: 'approle',
  data() {
    return {
      searchForm: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      defaultProps: {
        label: 'name',
        value: 'id'
      },
      tableOption: tableOption,
      treeData: [],
      checkedKeys: [],
      roleId: undefined,
      roleCode: undefined,
      dialogPermissionVisible: false
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.app_approle_add, false),
        delBtn: this.vaildData(this.permissions.app_approle_del, false),
        editBtn: this.vaildData(this.permissions.app_approle_edit, false),
        role_btn_perm: this.vaildData(this.permissions.app_approle_perm, false)
      }
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
    // 删除
    handleDel: function (row, index) {
      this.$confirm('是否确认删除ID为' + row.roleId, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj(row.roleId)
      }).then(data => {
        this.$message.success('删除成功')
        this.getList(this.page)
      })
    },
    // 更新
    handleUpdate: function (row, index, done, loading) {
      putObj(row).then(data => {
        this.$message.success('修改成功')
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    handlePermission(row) {
      fetchRoleTree(row.roleId)
        .then(response => {
          this.checkedKeys = response.data.data
          return fetchMenuTree()
        })
        .then(response => {
          this.treeData = response.data.data
          // 解析出所有的太监节点
          this.checkedKeys = this.resolveAllEunuchNodeId(this.treeData, this.checkedKeys, [])
          this.dialogPermissionVisible = true
          this.roleId = row.roleId
          this.roleCode = row.roleCode
        })
    },
    // 保存
    handleSave: function (row, done, loading) {
      addObj(row).then(data => {
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
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 刷新事件
    refreshChange() {
      this.getList(this.page)
    },
    //  导出excel
    exportExcel() {
      this.downBlobFile('/app/approle/export', this.searchForm, 'approle.xlsx')
    },
    updatePermession(roleId) {
      this.menuIds = ''
      this.menuIds = this.$refs.menuTree.getCheckedKeys().join(',').concat(',').concat(this.$refs.menuTree.getHalfCheckedKeys().join(','))
      permissionUpd(roleId, this.menuIds).then(() => {
        this.dialogPermissionVisible = false
        this.$notify.success('修改成功')
      })
    },
    cancal() {
      this.dialogPermissionVisible = false
    },
    /**
     * 解析出所有的太监节点id
     * @param json 待解析的json串
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 太监节点id数组
     */
    resolveAllEunuchNodeId(json, idArr, temp) {
      for (let i = 0; i < json.length; i++) {
        const item = json[i]
        // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
        if (item.children && item.children.length !== 0) {
          this.resolveAllEunuchNodeId(item.children, idArr, temp)
        } else {
          temp.push(idArr.filter(id => id === item.id))
        }
      }
      return temp
    }
  }
}
</script>
