<template>
    <div>
        <div style="display: flex;justify-content:space-between;padding: 0 24px;">
            <el-input
                placeholder="姓名、警号"
                v-model="searchObj.keyWord"
                style="width: 200px;"
                @input="initTableList()"
                clearable>
            </el-input>
            <span>
                <el-button type="primary" icon="el-icon-plus" @click="changeData(1)"  style="margin-right: 15px;">添加</el-button>
                <el-button icon="el-icon-refresh">刷新</el-button>
            </span>
        </div>
        <div style="padding: 10px 24px;"">
            <el-table
                :data="tableObj.records"
                style="width: 100%">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="date"
                label="警号"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                >
                </el-table-column>
                <el-table-column
                prop="province"
                label="角色"
                >
                </el-table-column>
                <el-table-column
                prop="city"
                label="创建时间"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="修改时间"
                >
                </el-table-column>
                <el-table-column
                prop="zip"
                label="锁定"
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
            <div style="float: right;margin-top: 15px;">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, prev, pager, next, sizes"
                    :current-page="tableObj.offset"
                    :page-size="tableObj.limit"
                    :total="tableObj.total">
                </el-pagination>
            </div>
            <div style="clear: both;"></div>
        </div>
        
        <!-- 右边抽屉 -->
        <el-drawer
            class="drawer_boder"
            :title="type===1?'新增用户':'编辑用户'"
            :visible.sync="drawer"
            :size="'300px'"
            >
            <div>
                <el-form   label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                      <el-input v-model="ruleForm.name" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="警号" prop="No">
                        <el-input v-model="ruleForm.No" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" show-password style="width: 200px;"></el-input>
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
import { getUserTableList, addUserTableData } from '@/api/systemConfig'
export default {
    data(){
        return {
            searchObj:{
                keyWord:'',//姓名警号 关键词
                page:1,//当前页码
                pagesize:10,//当前pageseze
            },
            tableObj:{
                total:0,//数据总条数
                records:[],//table数据
                offset:1,//当前页码
                limit:10,//
            },
            drawer:false,
            type:0,// 1添加  还是 2修改
            ruleForm: {
                name: '',
                No: '',
                password:''
            },
            submitBtn:false,
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                No: [
                    { required: true, message: '请输入警号', trigger: 'change' }
                ],
                password: [
                    {  required: true, message: '请输入密码', trigger: 'change' }
                ]
                }
        }
    },
    mounted() {
        this.initTableList() //初始化table
    },
    methods: {
        changeData(num, obj){ //添加、修改
         this.type=num;
         this.drawer=true;
        },
        initTableList(){ //初始化table
            let params=this.searchObj;
            // console.log(this.getUserTableList)
            getUserTableList(params).then((res) => {
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
                    addUserTableData(this.ruleForm).then((res) => {
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
    },
}
</script>
<style  >

</style>