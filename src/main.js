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
localStorage.token = 'Bearer userCenter_eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXN0ZW0iLCJleHAiOjE1OTMwMTM4MjQsImlhdCI6MTU5Mjk3NzgyNCwianRpIjoiZDljM2ZmNjEtNTdiOS00Y2YxLTkwNjktMDk1ZmI1MTRhYmRhIiwidXNlcm5hbWUiOiJzeXN0ZW0ifQ.6TuUAIRU1K0bbboYiaempv-wZjTH2CVpdt7GNO5FI6U'
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
