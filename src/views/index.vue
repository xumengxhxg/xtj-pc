<template>
<el-container class="container">
  <el-header class="header">勤务指挥中心</el-header>
  <el-container>
    <el-aside width="200px" class="aside">
      <div class="text-left">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          text-color="rgba(0, 0, 0, 1)"
          active-text-color="#fff"
          router>
          <el-menu-item index="/home">
           <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/rota" >
            <span slot="title">值班表一览</span>
          </el-menu-item>
          <el-menu-item index="/personnel">
            <span slot="title">智能人事</span>
          </el-menu-item>
          <el-menu-item index="/carManagement">
            <span slot="title">车辆管理</span>
          </el-menu-item>
          <el-menu-item index="/serviceManagement">
            <span slot="title">勤务管理</span>
          </el-menu-item>
          <el-menu-item index="/attendenceManagement">
            <span slot="title">考勤管理</span>
          </el-menu-item>
          <el-menu-item index="/performanceManagement">
            <span slot="title">绩效考核管理</span>
          </el-menu-item>
          <el-menu-item index="/bodySkills">
            <span slot="title">体技能考核</span>
          </el-menu-item>
          <el-menu-item index="/equipmentManagement">
            <span slot="title">装备管理</span>
          </el-menu-item>
          <el-menu-item index="/systemSetting">
            <span slot="title">系统设置</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.container {
  height: 100%;
}
.header {
  height: 60px;
  line-height: 60px;
  text-align: left;
  background: #3a5ea6;
  color: #fff;
  font-size: 20px;
}
.aside {
  background: #fff;
  opacity: 0.6;
}
.home {
  height: 100%;
  width: 100%;
}
.el-menu-item.is-active {
   background-color: #3a5ea6 !important;
}
.el-menu-item:hover {
  /* background-color: #f0f8ff !important; */
}
.text-left {
  text-align: left;
}
.pl10 {
  padding-left: 10px;
}
</style>