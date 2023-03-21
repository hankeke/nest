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
  <div class="user">
    <basic-container>
      <el-row :span="24">
        <el-col :xs="24" :sm="24" :md="5" class="user__tree">
          <avue-tree
            :option="treeOption"
            :data="treeData"
            @node-click="nodeClick"
          >
            <span slot-scope="{ node, data }" class="el-tree-node__label">
              <el-tooltip
                v-if="data.isLock"
                class="item"
                effect="dark"
                content="无数据权限"
                placement="right-start"
              >
                <span>{{ node.label }} <i class="el-icon-lock"></i></span>
              </el-tooltip>
              <span v-if="!data.isLock">{{ node.label }}</span>
            </span>
          </avue-tree>
        </el-col>
        <el-col :xs="24" :sm="24" :md="19" class="user__main">
          <avue-crud
            ref="crud"
            v-model="form"
            :option="option"
            :page.sync="page"
            :table-loading="listLoading"
            :before-open="handleOpenBefore"
            :data="list"
            @on-load="getList"
            @search-change="searchChange"
            @refresh-change="refreshChange"
            @size-change="sizeChange"
            @current-change="currentChange"
            @row-update="update"
            @row-save="create"
          >
            <template slot="menuLeft">
              <el-button
                v-if="sys_user_add"
                class="filter-item"
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="$refs.crud.rowAdd()"
              >添加
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
              <el-dropdown>
                <el-button type="primary" plain>
                  导入<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="$refs.excelUpload.show()">普通导入</el-dropdown-item>
                  <el-dropdown-item @click.native="$refs.excelDingUserUpload.show()">钉钉用户导入</el-dropdown-item>
                  <el-dropdown-item @click.native="$refs.excelCpUserUpload.show()">企微用户导入</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template slot="username" slot-scope="scope">
              <span>{{ scope.row.username }}</span>
            </template>
            <template slot="role" slot-scope="scope">
              <span v-for="(r, index) in scope.row.roleList" :key="index">
                <el-tag>{{ r.roleName }} </el-tag>&nbsp;&nbsp;
              </span>
            </template>
            <template slot="post" slot-scope="scope">
              <span v-for="(p, index) in scope.row.postList" :key="index">
                <el-tag>{{ p.postName }} </el-tag>&nbsp;&nbsp;
              </span>
            </template>
            <template slot="deptId" slot-scope="scope">
              {{ scope.row.deptName }}
            </template>
            <template slot="lockFlag" slot-scope="scope">
              <el-tag>{{ scope.label }}</el-tag>
            </template>
            <template slot="menu" slot-scope="scope">
              <el-button
                v-if="sys_user_edit"
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row, scope.index)"
              >编辑
              </el-button>
              <el-button
                v-if="sys_user_del"
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="deletes(scope.row, scope.index)"
              >删除
              </el-button>
            </template>
            <template slot="deptIdForm">
              <avue-input-tree
                v-model="form.deptId"
                :node-click="getNodeData"
                :dic="treeDeptData"
                :props="defaultProps"
                placeholder="请选择所属部门"
              />
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
            <template slot="postForm">
              <avue-select
                v-model="post"
                multiple
                placeholder="请选择岗位"
                :dic="postOptions"
                :props="postProps"
              ></avue-select>
            </template>
          </avue-crud>
        </el-col>
        <!--excel 模板导入 -->
        <excel-upload
          ref="excelUpload"
          title="用户信息导入"
          url="/admin/user/import"
          temp-url="/admin/sys-file/local/file/user.xlsx"
          @refreshDataList="refreshChange"
        ></excel-upload>
        <excel-upload
          ref="excelDingUserUpload"
          title="钉钉用户信息导入"
          url="/admin/user/importDingUser"
          @refreshDataList="refreshChange"
        ></excel-upload>
        <excel-upload
          ref="excelCpUserUpload"
          title="企业微信用户信息导入"
          url="/admin/user/importCpUser"
          @refreshDataList="refreshChange"
        ></excel-upload>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import {listPosts} from '@/api/admin/post'
import {addObj, delObj, fetchList, putObj} from '@/api/admin/user'
import {deptRoleList} from '@/api/admin/role'
import {fetchTree} from '@/api/admin/dept'
import {tableOption} from '@/const/crud/admin/user'
import {mapGetters} from 'vuex'
import ExcelUpload from '@/components/upload/excel'

