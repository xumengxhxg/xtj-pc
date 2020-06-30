<!-- 值班表一览 -->
<template>
  <div style="background: white; padding: 10px"> 
    <div>
      <el-button type="primary">请假</el-button>
      <span style="padding-left: 20px">{{date}}</span>
    </div>
    <div>
      <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="中队"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="区队">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="分队">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="队员">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import { getRotaList } from '@/api/home.js'
export default {
  data () {
    return {
      date: '',
      tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
    }
  },
  created () {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()
    let day = new Date().getDay()
    switch (day) {
      case 1: day = '星期一'; break;
      case 2: day = '星期二'; break;
      case 3: day = '星期三'; break;
      case 4: day = '星期四'; break;
      case 5: day = '星期五'; break;
      case 6: day = '星期六'; break;
      case 0: day = '星期日'; break;
    }
    this.date = year + '年' + month + '月' + date + '日' + day
    this.getRotaList()
  },
  methods: {
    getRotaList () {
      let params = {
        rootId: 1
      }
      getRotaList(params).then(() => {

      }).catch()
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      // console.log(row, column)
        if (columnIndex === 0) { // 用于设置要合并的列
          if (rowIndex === 0) {
            return {
              rowspan: 8,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
  }
}

</script>

<style lang='stylus' scoped>

</style>
