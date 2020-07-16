<!-- 车辆管理 -->
<template>
  <div class="bg-white">
    <el-tabs v-model="activeName">
      <el-tab-pane label="车辆状态" name="status">
        <car-status></car-status>
      </el-tab-pane>
      <el-tab-pane label="车辆管理" name="management">
        <car-manage></car-manage>
      </el-tab-pane>
      <el-tab-pane label="审验到期提醒" name="remind">
        <car-remind></car-remind>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CarStatus from '@/components/carManagement/carStatus'
import CarManage from '@/components/carManagement/carManage'
import CarRemind from '@/components/carManagement/carRemind'
export default {
  components: {
    CarStatus,
    CarManage,
    CarRemind
  },
  data () {
    return {
      activeName: 'status'
    }
  }
}

</script>

<style lang='stylus' scoped>

</style>
