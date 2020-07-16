<!-- 人事提醒 -->
<template>
  <div class="pt10 bg-ededed">
    <div class="bg-white p20">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查询日期">
          <el-date-picker
            v-model="date"
            type="month"
            placeholder="选择月"
            size="medium"
            @change='getUserInfo'>
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="toCurrentMonth">回到本月</el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择编制">
          <el-button type="primary" size="medium">全部</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-tabs v-model="activeName" class="mt20 bg-white"  @tab-click='getUserInfo'>
      <el-tab-pane label="本月生日" name="first">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="dept" label="职位/部门"></el-table-column>
          <el-table-column prop="organization" label="编制"></el-table-column>
          <el-table-column prop="sex" label="性别" width="180" align="center"></el-table-column>
          <el-table-column  label="生日" width="180" align="center">
            <template slot-scope="scope">
              {{transformBirthTime(scope.row.birthTime)}}
            </template>
          </el-table-column>
          <el-table-column prop="birthTime" label="年龄" width="180" align="center">
            <template slot-scope="scope">
              {{age(scope.row.birthTime)}}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="本月合同到期" name="second">
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="dept" label="职位/部门"></el-table-column>
          <el-table-column prop="organization" label="编制"></el-table-column>
          <el-table-column prop="sex" label="性别" width="180" align="center"></el-table-column>
          <el-table-column prop="date" label="合同到期日" width="180">
            <template slot-scope="scope">
              {{scope.row.nowContractEndTime}}
            </template>
          </el-table-column>
          <el-table-column label="合同类型" width="180">
            <template slot-scope="scope">
              {{scope.row.contractType}}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/personnel'
import { formatDate } from '@/utils/global'
export default {
  name: 'personnelRemind',
  data () {
    return {
      date: '',
      activeName: 'first',
      tableData: [],
      tableData2: []
    }
  },
  created() {
    this.date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
    this.getUserInfo()
  },
  methods: {
    // 回到本月
    toCurrentMonth () {
      this.date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
      this.getUserInfo()
    },
    getUserInfo() {
      if (this.activeName === 'first') {
        let params = {
          quitStatus: 0,
          birthTime: formatDate(this.date),
          organization: ''
        }
        getUserInfo(params).then((res) => {
          this.tableData = res.response
        }).catch()
      } else {
        let params = {
          quitStatus: 0,
          nowContractEndTime: formatDate(this.date),
          organization: ''
        }
        getUserInfo(params).then((res) => {
          this.tableData2 = res.response
        }).catch()
      }
    },
    // 转换时间为生日
    transformBirthTime (val) {
      if (val) {
        return val.split('/')[1] + '月' + val.split('/')[2].slice(0, 2) + '日'
      }
      return ''
    },
    // 计算年纪
    age (val) {
      if (val) {
        return new Date().getFullYear() - val.split('/')[0]
      }
      return ''
    }
  }
}

</script>

<style  scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>
