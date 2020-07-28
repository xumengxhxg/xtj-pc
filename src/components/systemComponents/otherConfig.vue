<template>
    <div style="width: 600px;background-color: #fff;padding:24px 16px 0;">
       <div style="padding: 10px;">
          <el-alert
            title="警告：此配置为本机配置。配置有可能会丢失"
            type="warning"
            show-icon>
          </el-alert>
          <div style="border-bottom: 1px solid #ccc;">
            <h3>基本设置</h3>
          </div>
          <div  style="height: 62px;margin: 0 0 16px;padding: 8px;">
            <div style="width: 488px;height:46px;display: inline-block;line-height: 21px;vertical-align: top;">
              <div>补录勤务</div>
              <div style="color:#999999">【勤务录入】时是否允许选择过去的日期？</div>
            </div>
            <div style="width: 44px;height:46px;display: inline-block;line-height: 42px;">
              <el-switch
              v-model="indexObj.supplement"
              active-color="#13ce66"
              inactive-color="#cccccc">
              </el-switch>
            </div>
          </div>
          <div  style="height: 83px;margin: 0 0 16px;padding: 8px;">
            <div style="width: 364px;height:46px;display: inline-block;line-height: 21px;vertical-align: top;">
              <div>体技能考核部门</div>
              <div style="color:#999999">请输入体技能考核的部门名字，默认：苏州市公安局姑苏分局</div>
            </div>
            <div style="width: 68px;height:46px;display: inline-block;line-height: 63px;">
              <el-input v-model="indexObj.department" style="width: 168px;"></el-input>
            </div>
          </div>
          <div style="border-bottom: 1px solid #ccc;">
            <h3>开发模式</h3>
          </div>
          <div  style="height: 62px;margin: 0 0 16px;padding: 8px;">
            <div style="width: 488px;height:46px;display: inline-block;line-height: 21px;vertical-align: top;">
              <div>开发者模式</div>
              <div style="color:#999999">这将开启开发者调试，请勿打开</div>
            </div>
            <div style="width: 44px;height:46px;display: inline-block;line-height: 42px;">
              <el-switch
              v-model="indexObj.mode"
              active-color="#13ce66"
              inactive-color="#cccccc">
              </el-switch>
            </div>
          </div>
          <div style="border-top: 1px solid #ccc;margin-top: 24px;padding: 16px; 0">
            <el-button type="primary" style="float: right;" @click="saveData">保存</el-button>
            <div style="clear: both;"></div>
          </div>
       </div>
    </div>
  </template>
   
  <script>
  export default {
    data () {
      return {
        indexObj:{
          supplement:false,
          department:'',
          mode:false,
        },
      }
    },
    methods: {
      saveData(){
        
      }
    },
  }
  </script>
   
  <style lang='style' scoped>
   
  </style>
  