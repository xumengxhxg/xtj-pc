<!-- 成绩排名 -->
<template>
  <div class="bg-ededed">
    <div>
      <el-row :gutter="15" class="ant-row-flex align-items-stretch">
        <el-col :span="6" class="p10" style="height: auto;">
          <div class="p20 bg-white" style="height: 100%; box-sizing: border-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='left' class="demo-ruleForm">
              <el-form-item label="考核类型" prop="type">
                <el-radio-group v-model="ruleForm.type" style="width: 100%">
                  <el-radio :label="3">季度考核</el-radio>
                  <el-radio :label="6">月度考核</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="排列方式" prop="dept">
                <el-select v-model="ruleForm.dept" class="wp-100" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名次" prop="date" required>
                <el-date-picker type="date" class="wp-100" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="时间" prop="date" required>
                <el-date-picker type="date" class="wp-100" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item class="mt20">
                <el-button type="primary" class="wp-100">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="18" class="p10" style="height: auto">
          <div class="p10 bg-white" style="box-sizing: border-box">
            <div>查询结果</div>
            <div class="mt10">
              <el-tag size="small">标签一</el-tag>
            </div>
          </div>
          <div class="mt10">
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="bg-white pb20">
                  <div class="clearfix ph10">
                    <div class="pull-left" style="margin-top: 8px">3公里</div>
                    <div class="pull-right">
                      <el-button type="text"  @click="unfold">展开</el-button>
                    </div>
                  </div>
                  <!-- 列表 -->
                  <div>
                    <div class="clearfix p10 border-top" >
                      <div class="pull-left">
                        <span class="sort-number bg-f2b042">1</span>
                        <span>黄华</span>
                      </div>
                      <div class="pull-right date">
                        10'10
                      </div>
                    </div>
                    <div class="clearfix p10 border-top">
                      <div class="pull-left">
                        <span class="sort-number border-sort">2</span>
                        <span>黄华</span>
                      </div>
                      <div class="pull-right date">
                        10'10
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="bg-white pb20">
                  <div class="clearfix ph10">
                    <div class="pull-left" style="margin-top: 8px">双杠臂屈伸</div>
                    <div class="pull-right">
                      <el-button type="text" >展开</el-button>
                    </div>
                  </div>
                  <!-- 列表 -->
                  <div>
                    <div class="clearfix p10 border-top" >
                      <div class="pull-left">
                        <span class="sort-number">1</span>
                        <span>黄华</span>
                      </div>
                      <div class="pull-right date">
                        10'10
                      </div>
                    </div>
                    <div class="clearfix p10 border-top">
                      <div class="pull-left">
                        <span class="sort-number">2</span>
                        <span>黄华</span>
                      </div>
                      <div class="pull-right date">
                        10'10
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="bg-white pb20">
                  <div class="clearfix ph10">
                    <div class="pull-left" style="margin-top: 8px">单杠引体向上</div>
                    <div class="pull-right">
                      <el-button type="text" >展开</el-button>
                    </div>
                  </div>
                  <!-- 列表 -->
                  <div>
                    <div class="clearfix p10 border-top" >
                      <div class="pull-left">
                        <span class="sort-number">1</span>
                        <span>黄华</span>
                      </div>
                      <div class="pull-right date">
                        10'10
                      </div>
                    </div>
                    <div class="clearfix p10 border-top">
                      <div class="pull-left">
                        <span class="sort-number">2</span>
                        <span>黄华</span>
                      </div>
                      <div class="pull-right date">
                        10'10
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <result-list :show='isShowListDialog' @updateShow='updateShowDialog'></result-list>
    </div>
  </div>
</template>

<script>
import resultList from '@/components/bodySkills/resultList'
export default {
  components: {
    resultList
  },
  data () {
    return {
      isShowListDialog: false,
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
      }
    }
  },
  methods: {
    // 点击展开
    unfold() {
      this.isShowListDialog = true
    },
    updateShowDialog(val) {
      this.isShowListDialog = val
    }
  }
}

</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px !important;
}
.sort-number {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 14px;
}
.bg-f2b042 {
  background: #f2b042;
  color: #fff;
}
.border-sort {
  box-shadow: 0 0 0 1px #d9d9d9 inset;
}
.date {
  height: 21px;
  line-height: 21px;
}
.border-top {
  border-top: 1px solid #e8e8e8;
}
</style>

