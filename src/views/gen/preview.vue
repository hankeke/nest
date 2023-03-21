<template>
  <el-row>
    <el-col :span="7">
      <el-tree :data="fileTree" :expand-on-click-node="false" default-expand-all highlight-current @node-click="handleNodeClick"/>
    </el-col>
    <el-col :span="17">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="item in data" :key="item.k" :lazy="true" :label="item.k" :name="item.k">
          <Java id="target" :value="item.v" height="600px"/>
          <el-button
            id="btn"
            type="text"
            size="small"
            icon="el-icon-document-copy"
            class="copy"
            @click="copyLink(item.v)">
            复制
          </el-button>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>

</template>

<script>
import Java from '@/components/editor/index'
import {preview} from '@/api/gen/gen'
import Clipboard from 'clipboard'
import {handleTree} from '@/util/util'

export default {
  name: 'Preview',
  components: {Java},
  props: {
    queryData: {type: Object, default: () => ({})}
  },
  data() {
    return {
      data: [], height: '', activeName: 'Entity.java', fileTree: [], fileTreeOriginal: []
    }
  },
  created() {
    preview(this.queryData).then(res => {
      const map = res.data.data
      for (const key in map) {
        const k = key.replace(/^template\/|.vm$/g, '')
        const v = map[key].code
        const obj = {k, v}
        this.data.push(obj)
      }
      for (const key in map) {
        const k = key.replace(/^template\/|.vm$/g, '')
        const v = map[key].codePath
        const obj = {k, v}
        this.fileTreeOriginal.push(obj)
      }
      const files = this.handleFiles(this.fileTreeOriginal)
      this.fileTree = handleTree(files, 'id', 'parentId', 'children', '/')
    })
  },
  methods: {
    copyLink(value) {
      const clipboard = new Clipboard('#btn', {text: () => value})
      // 复制成功执行的回调
      clipboard.on('success', () => {
        this.$message.success('复制成功')
      })
    },
    /**
     * 生成 files 目录
     * @param fileTreeOriginal
     * @returns {*[]}
     */
    handleFiles(fileTreeOriginal) {
      const exists = {}
      const files = []
      // 遍历每个元素
      for (const data of fileTreeOriginal) {
        let paths = []
        if (data.v.includes('\\')) {
          paths = data.v.split('\\')
        } else {
          paths = data.v.split('/')
        }
        let fullPath = '' // 从头开始的路径，用于生成 id
        // 遍历每个 path， 拼接成树
        for (let i = 0; i < paths.length; i++) {
          // 已经添加到 files 中，则跳过
          const oldFullPath = fullPath
          // 下面的 replaceAll 的原因，是因为上面包处理了，导致和 tabs 不匹配，所以 replaceAll 下
          fullPath = fullPath.length === 0 ? paths[i] : fullPath.replaceAll('.', '/') + '/' + paths[i]
          if (exists[fullPath]) {
            continue
          }
          // 添加到 files 中
          exists[fullPath] = true
          files.push({
            id: fullPath,
            label: paths[i],
            parentId: oldFullPath || '/',
            templateName: data.k
          })
        }
      }
      return files
    },
    handleNodeClick(data, node) {
      if (node && !node.isLeaf) {
        return false
      }
      // 判断，如果非子节点，不允许选中
      this.activeName = data.templateName
    }
  }
}
</script>

<style scoped>
.copy {
  position: absolute;
  right: 10vh;
  top: 20px;
}
</style>
