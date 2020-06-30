import request from '../utils/request'

export function getHomeCount() {
    return request({
        url: '/home/count',
        method: 'get'
    })
}

export function getRotaList(params) {
    return request({
        url: '/userInfo/department/subDepartmentAndUserInfo',
        method: 'get',
        params: params
    })
}