import request from '../utils/request'
 
//系统配置——————用户管理请求

//
export function getUserTableList(params) {
    return request({
        url: '/user',
        method: 'get',
        params: params
    })
}