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
export function addUserTableData(data) {
    return request({
        url: '/user',
        method: 'post',
        data: data
    })
}

//角色管理请求当前首页表格
export function getRoleTableList(params) {
    return request({
        url: '/user',
        method: 'get',
        params: params
    })
}

//角色管理添加数据
export function addRoleTableData(data) {
    return request({
        url: '/user',
        method: 'post',
        data: data
    })
}

//目录管理请求当前首页表格
export function getMenuTableList(params) {
    return request({
        url: '/user',
        method: 'get',
        params: params
    })
}

//目录管理添加数据
export function addMenuTableData(data) {
    return request({
        url: '/user',
        method: 'post',
        data: data
    })
}