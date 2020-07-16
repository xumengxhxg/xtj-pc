<!-- 新增编辑车辆 -->
<template>
  <div>
    <el-drawer
      size='640px'
      title="新增车辆"
      :visible.sync="drawer"
      :before-close="handleClose">
      <div class="ph30">
        <!-- <div>
          <ul>
          </ul>
        </div> -->
        <div>
          <el-form :model="car" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="车牌号" prop="plateNumber">
              <el-input v-model="car.plateNumber"></el-input>
            </el-form-item>
            <el-form-item label="车辆编号" prop="carNumber">
              <el-input v-model="car.carNumber"></el-input>
            </el-form-item>
            <el-form-item label="准驾驾照类型" required>
              <el-input v-model="car.carType"></el-input>
            </el-form-item>
            <el-form-item label="核载人数" prop="number">
              <el-input v-model="car.number"></el-input>
            </el-form-item>
            <el-form-item prop="carCheckTime">
              <div>审验时间</div>
              <el-date-picker v-model="car.carCheckTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item prop="carRegisterTime">
              <div>注册时间</div>
              <el-date-picker v-model="car.carRegisterTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item prop="carCheckTime">
              <div>审验时间</div>
              <el-date-picker v-model="car.carCheckTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item prop="carRegisterTime">
              <div>注册时间</div>
              <el-date-picker v-model="car.carRegisterTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item> -->
          </el-form>
        </div>
         <div class="footer text-right mt10 w-640">
          <el-button type="primary" size="medium">提交</el-button>
          <el-button size="medium">取消</el-button>
        </div>
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
      car: {}
    }
  },
  created() {
    console.log(this.show)
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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

<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
.footer {
  width: 640px;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 101;
  background: #fff;
  -webkit-box-shadow: rgba(0,0,0,.2) 2px 0 4px;
  box-shadow: rgba(0,0,0,.2) 2px 0 4px;
  border-top: 1px solid #e8e8e8;
  height: 56px;
  line-height: 56px;
  text-align: right;
  padding-right: 20px;
  box-sizing: border-box;
}
/* .el-drawer__body {
  overflow: auto !important;
  padding-bottom: 80px !important;
} */
</style>
