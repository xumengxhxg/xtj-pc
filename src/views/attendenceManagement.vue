<!-- 考勤管理 -->
<template>
  <div class="">
    <div class="clearfix p10 bg-white">
      <div class="pull-left" style="margin-top: 5px">请假统计</div>
      <div class="pull-right">
        <el-button type="primary" size="small" @click="leave">请假</el-button>
      </div>
    </div>
    <div class="mt10 content bg-white p20">
        <!-- 左侧树 -->
      <div class="left-tree wp-20">
        <el-input
          placeholder="请输入姓名"
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
            {{currentNode.name}}
          </div>
          <div class="pull-right">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small">
            </el-date-picker>
            <el-button type="primary" size="small" >导出</el-button>
          </div>
        </div>
        <div class="mt20">
          <!-- 下级部门 -->
          <!-- <div v-if="checkedNode.length">
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
          </div> -->
          <!-- 部门人员 -->
          <div class="mt20">
            <!-- <div>部门人员</div> -->
            <div class="mt20">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="100">
                </el-table-column>
                <el-table-column
                  label="职位/部门">
                  <template slot-scope="scope">
                    <el-tag size="small">{{scope.row.dept}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  label="事假">
                </el-table-column>
                <el-table-column
                  label="病假">
                </el-table-column>
                <el-table-column
                  label="年假">
                </el-table-column>
                <el-table-column
                  label="婚假">
                </el-table-column>
                <el-table-column
                  label="调休">
                </el-table-column>
                <el-table-column
                  label="护理假">
                </el-table-column>
                <el-table-column
                  label="产假">
                </el-table-column>
                <el-table-column
                  label="陪产假">
                </el-table-column>
                <el-table-column
                  label="丧假">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <leave :show='showLeaveDialog' @updateShow='updateShow'></leave>
  </div>
</template>

<script>
import { formatDate } from '@/utils/global'
import { getPersonnelTree } from '@/api/personnel'
import { getleaveCount } from '@/api/attendenceManagement'
import leave from '@/components/attendenceManagement/leave'
export default {
  components: { leave },
  data () {
    return {
      expandNode: false, // 当点击树节点的箭头裁展开树
      filterText: '',
      defaultProps: {
        children: 'subDepartment',
        label: 'name',
      },
      treeData: [],
      currentNode: {},
      date: [],
      tableData: [],
      showLeaveDialog: false
    }
  },
  created() {
    // 当月最后一天的毫秒数
    let endTime = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getTime() - 1000*60*60*24
    let endDte = new Date(endTime).getDate()
    let start = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + '01'
    let end = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + endDte
    // 设置默认时间段
    this.date = [start, end]
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
    leave() {
      this.showLeaveDialog =true
    },
    updateShow(val) {
      this.showLeaveDialog = val
    },
    getleaveCount () {
      let params = {
        name: '',
        beginDate: formatDate(this.date[0]),
        endDate: formatDate(this.date[1]),
        userid: !this.currentNode.hasOwnProperty('users')? this.currentNode.userid : '',
        deptIds: this.currentNode.hasOwnProperty('users') ? this.currentNode.id : ''
      }
      getleaveCount(params).then((res) => {
        res.response.forEach((item, index) => {
          if (item.detailDTOS.length > 0) {
            this.tableData.push(item)
          }
        })
        // this.tableData = res.response
      }).catch()
    },
    getChildrenNode(item) {
      console.log(item)
      this.currentNode = item
    },
    handleNodeClick(node) {
      this.currentNode = node
      this.getleaveCount()
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
