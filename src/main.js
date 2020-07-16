import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.config.productionTip = false
localStorage.token = 'Bearer userCenter_eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXN0ZW0iLCJleHAiOjE1OTQ4OTk0OTEsImlhdCI6MTU5NDg2MzQ5MSwianRpIjoiNTNhYTdjMGMtYzIyNy00NmJkLThiNmItODExMDkzZDc5ZWNmIiwidXNlcm5hbWUiOiJzeXN0ZW0ifQ.I1347MtgtqCPKpNeXMNf3DGLo2Ke49HzTkIFbgSpd8U'
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
