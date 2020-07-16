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
              <el-button type="text">刷新</el-button>
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
                    <span v-if="service.serviceType === item.id">
                      {{service.outNum}}次/{{service.personNum}}人
                    </span>
                  </span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="beginTime" label="安防"></el-table-column>
              <el-table-column prop="endTime" label="疫情防控"></el-table-column>
              <el-table-column prop="serviceTypeZw" label="安保"></el-table-column>
              <el-table-column prop="beginTime" label="协助其他部门"></el-table-column>
              <el-table-column prop="endTime" label="城管整治"></el-table-column>
              <el-table-column prop="serviceTypeZw" label="外出学习"></el-table-column>
              <el-table-column prop="beginTime" label="维稳"></el-table-column>
              <el-table-column prop="endTime" label="武装巡逻"></el-table-column>
              <el-table-column prop="serviceTypeZw" label="出差"></el-table-column> -->
            </el-table>
            <div class="clearfix">
              <el-pagination background layout="prev, pager, next" :total="total" class="pull-right mt10" @current-change='currentChange'></el-pagination>
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
             <div class="pull-left"></div>
             <div class="pull-right">
               <el-button type="text">刷新</el-button>
             </div>
           </div>
           <div>
            <el-tabs v-model="activeName">
              <el-tab-pane label="个人统计" name="first">
                <div class="pt20 ph20">
                  <el-row>
                    <el-col v-for="(item, index) in serviceType" :key="index">
                      <span>
                        {{item.chinese}}:
                      </span>
                      <span>
                        <span v-for="(info, i) in countInfo" :key="i">
                          <span v-if="info.serviceType === item.id">
                            {{info.outNum}}次
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
                    <el-table-column prop="chargeName" label="负责人"></el-table-column>
                    <el-table-column prop="chargeMobile" label="负责人电话"></el-table-column>
                    <el-table-column prop="serviceTypeZw" label="勤务类型"></el-table-column>
                    <el-table-column prop="number" label="人数"></el-table-column>
                    <el-table-column prop="beginTime" label="开始时间"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间"></el-table-column>
                    <el-table-column prop="place" label="地点"></el-table-column>
                    <el-table-column prop="teamMemberName" label="出勤队员姓名"></el-table-column>
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
    console.log(this.date)
  },
  methods: {
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
        this.deptList = res.response
        this.total = res.response.total
      }).catch()
    },
    // 个人统计
    getServicePersonCount() {
      let params = {
        beginDate: this.date[0],
        endDate: this.date[1],
        userid: this.currentNode.userid
      }
      getServicePersonCount(params).then((res) => {
        this.info = res.response[0].countInfo
      }).catch()
    },
    // 出勤明细
    getServiceUser() {
      let params = {
        beginDate: this.date[0],
        endDate: this.date[1],
        userid: this.currentNode.userid
      }
      getServiceUser(params).then((res) => {
        this.serviceList = [res.response[0].service]
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
</style>
