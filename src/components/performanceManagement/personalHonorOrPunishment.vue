<!-- 添加个人荣誉或处罚 -->
<template>
  <div>
    <el-drawer
      size='640px'
      :title="title"
      :visible.sync="drawer"
      :before-close="handleClose">
      <div class="ph30">
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width='100px' label-position='right' class="demo-ruleForm">
            <el-form-item label="类型:" prop="type">
              <el-select v-model="ruleForm.type" class="wp-100" >
                <el-option v-for="(item, index) in honorType"  :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="获奖人:" prop="name">
              <tree-select :options="treeData" placeholder="请选择人员" v-model="ruleForm.name"/>
            </el-form-item>
            <el-form-item label="获奖时间:" prop="date" required>
              <el-date-picker type="date" class="wp-100" placeholder="选择日期" v-model="ruleForm.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="奖金:" prop="bonus">
              <el-input placeholder="请输入奖金" v-model="ruleForm.bonus"></el-input>
            </el-form-item>
            <el-form-item label="分值:" prop="score">
              <el-input placeholder="请输入分值" v-model="ruleForm.score"></el-input>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input v-model="ruleForm.note"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer text-right mt10 w-640">
          <el-button type="primary" size="medium" @click="submit">提交表单</el-button>
          <el-button size="medium">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getTree } from '@/api/performanceManagement'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  props: {
    show: {
      type: Boolean
    },
    title: {
      type: String
    }
  },
  components: {
    TreeSelect
  },
  data () {
    return {
      drawer: this.show,
      ruleForm: {
        type: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择人员', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择获奖日期', trigger: 'blur' }
        ],
        bonus: [
          { required: true, message: '请输入奖金', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入分值', trigger: 'blur' }
        ]
      },
      honorType: [],
      treeData: []
    }
  },
  created() {
    console.log(this.title, 987655)
    // if (this.title === '新增个人处罚') {
    //   this.honorType = [{
    //     label: '个人处罚',
    //     value: '个人处罚'
    //   }]
    // } else {
    //   this.honorType = [{
    //     label: '记功',
    //     value: '记功'
    //   }, {
    //     label: '记大功',
    //     value: '记大功'
    //   }, {
    //     label: '嘉奖',
    //     value: '嘉奖'
    //   }, {
    //     label: '其他',
    //     value: '其他'
    //   }, {
    //     label: '岗位标兵和岗位能手',
    //     value: '岗位标兵和岗位能手'
    //   }]
    // }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 获取人员树
    getTree() {
      let params = {
        rootId: 1
      }
      getTree(params).then((res) => {
        this.treeData = [res.response]
        this.treeData[0].subDepartment.push(...this.treeData[0].users) // 一级目录
        if (this.treeData[0].subDepartment) {
          this.treeData[0].subDepartment.forEach((item) => {
            if (item.subDepartment) {
              item.subDepartment.push(...item.users) // 二级目录
              if (item.subDepartment && item.subDepartment.length > 0) {
                item.subDepartment.forEach((sub) => {
                  if(sub.users && sub.users.length > 0) {
                    sub['subDepartment'] = [] // 三级目录
                    sub.subDepartment.push(...sub.users)
                  }
                })
              }
            } else {
              item.subDepartment = []
              item.subDepartment.push(...item.users) // 二级目录
              // item.subDepartment.forEach((sub) => {
              //   if(sub.users && sub.users.length > 0) {
              //     sub['subDepartment'] = [] // 三级目录
              //     sub.subDepartment.push(...sub.users)
              //   }
              // })
            }
          })
        }
      }).catch()
    },
    // 提交
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
        } else {
          return false
        }
      })
    }
  },
  watch: {
    show(val) {
      this.drawer = val
      if (this.drawer) {
        if (this.title === '新增个人处罚') {
          this.honorType = [{
            label: '个人处罚',
            value: '个人处罚'
          }]
        } else {
          this.honorType = [{
            label: '记功',
            value: '记功'
          }, {
            label: '记大功',
            value: '记大功'
          }, {
            label: '嘉奖',
            value: '嘉奖'
          }, {
            label: '其他',
            value: '其他'
          }, {
            label: '岗位标兵和岗位能手',
            value: '岗位标兵和岗位能手'
          }]
        }
      }
    },
    drawer(val) {
      this.$emit('updateShow', val)
    }
  }
}

</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
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