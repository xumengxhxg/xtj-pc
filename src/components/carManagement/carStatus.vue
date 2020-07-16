<!-- 车辆状态 -->
<template>
  <div class="ph20 pt10">
    <el-button type="primary" size="medium" @click="getCarAll">刷新</el-button>
    <!-- 冲锋车 -->
    <div v-loading='loading'>
      <div v-for="(car, index) in carList" :key="index">
        <div class="mt20">{{car.name}}</div>
        <el-divider></el-divider>
        <div> 
          <el-row :gutter="30">
            <el-col :span="8"  v-for="item in car.val" :key="item.carId" style="position: relative" class="card-box"> 
              <div>
                <div class="status" :class="item.status === '未出' ? 'bg-color-green' : item.status === '已出' ? 'bg-color-blue' : 'bg-color-red'">{{item.status}}</div>
                <div class="grid-content bg-purple card car-card">
                  <div class="left-img">
                    <!-- {{JSON.stringify(asyncFn(item.carTypeObject.imageId))}} -->
                    <img v-if="item.img" :src="'data:image/jpeg;base64,' + item.img" alt="" style="width: 100%;height: 100%">
                  </div>
                  <div class="right-text pl15">
                    <div class="carNum">
                      {{item.plateNumber}}
                    </div>
                    <div>
                      <el-tag size="small">{{item.carTypeObject.chinese}}</el-tag>
                    </div>
                  </div>
                </div>
                <div class="btn-group-cheliang">
                  <el-button-group>
                    <el-button type="primary" size="small">维修</el-button>
                    <el-button type="primary" size="small">加油</el-button>
                    <el-button type="primary" size="small">出车</el-button>
                  </el-button-group>
                </div>
              </div>
            </el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCarAll} from '@/api/carManagement'
import {getImage} from '@/api/global'
export default {
  data () {
    return {
      loading: true,
      chargeCar: [], // 冲锋车
      coach: [], // 大巴车和运兵车
      equipCar: [], // 装备车
      motorcycle: [], // 摩托车
      saloonCar: [], // 轿车
      carList: []
    }
  },
  created() {
    this.getCarAll()
  },
  watch: {
    // loading(to) {
    //   if (!to) {
    //     this.chargeCar.forEach((item) => {
    //        if (item.carTypeObject.imageId) {
    //         this.asyncFn(item.carTypeObject.imageId).then(value =>{
    //          item.img = value.response.file
    //         })
    //       }
    //     })
    //   }
    // }
  },
  methods: {
    getImage(id) {
      return Promise((resolve) => {
        getImage(id).then((res) => {
          resolve(res)
        }).catch()
      })
    },
    async asyncFn (id) {
      let result = await getImage(id)
      // console.log(result.response.file)
      // let val = result.response.file
      // console.log(val)
      return result.response.file
    },
    // 获取车辆列表数据
    getCarAll() {
      this.saloonCar = []
      this.coach = []
      this.chargeCar = []
      this.motorcycle = []
      this.equipCar = []
      this.carList = []
      let params = {
        showStatus: 0
      }
      getCarAll(params).then((res) => {
        res.response.forEach((item) => {
          // if (item.carTypeObject.imageId) {
          //   this.asyncFn(item.carTypeObject.imageId).then(value =>{
          //    item.img = value.response.file
          //   })
          // }
          if (item.carType === '17') {
            this.saloonCar.push(item)
          } else if (item.carType === '16' || item.carType === '24') {
            this.coach.push(item)
          } else if (item.carType === '14') {
            this.chargeCar.push(item)
          } else if (item.carType === '18') {
            this.motorcycle.push(item)
          } else if (item.carType === '15') {
            this.equipCar.push(item)
          }
        })
        this.loading = false
        this.carList = [{
          name: '冲锋车',
          val: this.chargeCar
        }, {
          name: '运兵车、大巴车',
          val: this.coach
        }, {
          name: '装备车',
          val: this.equipCar
        }, {
          name: '摩托车',
          val: this.motorcycle
        }, {
          name: '轿车',
          val: this.saloonCar
        }]
      }).catch()
    }
  }
}

</script>

<style scoped>
.card {
  background: whitesmoke;
  margin-bottom: 30px;
  padding: 10px;
  height: 140px;
}
.left-img, .right-text {
  float: left;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
}
.carNum {
  font-size: 20px;
  padding-bottom: 10px;
}
.status {
  position: absolute;
  padding: 5px;
  top: 10px;
  left: 30px;
  font-size: 13px;
  color: #ffffff;
}
.bg-color-green {
  background: #52c41a !important;
}
.bg-color-red {
  background: #f5222d !important;
}
.bg-color-blue {
  background: #1890ff !important;
}
.btn-group-cheliang {
  position: absolute;
  bottom: 30px;
  right: 18px;
}
.car-card {
  box-sizing: border-box;
}
.car-card:hover{
  border: 1px solid #1890ff;
}
</style>
