<template>
  <div style="padding: 24px 0;">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-tabs :tab-position="'left'" style="padding-left: 0px;"  v-model="indexItem"  @tab-click="menuChange">
          <el-tab-pane v-for="(item,key) in menulist" :key="key" :name="(''+key)"  style="padding: 4px 0;" >
            <div slot="label" :class="{'itemFontClass':indexItem==(''+key)}" style="min-width: 180px;text-align: left;height: 48px;line-height: 48px;font-size: 14px;white-space: nowrap; cursor: pointer;color: rgba(0,0,0,0.65);">
              <span :class="item.icon"></span>
              <span >{{item.text}}</span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="20">
          <el-main style="padding-left: 0px;" >
              <div style="display: flex;justify-content:space-between;padding: 0 24px;">
                <span style="font-size: 1.5rem;">
                    {{indexH}}
                </span>
                <span>
                    <el-button icon="el-icon-refresh" style="margin-right: 15px;">刷新</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="changeData(1)"  >添加</el-button>
                </span>
            </div>
            <div style="padding: 10px 24px;"">
                <el-table
                    :data="tableObj.records"
                    style="width: 100%">
                    
                    <el-table-column
                    prop="date"
                    label=""
                    >
                    </el-table-column>
                    <el-table-column
                    prop="province"
                    label="名称"
                    >
                    </el-table-column>
                    <el-table-column
                    custom
                    :sort-change="nameSort"  
                    prop="name"
                    label="简称"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <el-button @click="changeData(2,scope.row)" type="text" size="small">修改</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
          </el-main>
      </el-col>
    </el-row>
      
      
      <!-- 右边抽屉 -->
      <el-drawer
          class="drawer_boder"
          :title="'添加' + indexH"
          :visible.sync="drawer"
          :size="'387px'"
          >
          <div>
              <el-form    :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="padding-left: 10px;">
                    <el-form-item  prop="name">
                      <uploadImg @imgUpload="getImgUrl"></uploadImg>
                  </el-form-item>
                  <el-form-item  prop="name">
                      <div slot="label" style="display: inline-block;">{{indexH}} 名称:</div>
                      <el-input v-model="ruleForm.name" style="width: 350px;" >
                      </el-input>
                  </el-form-item>
                    <el-form-item  prop="Nail">
                      <div slot="label" style="display: inline-block;">钉钉同步 (需要同步钉钉时填写):</div>
                      <el-input v-model="ruleForm.Nail" style="width: 350px;" >
                      </el-input>
                  </el-form-item>
                  <el-form-item  prop="abbreviation">
                      <div slot="label" style="display: inline-block;">简称 - （建议拼音首字母大写）:</div>
                      <el-input v-model="ruleForm.abbreviation" style="width: 350px;" >
                      </el-input>
                  </el-form-item>
                  <el-form-item  prop="type">
                    <div slot="label" style="display: inline-block;">类型:</div><br>
                      <div style="display: block;">
                        <div>
                          <el-radio v-model="ruleForm.type" label="string">文本</el-radio>
                          <el-radio v-model="ruleForm.type" label="number">整数</el-radio>
                          <el-radio v-model="ruleForm.type" label="decimal">小数</el-radio>
                        </div>
                        <div>
                          <el-radio v-model="ruleForm.type" label="millisecond">计时(毫秒)</el-radio>
                          <el-radio v-model="ruleForm.type" label="second">计时(秒)</el-radio>
                          <el-radio v-model="ruleForm.type" label="minute">计时(分)</el-radio>
                          <el-radio v-model="ruleForm.type" label="time">时间(HH:MM:ss)</el-radio>
                          <el-radio v-model="ruleForm.type" label="date">日期(yyyy/MM/dd)</el-radio>
                        </div>
                        <div>
                          <el-radio v-model="ruleForm.type" label="boolean">是否</el-radio>
                          <el-radio v-model="ruleForm.type" label="list">列表</el-radio>
                        </div>
                      </div>
                </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitBtn">提交</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
          </div>
      </el-drawer>
      
  </div>
</template>
<script>
import { getCodeTableList, addMenuTableData } from '@/api/systemConfig'
import uploadImg from '../publicComponents/upload'
export default {
  data(){
      return {
          menulist:[ //左边目录列表
            {
              icon:'el-icon-s-custom',
              text:'人员编制'
            },{
              icon:'el-icon-truck',
              text:'车辆类型'
            },{
              icon:'el-icon-notebook-2',
              text:'值班区队'
            },{
              icon:'el-icon-document',
              text:'考核类型'
            },{
              icon:'el-icon-s-order',
              text:'勤务类型'
            },{
              icon:'el-icon-tickets',
              text:'考核科目'
            },{
              icon:'el-icon-date',
              text:'法定休息日'
            },{
              icon:'el-icon-setting',
              text:'装备类型'
            },{
              icon:'el-icon-folder-checked',
              text:'勤务统计分队'
            },
          ],
          indexH:'人员编制',
          indexItem:'0',
          tableObj:{
              records:[],//table数据
          },
          drawer:false,
          type:0,// 1添加  还是 2修改
          ruleForm: {
              name: '',
              Nail: '',
              abbreviation:'',
              type:''
          },
          imgUrl:'',
          submitBtn:false,
          rules: {
              name: [
                  { required: true, message: '请输入菜单名称', trigger: 'blur' },
              ],
              Nail: [
                  { required: true, message: '请输入菜单路径', trigger: 'blur' },
              ],
              abbreviation: [
                  { required: true, message: '请输入菜单类型', trigger: 'blur' },
              ],
              type: [
                  { required: true, message: '请输入菜单类型', trigger: 'blur' },
              ]
              },
          iconDialog:false, //图标模态框
      }
  },
  components:{
    uploadImg,
  },
  mounted() {
      this.getCodeTableList() //初始化table
  },
  methods: {
      changeData(num, obj){ //添加、修改
       this.type=num;
       this.drawer=true;
       this.ruleForm= {
              name: '',
              Nail: '',
              abbreviation:'',
              type:''
          }
      },
      getCodeTableList(){ //初始化table
          let params={
            codeType:this.indexItem?Number(this.indexItem)+1:1
          };
          getCodeTableList(params).then((res) => {
          this.tableObj = res.response
        }).catch()
      },
      handleSizeChange(value){ //改变pagesize
         this.searchObj.pagesize=value
         this.initTableList()
      },
      handleCurrentChange(value){ //改变当前页
          this.searchObj.page=value
          this.initTableList()
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  addMenuTableData(this.ruleForm).then((res) => { //添加数据之后的操作
                  if(res.status===200){
                      this.initTableList()
                      this.drawer=false;
                  }else{
                      this.$message.error(res.response);
                  }
                  }).catch()
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
      nameSort(){ //名称排序

      },
      menuChange(item){  //输出的item属性抽取有问题，换种方式抽取
          // console.log(this.menulist[item.index])
          this.indexH=this.menulist[item.index].text;
          this.indexItem=''+item.index;
          console.log(this.indexItem)
      },
      getImgUrl(data){
        this.imgUrl=data
      }

  },
}
</script>
<style  >
.itemFontClass{
  color:#517ecb!important;
}
.itemBgcClass{
  background-color: rgba(0,0,0,0.15)!important;
}
</style>
  