<template>
    <div>
        <div style="display: flex;justify-content:space-between;padding: 0 24px;">
            <el-input
                placeholder="角色名、角色描述"
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
                prop="date"
                label="菜单"
                >
                </el-table-column>
                <el-table-column
                prop="province"
                label="图标"
                >
                </el-table-column>
                <el-table-column
                custom
                :sort-change="nameSort"  
                prop="name"
                label="排序"
                >
                </el-table-column>
                <el-table-column
                prop="city"
                label="路由地址"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="权限标识"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="组件路径"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="菜单类型"
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
                    <el-form-item label="图标">
                        <el-input v-model="ruleForm.name" style="width: 200px;" @focus="searchIcon()">
                            <el-button slot="append" icon="el-icon-search" type="primary"></el-button>
                        </el-input>
                      </el-form-item>
                    <el-form-item label="菜单名称" prop="menuName" >
                      <el-input v-model="ruleForm.menuName" style="width: 200px;" ></el-input>
                    </el-form-item>
                    <el-form-item label="菜单路径" prop="menuUrl" >
                        <el-input v-model="ruleForm.menuUrl" style="width: 200px;" placeholder="url"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单类型" prop="menuType">
                        <el-input v-model="ruleForm.menuType" show-password style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitBtn">提交</el-button>
                      <el-button @click="drawer=false">取消</el-button>
                    </el-form-item>
                  </el-form>
            </div>
        </el-drawer>
        <!-- icon弹出框 -->
        <el-dialog  
            title="图标选择"
            :visible.sync="iconDialog"
            width="30%"
            >
            <div   style="border-top: 0.5px solid #ccc;">
                这是一段信息
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getMenuTableList, addMenuTableData } from '@/api/systemConfig'
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
                menuName: '',
                menuUrl: '',
                menuType:''
            },
            submitBtn:false,
            rules: {
                menuName: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                ],
                menuUrl: [
                    { required: true, message: '请输入菜单路径', trigger: 'blur' },
                ],
                menuType: [
                    { required: true, message: '请输入菜单类型', trigger: 'blur' },
                ]
                },
            iconDialog:false, //图标模态框
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
            getMenuTableList(params).then((res) => {
            // this.tableObj = res.response
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
        searchIcon(){  //查找icon
          this.iconDialog=true;
        }
    },
}
</script>
<style  >

</style>