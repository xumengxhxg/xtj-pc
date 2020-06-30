import axios from 'axios'
// import { MessageBox } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// const HOST_URL = 'http://192.168.3.165:8080'
axios.defaults.withCredentials = true
// axios.defaults.crossDomain = true

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: HOST_URL,
//   baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '/api',
  // baseURL: '/remotedeliver',
  // 超时
  timeout: 30000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = localStorage.getItem('token')
    }
    return config
  },
  error => {
    console.log(error)
    // Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(res => {
  const code = res.data.code
  if (code !== 200) {
    // Notification.error({
    //   title: res.data.msg
    // })
    // return Promise.reject('error')
    return res.data
  } else {
    return res.data
  }
},
error => {
  // console.log('err' + error)
  // Message({
  //   message: error.message,
  //   type: 'error',
  //   duration: 5 * 1000
  // })
  // return Promise.reject(error)
  return error
}
)

export default service