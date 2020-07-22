<!-- 绩效考核管理 -->
<template>
  <div class="bg-white clearfix">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="绩效统计" name="performanceStatistic">
          <performance-statistic></performance-statistic>
        </el-tab-pane>
        <el-tab-pane label="荣誉统计" name="honorStatistic">
          <honor-statistic></honor-statistic>
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="operationLog">
          <operation-log></operation-log>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn-right">
      <el-button type="primary" @click="addHonor">+个人荣誉</el-button>
      <el-button type="primary" @click="addPunishment">+个人处罚</el-button>
    </div>
    <div>
      <!-- 添加个人荣誉或处罚 -->
      <personal-honor-or-punishment :show='isShowHonorOrPunishmentDialog' :title="title" @updateShow='updateDialogShow'></personal-honor-or-punishment>
    </div>
  </div>
</template>

<script>
import performanceStatistic from '@/components/performanceManagement/performanceStatistic'
import honorStatistic from '@/components/performanceManagement/honorStatistic'
import operationLog from '@/components/performanceManagement/operationLog'
import personalHonorOrPunishment from '@/components/performanceManagement/personalHonorOrPunishment'
export default {
  components: {
    performanceStatistic,
    honorStatistic,
    operationLog,
    personalHonorOrPunishment
  },
  data () {
    return {
      activeName: 'performanceStatistic',
      isShowHonorOrPunishmentDialog: false,
      title: ''
    }
  },
  methods: {
    updateDialogShow(val) {
      this.isShowHonorOrPunishmentDialog = val
    },
    addHonor() {
      this.isShowHonorOrPunishmentDialog = true
      this.title = '新增个人荣誉'
    },
    addPunishment() {
      this.isShowHonorOrPunishmentDialog = true
      this.title = '新增个人处罚'
    }
  }
}

</script>

<style scoped>
.btn-right {
  position: absolute;
  top: 90px;
  right: 40px;
}
</style>
