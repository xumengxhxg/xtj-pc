<template>
    <div>
        <el-tabs :tab-position="'left'" >
            <el-tab-pane   v-for="(item,key) in side_list" :key="key"  @click="index_a=key" :name="''+(key+1)">
                <router-link slot="label" :to="item.path" >{{item.text}}</router-link>
            </el-tab-pane>
        </el-tabs>
    </div>
  </template>
   
  <script>
  export default {
    data () {
      return {
          side_list:[{
                path:'pages/setting/user/user',
                text:'用户管理'
            },
            {
                path:'pages/setting/user/role',
                text:'角色管理'
            },
            {
                path:'pages/setting/user/menu',
                text:'菜单管理'
            }]
      }
    }
  }
  </script>
   
  <style lang='style' scoped>
   
  </style>
  