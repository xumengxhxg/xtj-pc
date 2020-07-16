// 考勤管理
import request from '../utils/request'

// 获取考勤管理数据
export function getleaveCount(params) {
  return request({
    url: '/count/leave',
    method: 'get',
    params: params
  })
}