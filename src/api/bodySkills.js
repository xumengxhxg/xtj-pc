import request from '../utils/request'

// 获取部门信息
export function getDeptInfo(params) {
  return request({
      url: '/userInfo/department',
      method: 'get',
      params: params
  })
}

// 获取成绩查询列表
export function getSearchList(params) {
  return request({
      url: '/physical',
      method: 'get',
      params: params
  })
}