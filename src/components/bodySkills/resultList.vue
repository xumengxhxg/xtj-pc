<!-- 成绩列表 -->
<template>
  <div>
    <el-drawer
      size='640px'
      :visible.sync="drawer"
      :before-close="handleClose">
      <div class="ph30">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="名次"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="address"
            label="成绩">
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      drawer: this.show,
      tableData: []
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
   watch: {
    show(val) {
      this.drawer = val
    },
    drawer(val) {
      this.$emit('updateShow', val)
    }
  }
}

</script>

<style lang='stylus' scoped>

</style>
