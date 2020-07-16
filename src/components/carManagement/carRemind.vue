<!-- 审讯到期提醒 -->
<template>
  <div class="pt10 bg-ededed">
    <div class="clearfix bg-white ph20 pv10">
      <div class="pull-left">
        <!-- <el-input placeholder="车牌号，驾照，车辆编号" size="small" style="width: 250px"></el-input> -->
        <el-date-picker v-model="date" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      </div>
      <div class="pull-right">
        <el-button type="primary" size="small" @click="addCar">添加</el-button>
        <el-button size="small" @click="getCarAll">刷新</el-button>
      </div>
    </div>
    <div class="clearfix bg-white mt10 ph20" style="width: 100%">
      <div class="left-list">
        <ul>
          <li :class="index === checkIndex ? 'check' : ''" v-for="(item, index) in carType" :key="index" @click="checkCar(index)">{{item.name}}</li>
        </ul>
      </div>
      <div class="right-table">
        <el-table
          :data="carList"
          style="width: 100%">
          <el-table-column prop="date" label="编号" >
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="plateNumber" label="车牌号" width="100"></el-table-column>
          <el-table-column prop="number" label="核载" ></el-table-column>
          <el-table-column prop="carType" label="车辆类型" ></el-table-column>
          <el-table-column prop="carCardType" label="驾驶证" ></el-table-column>
          <el-table-column prop="carCheckTime" label="审验时间" width="130">
            <template slot-scope="scope">
              {{transformBirthTime(scope.row.carCheckTime)}}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-tag size="small">{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否展示" width="170" align="center">
            <template slot-scope="scope">
              <el-switch
                style="display: block"
                v-model="scope.row.showStatus"
                inactive-text="隐藏"
                active-text="显示"
                @change="changeShowStatus">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="170" align="center">
            <template>
              <el-dropdown size="small" split-button type="primary">
                查看详情
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>从状态显示移除</el-dropdown-item>
                  <el-dropdown-item>编辑</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="showAddCarDialog">
      <add-car :show='showAddCarDialog' @updateShow='updateShow'></add-car>
    </div>
  </div>
</template>

<script>
import {getCarAll} from '@/api/carManagement'
import AddCar from '@/components/carManagement/addCar'
export default {
  components: {
    AddCar
  },
  data () {
    return {
      date: [],
      // carType: ['全部', '警用轿车', '摩托车', '摩托车', '警用大巴', '运兵车', '装备车'],
      carType: [{
        name: '全部'
      }, {
        name: '警用轿车'
      }, {
        name: '摩托车'
      }, {
        name: '摩托车'
      }, {
        name: '警用大巴'
      }, {
        name: '运兵车'
      }, {
        name: '装备车'
      }],
      checkIndex: 0,
      carList: [],
      showAddCarDialog: false
    }
  },
  created() {
    this.getCarAll()
  },
  mounted() {},
  methods: {
    changeShowStatus() {
      
    },
    updateShow(val) {
      this.showAddCarDialog = val
    },
    addCar() {
      this.showAddCarDialog = true
    },
    transformBirthTime (val) {
      if (val) {
        return val.split('/')[0] + '年' + val.split('/')[1] + '月' + val.split('/')[2].slice(0, 2) + '日'
      }
      return ''
    },
    checkCar(index) {
      this.checkIndex = index
    },
    getCarAll() {
      let params = {
        startDate: this.date[0],
        endDate: this.date[1]
      }
      getCarAll(params).then((res) => {
        this.carList = res.response
      }).catch()
    }
  }
}

</script>

<style scoped>
.left-list {
  width: 15%;
  float: left;
}
.left-list ul {
  padding: 0px;
}
.left-list ul li {
  list-style: none;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
}
.right-table {
  width: 85%;
  float: right;
  padding-left: 20px;
  box-sizing: border-box;
  padding-top: 10px;
}
.check {
  background: #f0f8ff;
  color: #517ecb;
  border-right: 3px solid #517ecb;
}
</style>

