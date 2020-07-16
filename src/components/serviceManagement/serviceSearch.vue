<!-- 勤务查询 -->
<template>
  <div class="pt10" style="background: #ededed">
    <div class="bg-white ph20 pv10">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="执行时间：">
          <el-date-picker
            v-model="formInline.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="勤务类型：">
          <el-select v-model="formInline.type" placeholder="请选择" clearable size="small">
            <el-option v-for="(item, index) in serviceType" :key="index" :label="item.chinese" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地点：">
          <el-input v-model="formInline.address" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getServiceList" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt10">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="beginTime" label="开始时间">
          <template slot-scope='scope'>
            {{scope.row.beginTime.slice(0, scope.row.endTime.lastIndexOf(':'))}}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
          <template slot-scope="scope">
            {{scope.row.endTime.slice(0, scope.row.endTime.lastIndexOf(':'))}}
          </template>
        </el-table-column>
        <el-table-column prop="serviceTypeZw" label="勤务类型"></el-table-column>
        <el-table-column prop="place" label="地点"></el-table-column>
        <el-table-column prop="number" label="人数" width="60"></el-table-column>
        <el-table-column prop="chargeName" label="负责人" width="100"></el-table-column>
        <el-table-column prop="chargeMobile" label="负责人电话"></el-table-column>
        <el-table-column label="出勤队员" width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.teamMemberName" placement="top">
              <span class="ellipsis">{{ scope.row.teamMemberName }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.isAppointed === 0 && scope.row.serviceStatus === 0" @click="handEnd">手动结束</el-button>
            <el-button type="text" v-if="scope.row.serviceStatus === 0">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="p10 pull-right">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/global'
import { getServiceList, getServiceType } from '@/api/serviceManagement'
export default {
  data () {
    return {
      formInline: {
        date: [],
        type: '',
        address: ''
      },
      tableData: [],
      serviceType: [],
      limit: 15,
      offset: 1,
      total: 0
    }
  },
  created() {
    let time = 24*60*60*1000*7
    let endTime = new Date().getTime() + time
    let start = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    let end = formatDate(new Date(endTime))
    // 设置默认时间段
    this.formInline.date = [start, end]
    this.getServiceList()
    this.getServiceType()
  },
  methods: {
    // 获取勤务类型列表
    getServiceList() {
      let params = {
        startDate: formatDate(this.formInline.date[0]),
        finishDate: formatDate(this.formInline.date[1]),
        serviceType: this.formInline.type,
        place: this.formInline.address,
        limit: this.limit,
        offset: this.offset
      }
      getServiceList(params).then((res) => {
        this.tableData = res.response.records
        this.total = res.response.total
      }).catch()
    },
    // 获取勤务类型数据
    getServiceType () {
      let params = {
        codeType: 5
      }
      getServiceType(params).then((res) => {
        this.serviceType = res.response
      }).catch()
    },
    // 手动结束
    handEnd() {
      this.$confirm('是否结束当前勤务任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })      
      })
    },
    // 分页-改变当前页码
    currentChange(val) {
      this.offset = (val - 1) * this.limit + 1
      this.getServiceList()
    }
  }
}

</script>

<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>
