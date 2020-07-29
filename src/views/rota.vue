<!-- 值班表一览 -->
<template>
  <div style="background: white; padding: 10px"> 
    <div style="display: flex;justify-content:space-between">
      <span>
        <el-button type="primary" icon="el-icon-message-solid" @click="drawer=true">请假</el-button>
        <span style="padding-left: 20px;margin-right: 12px;">{{date}}</span>
        <span style="font-size: 20px;">
          <i class="el-icon-refresh" style="color: #409eff;"></i>
        </span>
      </span>
      <span style="display: inline-block;height: 40px;line-height: 40px;font-size: 14px;" class="dataclass">
          <span >
           <i class="dot0 dot"></i>
           <span class="attrname">值班区队: </span>
           <span class="attrvalue0">三分队</span>
          </span>
          <span>
            <i class="dot1 dot"></i>
            <span class="attrname">备勤: </span>
            <span class="attrvalue1">109</span>
          </span>
          <span>
            <i class="dot2 dot"></i>
            <span class="attrname">出勤: </span>
            <span class="attrvalue2">104</span>
          </span>
          <span>
            <i class="dot3 dot"></i>
            <span class="attrname">请假: </span>
            <span class="attrvalue3">5</span>
          </span>
          <span>
            <i class="dot4 dot"></i>
            <span class="attrname">休息: </span>
            <span class="attrvalue4">59</span>
          </span>
          <span>
            <i class="dot5 dot"></i>
            <span class="attrname">值班: </span>
            <span class="attrvalue5">16</span>
          </span>
      </span>
    </div>
    <div>
      <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="中队"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="区队">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="分队">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="队员">
      </el-table-column>
    </el-table>
    </div>
    <!-- 右边抽屉 -->
    <el-drawer
    class="drawer_boder"
    title=""
    :visible.sync="drawer"
    :size="'500px'"
    >
    <div>
        <el-form   label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="" prop="name" >
              <div style="width: 300px;height: 32px;">
                <div class="leavecase" :class="{'bordershow':casetype===1}" @click="casetype=1">训练请假</div>
                <div class="leavecase" :class="{'bordershow':casetype===2}" @click="casetype=2">出勤请假</div>
              </div>
            </el-form-item>
            <el-form-item label="请假人" >
              <el-select v-model="ruleForm.people" style="width: 330px;" placeholder="请选择">
                <el-option
                  v-for="(item,key) in userlist"
                  :key="key"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间" >
              <el-date-picker
              style="width:200px;margin-right: 20px;"
                v-model="ruleForm.startDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <el-select v-model="ruleForm.startTime" style="width: 100px;" placeholder="请选择">
                <el-option  label="上午" value="1"></el-option>
                <el-option  label="下午" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结束时间" >
                <el-date-picker
                style="width:200px;margin-right: 20px;"
                  v-model="ruleForm.endDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker> 
                <el-select v-model="ruleForm.endTime" style="width: 100px;" placeholder="请选择">
                  <el-option  label="上午" value="1"></el-option>
                  <el-option  label="下午" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" >
              <el-input
                style="width: 330px;"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                resize="none"
                placeholder="请输入内容"
                v-model="ruleForm.textarea">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitBtn">提交</el-button>
              <el-button @click="drawer=false">取消</el-button>
            </el-form-item>
          </el-form>
    </div>
</el-drawer>
  </div>
</template>

<script>
import { getRotaList } from '@/api/home.js'
export default {
  data () {
    return {
      date: '',
      drawer:false,//右边抽屉默认不展开
      casetype:1,//默认训练请假
      userlist:[],//请假人list
      tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
        ruleForm: {
                people: '', //申请人
                startDate: '',//开始日期
                startTime:'',//开始时间
                endDate: '',//结束日期
                endTime:'',//结束时间
                textarea:''//备注
            },
            submitBtn:false,
            rules: {
                // name: [
                //     { required: true, message: '请输入姓名', trigger: 'blur' },
                // ]
                }
    }
  },
  created () {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()
    let day = new Date().getDay()
    switch (day) {
      case 1: day = '星期一'; break;
      case 2: day = '星期二'; break;
      case 3: day = '星期三'; break;
      case 4: day = '星期四'; break;
      case 5: day = '星期五'; break;
      case 6: day = '星期六'; break;
      case 0: day = '星期日'; break;
    }
    this.date = year + '年' + month + '月' + date + '日 ' + day
    this.getRotaList()
  },
  methods: {
    getRotaList () {
      let params = {
        rootId: 1
      }
      getRotaList(params).then(() => {

      }).catch()
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      // console.log(row, column)
        if (columnIndex === 0) { // 用于设置要合并的列
          if (rowIndex === 0) {
            return {
              rowspan: 8,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },

      // 表单提交
      submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // addRoleTableData(this.ruleForm).then((res) => { //添加数据之后的操作
                    // if(res.status===200){
                    //     this.initTableList()
                    //     this.drawer=false;
                    // }else{
                    //     this.$message.error(res.response);
                    // }
                    // }).catch()
                } else {
                this.submitBtn=true
                setTimeout(() => {
                this.submitBtn=false
                }, 500);
                return false;
                }
            });
        },
        resetForm(formName) {
         this.$refs[formName].resetFields();
        },
  }
}

</script>

<style  scoped>
   .dot{
     display: inline-block;
     width: 5px;
     height: 5px;
     border-radius: 50%;
   }
   .dot0{
    background-color: #409eff;
   }
   .attrvalue0{
     color:#409eff;
   }
   .dot1{
    background-color: #2B5270;
   }
   .attrvalue1{
     color:#2B5270;
   }
   .dot2{
    background-color: #52C41A;
   }
   .attrvalue2{
     color:#52C41A;
   }
   .dot3{
    background-color: #FAAD14;
   }
   .attrvalue3{
     color:#FAAD14;
   }
   .dot4{
    background-color: #CBBEFF;
   }
   .attrvalue4{
     color:#CBBEFF;
   }
   .dot5{
    background-color: #FF33F3;
   }
   .attrvalue5{
     color:#FF33F3;
   }
   .attrname{
     margin: 0 5px;
   }
   .dataclass>span{
     margin-left: 20px;
   }
   .leavecase{
       display: inline-block;
       width: 49%;
       border: 1px solid #eee;
       height: 32px;
       line-height: 32px;
       text-align: center;
   }
   .bordershow{
     border: 1px solid #409eff;
   }
</style>
