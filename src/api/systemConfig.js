import request from '../utils/request'
 
//系统配置——————用户管理请求

//用户管理请求当前首页表格
export function getUserTableList(params) {
    return request({
        url: '/user',
        method: 'get',
        params: params
    })
}

//用户管理添加数据
export function addTableData(data) {
    return request({
        url: '/user',
        method: 'post',
        data: data
    })
}