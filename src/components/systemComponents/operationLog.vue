<template>
    <div>
      <div style="padding: 10px 24px;"">
        <el-table
            :data="tableObj.records"
            style="width: 100%">
            
            <el-table-column
            prop="date"
            label="序号"
            >
            </el-table-column>
            <el-table-column
            prop="province"
            label="操作日期"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="操作类型"
            >
            </el-table-column>
            <el-table-column
            prop="city"
            label="操作日志"
            >
            
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
    </div>
  </template>
   
  <script>
  export default {
    data () {
      return {
        tableObj:{
              records:[],//table数据
              limit:10,//每页默认数据条数
              total:0,//默认数据条数
              offset:1,//默认当前页码
          },
      }
    },
    methods: {
      initTableData(){  //初始化列表数据

      },
      handleSizeChange(value){
        this.tableObj.limit=value;
        this.tableObj.offset=1;
        this.initTableData()
      },
      handleCurrentChange(value){
        this.tableObj.offset=value;
        this.initTableData()
      }
    },
  }
  </script>
   
  <style lang='style' scoped>
   
  </style>
  