export default {
  name: 'SysUser',
  components: {
    ExcelUpload
  },
  data() {
    return {
      searchForm: {},
      treeOption: {
        nodeKey: 'id',
        addBtn: false,
        menu: false,
        props: {
          label: 'name',
          value: 'id'
        }
      },
      treeData: [],
      option: tableOption,
      treeDeptData: [],
      checkedKeys: [],
      roleProps: {
        label: 'roleName',
        value: 'roleId'
      },
      postProps: {
        label: 'postName',
        value: 'postId'
      },
      defaultProps: {
        label: 'name',
        value: 'id'
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false // 是否倒序
      },
      list: [],
      listLoading: true,
      role: [],
      post: [],
      form: {},
      rolesOptions: [],
      postOptions: [],
      excelUpload: false
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  watch: {
    role() {
      this.form.role = this.role
    },
    post() {
      this.form.post = this.post
    }
  },
  created() {
    this.sys_user_add = this.permissions['sys_user_add']
    this.sys_user_edit = this.permissions['sys_user_edit']
    this.sys_user_del = this.permissions['sys_user_del']
    this.init()
  },
  methods: {
    init() {
      fetchTree().then(response => {
        this.treeData = response.data.data
      })
    },
    nodeClick(data) {
      this.page.page = 1
      this.getList(this.page, {deptId: data.id})
    },
    getList(page, params) {
      this.listLoading = true
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize
          },
          params,
          this.searchForm
        )
      ).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    getNodeData() {
      deptRoleList().then(response => {
        this.rolesOptions = response.data.data
      })
      listPosts().then(response => {
        this.postOptions = response.data.data
      })
    },
    searchChange(param, done) {
      this.searchForm = param
      this.page.currentPage = 1
      this.getList(this.page, param)
      done()
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
    handleOpenBefore(show, type) {
      window.boxType = type
      // 查询部门树
      fetchTree().then(response => {
        this.treeDeptData = response.data.data
      })
      // 查询角色列表
      deptRoleList().then(response => {
        this.rolesOptions = response.data.data
      })
      // 查询岗位列表
      listPosts().then(response => {
        this.postOptions = response.data.data
      })
      if (['edit', 'view'].includes(type)) {
        this.role = []
        for (let i = 0; i < this.form.roleList.length; i++) {
          this.role[i] = this.form.roleList[i].roleId
        }
        this.post = []
        for (let i = 0; i < this.form.postList.length; i++) {
          this.post[i] = this.form.postList[i].postId
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
    handleUpdate(row, index) {
      this.$refs.crud.rowEdit(row, index)
      this.form.password = '******'
    },
    create(row, done, loading) {
      if (this.form.phone && this.form.phone.indexOf('*') > 0) {
        this.form.phone = undefined
      }
      addObj(this.form)
        .then(() => {
          this.getList(this.page)
          done()
          this.$notify.success('创建成功')
        })
        .catch(() => {
          loading()
        })
    },
    update(row, index, done, loading) {
      if (this.form.phone && this.form.phone.indexOf('*') >= 0) {
        this.form.phone = undefined
      }
      if (this.form.password && this.form.password.indexOf('******') >= 0) {
        this.form.password = undefined
      }
      putObj(this.form)
        .then(() => {
          this.getList(this.page)
          done()
          this.$notify.success('修改成功')
        })
        .catch(() => {
          loading()
        })
    },
    deletes(row, index) {
      this.$confirm(
        '此操作将永久删除该用户(用户名:' + row.username + '), 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        delObj(row.userId)
          .then(() => {
            this.list.splice(index, 1)
            this.$notify.success('删除成功')
          })
          .catch(() => {
            this.$notify.error('删除失败')
          })
      })
    },
    exportExcel() {
      this.downBlobFile('/admin/user/export', this.searchForm, 'user.xlsx')
    }
  }
}
</script>
<style lang="scss">
.user {
  height: 100%;

  &__tree {
    padding-top: 3px;
    padding-right: 20px;
  }

  &__main {
    .el-card__body {
      padding-top: 0;
    }
  }
}
</style>
