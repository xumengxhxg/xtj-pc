<!-- 内部通讯录 -->
<template>
  <div class="pt10 bg-ededed">
    <div class="content bg-white p20">
      <!-- 左侧树 -->
      <div class="left-tree wp-20">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          clearable>
        </el-input>

        <el-tree
          class="filter-tree mt10"
          :data="treeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :default-expanded-keys="[1]"
          :expand-on-click-node='expandNode'
          :default-checked-keys="[1]"
          :current-node-key='1'
          highlight-current
          @node-click="handleNodeClick"
          node-key="id"
          ref="tree">
        </el-tree>
      </div>
      <!-- 右侧表格 -->
      <div class="right-list wp-80 ph20">
        <div class="top clearfix">
          <div class="ft-size-21 pull-left">
            苏州市公安局姑苏分局
          </div>
          <div class="pull-right">
            <el-button type="primary" size="medium" @click="downloadUserInfo">导出</el-button>
            <el-button size="medium" @click="refresh">刷新</el-button>
          </div>
        </div>
        <div class="mt20">
          <!-- 下级部门 -->
          <div v-if="checkedNode.length">
            <div>下级部门</div>
            <div>
              <ul v-if="checkedNode && checkedNode.length > 0">
                <li class="clearfix cursor" v-for="(item, index) in checkedNode" :key="index" @click="getChildrenNode(item)">
                  <div>
                    <div class="pull-left">
                      {{item.name}}
                    </div>
                    <div class="pull-right">
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 部门人员 -->
          <div class="mt20">
            <div>部门人员</div>
            <div class="mt20">
              <el-table
                :data="currentNode.users || [currentNode]"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="sex"
                  label="性别"
                  width="60">
                </el-table-column>
                <el-table-column
                  label="职位/部门">
                  <template slot-scope="scope">
                    <el-tag size="small">{{scope.row.dept}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  label="年龄"
                  align="center">
                  <template slot-scope="scope">
                    {{age(scope.row.birthTime) || '-'}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="certNo"
                  label="身份证号">
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="confirmJoinTime"
                  label="入职时间">
                </el-table-column>
              </el-table>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonnelTree, downloadUserInfo } from '@/api/personnel'
export default {
  name: 'addressBook',
  data () {
    return {
      expandNode: false, // 当点击树节点的箭头裁展开树
      filterText: '',
      defaultProps: {
        children: 'subDepartment',
        label: 'name',
      },
      treeData: [],
      currentNode: {}
    }
  },
  created() {
    this.getPersonnelTree()
    // this.$nextTick(() => {
      setTimeout(() => {
        this.currentNode = this.$refs.tree.getCurrentNode()
      }, 1000)
    // })
  },
  computed: {
    checkedNode() {
      if(this.currentNode.subDepartment){
        return this.currentNode.subDepartment.filter((item) => {
          return !item.userid
        })
      } else {
        return []
      }
    }
  },
  methods: {
    downloadUserInfo() {
      // let params = {
      //   quitStatus: 0,
      //   deptIds: this.currentNode.id
      // }
      // downloadUserInfo(params).then(() => {
      // }).catch()
      window.location.href = 'http://localhost' + '/download/userinfo?quitStatus=0' + '0&deptIds=' + this.currentNode.id
    },
    refresh() {
      this.getPersonnelTree()
      // this.$nextTick(() => {
        setTimeout(() => {
          this.currentNode = this.$refs.tree.getCurrentNode()
        }, 2000)
      // })
    },
    getChildrenNode(item) {
      console.log(item)
      this.currentNode = item
    },
    handleNodeClick(node) {
      this.currentNode = node
      console.log(node)
    },
    getPersonnelTree() {
      let params = {
        rootId: 1
      }
      getPersonnelTree(params).then((res) => {
        this.treeData = [res.response]
        this.treeData[0].subDepartment.push(...this.treeData[0].users) // 一级目录
        if (this.treeData[0].subDepartment) {
          this.treeData[0].subDepartment.forEach((item) => {
            if (item.subDepartment) {
              item.subDepartment.push(...item.users) // 二级目录
              if (item.subDepartment && item.subDepartment.length > 0) {
                item.subDepartment.forEach((sub) => {
                  if(sub.users && sub.users.length > 0) {
                    sub['subDepartment'] = [] // 三级目录
                    sub.subDepartment.push(...sub.users)
                  }
                })
              }
            } else {
              item.subDepartment = []
              item.subDepartment.push(...item.users) // 二级目录
              // item.subDepartment.forEach((sub) => {
              //   if(sub.users && sub.users.length > 0) {
              //     sub['subDepartment'] = [] // 三级目录
              //     sub.subDepartment.push(...sub.users)
              //   }
              // })
            }
          })
        }
      }).catch()
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 计算年纪
    age (val) {
      if (val) {
        return new Date().getFullYear() - val.split('/')[0]
      }
      return ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
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
ul {
  list-style: none;
  padding-left: 0px;
}
ul li {
  padding: 10px 10px;
  border-bottom: 1px solid #ededed;
}
</style>
