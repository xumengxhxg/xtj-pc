<!-- 勤务录入 -->
<template>
  <div class="pt10" style="background: #ededed">
    <div class="clearfix bg-white pv10 ph20">
      <div class="pull-left title">勤务管理</div>
      <div class="pull-right">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small">
        </el-date-picker>
      </div>
    </div>
    <div class="bg-white p20 mt10">
      <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2" ></el-step>
        <el-step title="步骤 3" ></el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: [],
      active: 1
    }
  },
  methods: {
    next() {
      this.active++
      // if (this.active++ > 2) this.active = 1;
    }
  }
}

</script>

<style scoped>
.title {
  height: 35px;
  line-height: 35px;
}
</style>
