<!-- 操作日志 -->
<template>
  <div class="bg-ededed">
    <div class="pt10">
      <div class="bg-white p20">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="operateUser"
            label="操作人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="operateType"
            label="操作类型">
          </el-table-column>
          <el-table-column
            prop="operateTime"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="operateContent"
            label="操作内容">
          </el-table-column>
        </el-table>
        <div class="clearfix">
          <el-pagination background class="pull-right mt20" layout="prev, pager, next" :total="total"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOperationLog } from '@/api/performanceManagement'
export default {
  data () {
    return {
      tableData: [],
      current: 1,
      total: 0
    }
  },
  methods: {
    getOperationLog() {
      let params = {
        size: 10,
        current: this.current
      }
      getOperationLog(params).then(() => {
        this.tableData = res.response.records
        this.total = res.response.total
      }).catch()
    }
  }
}

</script>

<style lang='stylus' scoped>

</style>
