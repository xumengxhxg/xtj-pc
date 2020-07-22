<!-- 新增编辑车辆 -->
<template>
  <div>
    <el-drawer
      size='640px'
      title="请假"
      :visible.sync="drawer"
      :before-close="handleClose">
      <div>
        <div class="ph30">
          <el-radio-group v-model="leaveType" style="padding-left: 35%">
            <el-radio-button label="训练请假"></el-radio-button>
            <el-radio-button label="出勤请假"></el-radio-button>
          </el-radio-group>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm mt30 ph30">
          <el-form-item label="请假人：" prop="name" class="mb10">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="开始时间：" prop="beginDate" class="mb10" required>
            <el-date-picker
              v-model="ruleForm.beginDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：" prop="endDate" required>
            <el-date-picker
              v-model="ruleForm.endDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注：" prop="note">
            <el-input v-model="ruleForm.note"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer text-right mt10 w-640">
        <el-button type="primary" size="medium">提交</el-button>
        <el-button size="medium">取消</el-button>
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
      car: {},
      leaveType: '训练请假',
      ruleForm: {
        name: '',
        beginDate: '',
        endDate: '',
        note: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log(this.show)
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

<style scoped>
.el-form-item {
  margin-bottom: 25px;
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
