<template>
  <basic-container>
    <div class="avue-crud">
      <el-form :inline="true">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            v-model="queryParams.menuName"
            clearable
            placeholder="请输入菜单名称"
            size="small"
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="getList">搜索</el-button>

          <el-button
            v-if="permissions.sys_menu_add"
            icon="el-icon-plus"
            type="primary"
            @click="addOrUpdateHandle(false)">
            添加
          </el-button>
        </el-form-item>
      </el-form>

      <el-table
        v-loading="loading"
        :data="menuList"
        :tree-props="{children: 'children', hasChildren: 'hasChildrens'}"
        border
        row-key="id">
        <el-table-column :show-overflow-tooltip="true" label="页面名称" prop="name" width="180"></el-table-column>
        <el-table-column label="排序" prop="sortOrder" width="60"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="组件路径" prop="path"></el-table-column>
        <el-table-column align="center" label="类型" prop="menuType" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.menuType === '0'" type="success">页面</el-tag>
            <el-tag v-if="scope.row.menuType === '1'" type="info">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="显示状态" prop="visible" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.visible === '1'" type="success">显示</el-tag>
            <el-tag v-if="scope.row.visible === '0'" type="info">隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="权限标识" prop="permission"></el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="permissions.app_appmenu_add"
              icon="el-icon-plus"
              size="small"
              type="text"
              @click="addOrUpdateHandle(false,scope.row.id)">新增
            </el-button>
            <el-button
              v-if="permissions.app_appmenu_edit"
              icon="el-icon-edit"
              size="small"
              type="text"
              @click="addOrUpdateHandle(true,scope.row.id)">修改
            </el-button>
            <el-button
              v-if="permissions.app_appmenu_del"
              icon="el-icon-delete"
              size="small"
              type="text"
              @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getList"></table-form>
    </div>
  </basic-container>
</template>

<script>
import {delObj, fetchMenuTree} from '@/api/app/appmenu'
import {mapGetters} from 'vuex'
import TableForm from './menu-form'

export default {
  name: 'appmenu',
  components: {TableForm},
  data() {
    return {
      addOrUpdateVisible: false,
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
      // 查询参数
      queryParams: {
        parentId: undefined,
        menuName: ''
      }
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  created() {
    this.getList()
  },
  methods: {
    addOrUpdateHandle(isEdit, id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, id)
      })
    },
    getList() {
      this.loading = true
      fetchMenuTree(this.queryParams).then(response => {
        this.menuList = response.data.data
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
    }
  }
}
</script>
