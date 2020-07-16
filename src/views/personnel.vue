<!-- 智能人事 -->
<template>
  <div class="bg-white" style="height: 100%">
    <p class="title ph20 pt20">智能人事</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="内部通讯录" name="first">
        <address-book></address-book>
      </el-tab-pane>
      <el-tab-pane label="人事提醒" name="second">
        <personnel-remind></personnel-remind>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import addressBook from '@/components/addressBook.vue'
import personnelRemind from '@/components/personnelRemind.vue'
export default {
  components: {
    addressBook,
    personnelRemind
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick() {}
  }
}

</script>

<style  scoped>
.title {
  font-size: 22px!important;
  font-weight: 500;
}
</style>
