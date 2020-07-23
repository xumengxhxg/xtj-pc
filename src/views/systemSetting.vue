<!-- 系统设置 -->
<template>
  <div>
    <div class="systemHeader">
        <div class="systemHeaderBg">
          <div class="systemHeaderTitle">
            系统设置
          </div>
          <el-menu router :default-active="indexHtml" class="el-menu-demo" mode="horizontal" >
            <el-menu-item  v-for="(item,key) in a_list" :key="key"  @click="index_a=key" :class="{active_a:index_a===key}" :index="item.path">{{item.text}}</el-menu-item>
          </el-menu>
        </div>
    </div>
    <el-main class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      indexHtml:'1',
      a_list:[{
        path:'/systemSetting/user',
        text:'用户管理'
      },
      {
        path:'/systemSetting/code',
        text:'字典配置'
      },
      {
        path:'/systemSetting/other',
        text:'其他设置'
      },
      {
        path:'/systemSetting/operte',
        text:'操作日志'
      }],
      index_a:0
    }
  }
}

</script>

<style  scoped>
  .systemHeader{
    background-color: #fff;
    padding: 0;
  }
  .systemHeaderBg{
    padding: 16px 12px 12px;
    
  }
  .systemHeaderTitle{
    margin-left: 20px;
    color: rgba(0,0,0,0.85);
    font-weight: 500;
    font-size: 20px;
  }
  a{
    text-decoration: none;
  }
  .active_a{
    color:#517ECB;
  }

 
</style>
