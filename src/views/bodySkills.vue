<!-- 体技能考核 -->
<template>
  <div class="bg-white">
    <el-tabs v-model="activeName">
      <el-tab-pane label="成绩录入查询" name="resultSearch">
        <result-search></result-search>
      </el-tab-pane>
      <el-tab-pane label="成绩排名" name="resultRank">
        <result-rank></result-rank>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import resultSearch from '@/components/bodySkills/resultSearch'
import resultRank from '@/components/bodySkills/resultRank'
export default {
  components: {
    resultSearch,
    resultRank
  },
  data () {
    return {
      activeName: 'resultSearch'
    }
  }
}

</script>
<style  scoped>

</style>
