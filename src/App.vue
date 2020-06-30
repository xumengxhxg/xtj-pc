<template>
  <div id="app">
    <router-view></router-view>
    <!-- <index></index> -->
  </div>
</template>
<script>
// import index from './views/index's
export default {
  components: {
    // index
  },
  name: 'App'
}
</script>

<style>
@import './assets/css/global.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
html,
body,
#app {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
