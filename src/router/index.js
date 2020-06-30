import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import login from '../views/login.vue'
import index from '../views/index.vue'
import home from '../views/home.vue'
import rota from '../views/rota.vue'
import personnel from '../views/personnel.vue'
import carManagement from '../views/carManagement.vue'
import serviceManagement from '../views/serviceManagement.vue'
import attendenceManagement from '../views/attendenceManagement.vue'
import performanceManagement from '../views/performanceManagement.vue'
import bodySkills from '../views/bodySkills.vue'
import equipmentManagement from '../views/equipmentManagement.vue'
import systemSetting from '../views/systemSetting.vue'

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        }, {
            path: '/login',
            component: login
        }, 
        {
            path: '/index',
            // component: () => import('../views/index.vue')
            component: index,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    // component: () => import('../views/home.vue') // 首页
                    component: home
                }, {
                    path: '/rota',
                    // component: () => import('../views/rota.vue') // 值班表一览
                    component: rota
                }, {
                    path: '/personnel',
                    // component: () => import('../views/personnel.vue') // 智能人事
                    component: personnel
                }, {
                    path: '/carManagement',
                    // component: () => import('../views/carManagement.vue') // 车辆管理
                    component: carManagement
                }, {
                    path: '/serviceManagement',
                    // component: () => import('../views/serviceManagement.vue') // 勤务管理
                    component: serviceManagement
                }, {
                    path: '/attendenceManagement',
                    // component: () => import('../views/attendenceManagement.vue') // 考勤管理
                    component: attendenceManagement
                }, {
                    path: '/performanceManagement',
                    // component: () => import('../views/performanceManagement.vue') // 绩效考核管理
                    component: performanceManagement
                }, {
                    path: '/bodySkills',
                    // component: () => import('../views/bodySkills.vue') // 体技能考核
                    component: bodySkills
                }, {
                    path: '/equipmentManagement',
                    // component: () => import('../views/equipmentManagement.vue') // 体技能考核
                    component: equipmentManagement
                }, {
                    path: '/systemSetting',
                    // component: () => import('../views/systemSetting.vue') // 系统设置
                    component: systemSetting
                }
            ]
        }
    ]
})

// 路由重复问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
