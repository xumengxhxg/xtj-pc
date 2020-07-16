<!-- 勤务统计 -->
<template>
  <div style="background: #ededed">
    <div class="pt10">
      <div class="bg-white clearfix ph20 pv10">
        <div class="pull-left title">勤务统计</div>
        <div class="pull-right title">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small">
          </el-date-picker>
        </div>
      </div>
    </div>
    <el-row :gutter="20" class="ant-row-flex align-items-stretch">
      <el-col :span="8" class="p10" style="height: auto;">
        <div class="p10 bg-white" style="height: 100%; box-sizing: border-box">
          <div class="clearfix">
            <div class="pull-left title">
              大队统计
              <el-button size="small" type="primary" class="ml5">导出</el-button>
            </div>
            <div class="pull-right">
              <el-button type="text" @click="getUnitList">刷新</el-button>
            </div>
          </div>
          <div>
            <el-table :data="unitList" style="width: 100%">
              <el-table-column prop="serviceTypeZw" label="勤务类型"></el-table-column>
              <el-table-column prop="outNum" label="出勤次数"></el-table-column>
              <el-table-column prop="personNum" label="出勤人数"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="16" class="p10" style="height: auto">
        <div class="p10 bg-white" style="height: 100%; box-sizing: border-box">
          <div class="clearfix">
            <div class="pull-left title">
              区队统计
              <el-button size="small" type="primary" class="ml5">导出</el-button>
            </div>
            <div class="pull-right">
              <el-button type="text" @click="getDeptList">刷新</el-button>
            </div>
          </div>
          <div>
            <el-table :data="deptList" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  {{scope.row.dept}}
                </template>
              </el-table-column>
              <el-table-column v-for="(item, index) in serviceType" :key="index" :label="item.chinese">
                <template slot-scope="scope">
                  <span v-for="(service, i) in scope.row.countInfo" :key="i">
                    <span v-if="service.serviceType == item.id">
                      {{service.outNum}}次/{{service.personNum}}人
                    </span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <div class="clearfix">
              <el-pagination background layout="prev, pager, next" :page-size="pageSize"  :total="total" class="pull-right mt10" @current-change='currentChange'></el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
     <div style="height: auto" class="bg-white clearfix p10">
       <div class="pull-left ph10" style="width: 25%; border-right: 2px solid #ededed; box-sizing: border-box">
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
       <div class="pull-right" style="width: 75%;">
         <div>
           <div class="clearfix ph10">
             <div class="pull-left pt10">
               <span v-if="currentNode.name">
                  <span class="name">{{currentNode.name}}</span>
                  <el-tag size="small" v-if="currentNode.dept">{{currentNode.dept}}</el-tag>
               </span>
               <span v-else class="name">请选择</span>
             </div>
             <div class="pull-right">
               <el-button type="text" @click="refresh">刷新</el-button>
             </div>
           </div>
           <div>
            <el-tabs v-model="activeName">
              <el-tab-pane label="个人统计" name="first">
                <div class="pt20 ph20">
                  <el-row>
                    <el-col :span="8" v-for="(item, index) in serviceType" :key="index" class="mb10">
                      <span>
                        {{item.chinese}}:
                      </span>
                      <span>
                        <span v-for="(inf, i) in info" :key="i">
                          <span v-if="inf.serviceType === item.id">
                            {{inf.outNum}}次
                          </span>
                          <span v-else>-</span>
                        </span>
                      </span>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="出勤详细" name="second">
                <div class="ph20">
                  <el-table :data="serviceList" style="width: 100%">
                    <el-table-column prop="chargeName" label="负责人" width="80"></el-table-column>
                    <el-table-column prop="chargeMobile" label="负责人电话" width="120"></el-table-column>
                    <el-table-column prop="serviceTypeZw" label="勤务类型" width="90"></el-table-column>
                    <el-table-column prop="number" label="人数" width="60"></el-table-column>
                    <el-table-column prop="beginTime" label="开始时间" width="100">
                      <template slot-scope="scope">
                        {{scope.row.beginTime.slice(0, scope.row.beginTime.lastIndexOf(':'))}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="endTime" label="结束时间" width="100">
                      <template slot-scope="scope">
                        {{scope.row.endTime.slice(0, scope.row.endTime.lastIndexOf(':'))}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="place" label="地点" width="100"></el-table-column>
                    <el-table-column prop="teamMemberName" label="出勤队员姓名">
                      <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.teamMemberName" placement="top">
                          <span class="ellipsis">{{ scope.row.teamMemberName }}</span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
           </div>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/global'
import { getPersonnelTree } from '@/api/personnel'
import { getUnitList, getDeptList, getServiceType, getServicePersonCount, getServiceUser } from '@/api/serviceManagement'
export default {
  data () {
    return {
      activeName: 'first',
      date: [],
      ddData: [],
      qdData: [],
      unitList: [],
      deptList: [],
      expandNode: false, // 当点击树节点的箭头裁展开树
      filterText: '',
      defaultProps: {
        children: 'subDepartment',
        label: 'name',
      },
      treeData: [],
      currentNode: {},
      current: 1,
      pageSize: 3,
      total: 0,
      serviceType: [], // 勤务类型
      info: [],
      serviceList: [] // 出勤明细
    }
  },
  created() {
    // this.getUnitList()
    // 当月最后一天的毫秒数
    let endTime = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getTime() - 1000*60*60*24
    let endDte = new Date(endTime).getDate()
    let start = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + '01'
    let end = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + endDte
    // 设置默认时间段
    this.date = [start, end]
    this.getDeptList()
    this.getUnitList()
    this.getServiceType()
    this.getTree()
  },
  methods: {
    refresh() {
      this.getServicePersonCount()
      this.getServiceUser()
    },
    // 大队统计
    getUnitList() {
      let params = {
        beginDate: formatDate(this.date[0]),
        endDate: formatDate(this.date[1])
      }
      getUnitList(params).then((res) => {
        this.unitList = res.response
      }).catch()
    },
    // 区队统计
    getDeptList() {
      let params = {
        beginDate: formatDate(this.date[0]),
        endDate: formatDate(this.date[1]),
        currentPage: this.current,
        avgRows: this.pageSize
      }
      getDeptList(params).then((res) => {
        this.deptList = res.response.items
        this.total = res.response.total
      }).catch()
    },
    // 个人统计
    getServicePersonCount() {
      let params = {
        beginDate: formatDate(this.date[0]),
        endDate: formatDate(this.date[1]),
        userId: this.currentNode.userid
      }
      getServicePersonCount(params).then((res) => {
        this.info = res.response[0].countInfo
      }).catch()
    },
    // 出勤明细
    getServiceUser() {
      let params = {
        beginDate: formatDate(this.date[0]),
        endDate: formatDate(this.date[1]),
        userid: this.currentNode.userid
      }
      getServiceUser(params).then((res) => {
        if (res.response[0] && res.response[0].service) {
          this.serviceList = [res.response[0].service]
        }
      }).catch()
    },
    // 获取勤务类型
    getServiceType() {
      let params = {
        codeType: 5 // 勤务类型
      }
      getServiceType(params).then((res) => {
        this.serviceType = res.response
      }).catch()
    },
    getTree() {
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
    // 区队统计分页
    currentChange (val) {
      this.current = val
      this.getDeptList()
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(node) {
      if (node.userid) {
        this.currentNode = node
        this.getServicePersonCount()
        this.getServiceUser()
        console.log(node)
      }
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
.title {
  height: 39.6px;
  line-height: 39.6px;
}
.el-tabs .el-tabs--top .el-tabs__header {
  padding: 20px 0px 0px !important;
}
.name {
  font-size: 20px;
  margin-right: 10px;
  padding-top: 5px;
}
</style>
