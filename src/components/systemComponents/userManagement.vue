<template>
    <div class="main_block">
        <el-row :gutter="20">
            <el-col :span="4">
                <el-menu router :default-active="indexHtmlx" class="el-menu-demo blockmenu"  style="width: 200px!important;">
                    <el-menu-item  v-for="(item,key) in side_list" :key="key"    :index="item.path">{{item.text}}</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <el-main style="padding-left: 0px;" >
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-col>
          </el-row>
        
    </div>
  </template>
   
  <script>
  export default {
    data () {
      return {
          indexHtmlx:'1',
          side_list:[{
                path:'/systemSetting/user/user',
                text:'用户管理'
            },
            {
                path:'/systemSetting/user/role',
                text:'角色管理'
            },
            {
                path:'/systemSetting/user/menu',
                text:'菜单管理'
            }]
      }
    }
  }
  </script>
   
  <style  scoped>
   .checkMenuItem{
 
   }
  </style>
  