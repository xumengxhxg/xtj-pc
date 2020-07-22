<!-- 成绩录入查询 -->
<template>
  <div class="bg-ededed">
    <div>
      <el-row :gutter="20" class="ant-row-flex align-items-stretch">
        <el-col :span="6" class="p10" style="height: auto;">
          <div class="p20 bg-white" style="height: 100%; box-sizing: border-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='left' class="demo-ruleForm">
              <el-form-item label="考核类型" prop="type">
                <el-radio-group v-model="ruleForm.type" style="width: 100%">
                  <el-radio :label="7">季度考核</el-radio>
                  <el-radio :label="49">月度考核</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="部门" prop="dept">
                <el-select v-model="ruleForm.dept" class="wp-100" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间" prop="date" required>
                <el-date-picker type="date" class="wp-100" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="选择科目" prop="subject">
                <!-- <el-checkbox class="wp-100" v-model="ruleForm.subject">全选</el-checkbox> -->
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="3公里" class="wp-100"></el-checkbox>
                  <el-checkbox label="双杠臂屈伸" class="wp-100" ></el-checkbox>
                  <el-checkbox label="单杠引体向上" class="wp-100"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <div>
                  <el-button type="text">下载模板</el-button>
                </div>
                <el-button type="primary" class="wp-100">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="18" class="p10" style="height: auto">
          <div class="p20 bg-white" style="height: 100%; box-sizing: border-box">
            <div class="top-tab">
              <div>
                <span class="mr20" >一分队</span>
                <span>
                  <el-button type="text">刷新</el-button>
                </span>
              </div>
              <div>
                <el-tag size="small">季度考核</el-tag>
              </div>
            </div>
            <div>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  label="3公里">
                </el-table-column>
                <el-table-column
                  label="双杠臂屈伸">
                </el-table-column>
                <el-table-column
                  label="单杠引体向上">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getDeptInfo, getSearchList } from '@/api/bodySkills'
export default {
  data () {
    return {
      ruleForm: {
        type: '',
        dept: '',
        date: '',
        subject: ''
      },
      rules: {
        type: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        dept: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        subject: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      },
      checkList: [],
      tableData: []
    }
  },
  methods: {
    getDeptInfo() {
      let params = {
        id: ''
      }
      getDeptInfo(params).then().catch()
    },
    getSearchList() {
      let params = {
        examinationTime: '',
        deptId: '',
        examinationType: ''
      }
      getSearchList(params).then().catch()
    }
  }
}

</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px !important
}
.top-tab {
  border-bottom: 1px solid #ededed;
  padding-bottom: 20px;
}
</style>
