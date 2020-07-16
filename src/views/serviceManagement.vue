<!-- 勤务管理 -->
<template>
  <div class="bg-white">
    <el-tabs v-model="activeName">
      <el-tab-pane label="勤务录入" name="add" >
        <service-add></service-add>
      </el-tab-pane>
      <el-tab-pane label="勤务查询" name="search">
        <service-search></service-search>
      </el-tab-pane>
      <el-tab-pane label="勤务统计" name="statistic">
        <service-statistic></service-statistic>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import serviceAdd from '@/components/serviceManagement/serviceAdd'
import serviceSearch from '@/components/serviceManagement/serviceSearch'
import serviceStatistic from '@/components/serviceManagement/serviceStatistic'
export default {
  components: {
    serviceAdd,
    serviceSearch,
    serviceStatistic
  },
  data () {
    return {
      activeName: 'add'
    }
  },
  methods: {
  }
}

</script>

<style lang='stylus' scoped>

</style>
