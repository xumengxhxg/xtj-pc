// 绩效考核管理
import request from '../utils/request'

// 操作日志
export function getOperationLog(params) {
  return request({
      url: '/log/listAch',
      method: 'get',
      params: params
  })
}

// 绩效统计
export function getAchievementCount(params) {
  return request({
      url: '/count/achievement',
      method: 'get',
      params: params
  })
}

// 荣誉统计
export function getAchievementHonorCount(params) {
  return request({
      url: '/count/achievement/honor',
      method: 'get',
      params: params
  })
}

// 获取人员树
export function getTree(params) {
  return request({
      url: '/userInfo/department/subDepartmentAndUserInfo',
      method: 'get',
      params: params
  })
}