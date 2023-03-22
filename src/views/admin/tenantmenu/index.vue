
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
        <template slot="menuTreeForm" slot-scope="{}">
          <el-tree
            ref="menuTree"
            :data="menuData"
            :check-strictly="false"
            :props="defaultProps"
            :default-checked-keys="checkedMenu"
            class="filter-tree"
            node-key="id"
            highlight-current
            show-checkbox
          />
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {addObj, delObj, fetchList, putObj, treemenu} from '@/api/admin/tenant-menu'
import {tableOption} from '@/const/crud/admin/tenant-menu'
import {mapGetters} from 'vuex'

export default {
  name: 'Tenantmenu',
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
      tableOption: tableOption,
      menuData: [],
      defaultProps: {
        label: 'name',
        value: 'id'
      },
      checkedMenu: [],
      form: {}
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.admin_systenantmenu_add, false),
        delBtn: this.vaildData(this.permissions.admin_systenantmenu_del, false),
        editBtn: this.vaildData(this.permissions.admin_systenantmenu_edit, false)
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
    handleOpenBefore(show, type) {
      window.boxType = type
      treemenu().then(response => {
        this.menuData = response.data.data
        if (this.form.menuIds) {
          this.checkedMenu = this.resolveAllEunuchNodeId(this.menuData, this.form.menuIds.split(','), [])
        } else {
          this.checkedMenu = []
        }
      })
      show()
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
    },
    // 删除
    handleDel: function (row, index) {
      this.$confirm('是否确认删除ID为' + row.id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj(row.id)
      }).then(data => {
        this.$message.success('删除成功')
        this.getList(this.page)
      })
    },
    // 更新
    handleUpdate: function (row, index, done, loading) {
      this.form.menuIds = [...this.$refs.menuTree.getCheckedKeys(), ...this.$refs.menuTree.getHalfCheckedKeys()].join(",")
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
      this.form.menuIds = this.$refs.menuTree.getCheckedKeys().join(',')
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
    }
  }
}
</script>
