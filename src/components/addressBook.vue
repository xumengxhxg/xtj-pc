<!-- 内部通讯录 -->
<template>
  <div class="content">
    <!-- 左侧树 -->
    <div class="left-tree wp-20">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree mt10"
        :data="treeData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        ref="tree">
      </el-tree>
    </div>
    <!-- 右侧表格 -->
    <div class="right-list wp-80 ph20">
      <div class="top clearfix">
        <div class="ft-size-21 pull-left">
          苏州
        </div>
        <div class="pull-right">
          <el-button type="primary" size="medium">导出</el-button>
          <el-button size="medium">刷新</el-button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { getPersonnelTree } from '@/api/personnel'
export default {
  name: 'addressBook',
  data () {
    return {
      filterText: '',
      defaultProps: {
        children: 'subDepartment' || 'users',
        label: 'name',
      },
      treeData: []
    }
  },
  created() {
    this.getPersonnelTree()
  },
  methods: {
    getPersonnelTree() {
      let params = {
        rootId: 1
      }
      getPersonnelTree(params).then((res) => {
        this.treeData = [res.response]
      }).catch()
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
}

</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
}
.left-tree {
  flex: 1
}
.right-list {
  flex: 4
}
.top {
  border-bottom: 1px solid #ededed;
  padding-bottom: 20px;
}
</style>
