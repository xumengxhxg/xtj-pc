import request from '../utils/request'

// 获取勤务查询数据
export function getServiceList(params) {
    return request({
        url: '/service',
        method: 'get',
        params: params
    })
}

// 获取勤务类型
export function getServiceType(params) {
  return request({
      url: '/dm/all',
      method: 'get',
      params: params
  })
}

// 获取大队统计数据
export function getUnitList(params) {
  return request({
      url: '/count/service/unit',
      method: 'get',
      params: params
  })
}

// 获取区队统计数据
export function getDeptList(params) {
  return request({
      url: '/count/service/dept/page',
      method: 'get',
      params: params
  })
}

// 出勤明细
export function getServiceUser(params) {
  return request({
      url: '/service/user',
      method: 'get',
      params: params
  })
}

// 个人统计
export function getServicePersonCount(params) {
  return request({
      url: '/count/service/person',
      method: 'get',
      params: params
  })
}