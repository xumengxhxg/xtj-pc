<!-- 首页 -->
<template>
  <div>
    <div class="bg-white">
      <p class="title">今日人员占比</p>
      <ve-histogram :data="personChartData" :extend="personChartExtend" width="700px" style="margin: 0 auto" :legend-visible='false'></ve-histogram>
    </div>
    <div class="container">
      <div class="left">
        <p class="title bg-white">车辆状态</p>
        <ve-histogram :data="carChartData" :extend="carChartExtend" style="margin: 0 auto;" class="bg-white" :legend-visible='false'></ve-histogram>
      </div>
      <div class="right">
        <p class="title bg-white">装备状态</p>
        <ve-histogram :data="equipmentChartData" :extend="equipmentChartExtend" style="margin: 0 auto" class="bg-white" :legend-visible='false'></ve-histogram>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeCount } from '@/api/home.js'
export default {
  data () {
    return {
      personChartData: {
        columns: ['状态', '数量'],
        rows: [
          // { '状态': '备勤', '数量': 1393 },
          // { '状态': '出勤', '数量': 3530 },
          // { '状态': '请假', '数量': 2923 },
          // { '状态': '休息', '数量': 1723 },
          // { '状态': '值班', '数量': 3792 }
        ]
      },
      carChartData: {
        columns: ['状态', '数量'],
        rows: [
          // { '状态': '维修', '数量': 1393 },
          // { '状态': '未出', '数量': 3530 },
          // { '状态': '已出', '数量': 2923 }
        ]
      },
      equipmentChartData: {
        columns: ['状态', '数量'],
        rows: [
          // { '状态': '借出', '数量': 1393 },
          // { '状态': '归还', '数量': 3530 },
          // { '状态': '入库', '数量': 2923 },
          // { '状态': '出库', '数量': 1723 }
        ]
      },
      personChartExtend: {
        series (v) {
          v.forEach(i => {
            i.barWidth = 50
          })
          return v
        }
      },
      carChartExtend: {
        series (v) {
          v.forEach(i => {
            i.barWidth = 50
          })
          return v
        }
      },
      equipmentChartExtend: {
        series (v) {
          v.forEach(i => {
            i.barWidth = 50
          })
          return v
        }
      }
    }
  },
  created () {
    this.getHomeCount()
  },
  methods: {
    getHomeCount () {
      getHomeCount().then((res) => {
        console.log(res.response)
        const userStatusCount = [
          {'状态': '请假', '数量': res.response.userStatusCount.leave},
          {'状态': '出勤', '数量': res.response.userStatusCount.out},
          {'状态': '备勤', '数量': res.response.userStatusCount.prepare},
          {'状态': '休息', '数量': res.response.userStatusCount.rest},
          {'状态': '值班', '数量': res.response.userStatusCount.work}
        ]
        const carStatusCount = [
          {'状态': '未出', '数量': res.response.carStatusCount.notOut},
          {'状态': '已出', '数量': res.response.carStatusCount.out},
          {'状态': '维修', '数量': res.response.carStatusCount.repair}
        ]
        const equipStatusCount = [
          {'状态': '借出', '数量': res.response.equipStatusCount.loan},
          {'状态': '归还', '数量': res.response.equipStatusCount.back},
          {'状态': '入库', '数量': res.response.equipStatusCount.put},
          {'状态': '出库', '数量': res.response.equipStatusCount.delivery},
        ]
        this.personChartData.rows = userStatusCount
        this.carChartData.rows = carStatusCount
        this.equipmentChartData.rows = equipStatusCount
      }).catch()
    }
  }
}

</script>

<style scoped>
.bg-white {
  background: #ffffff;
  width: 100;
  height: 100%;
}
.title {
  margin: 0px;
  padding: 15px;
  font-size: 16px;
  border-bottom: 1px solid #ededed;
}
.left {
  float: left;
  /* background: #ffffff; */
  width: 50%;
  padding-right: 20px;
  box-sizing: border-box;
}
.right {
  float: right;
  /* background: #ffffff; */
  width: 50%;
}
.container {
 margin-top: 20px;
}
</style>

