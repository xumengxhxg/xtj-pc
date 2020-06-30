import request from '../utils/request'

export function getPersonnelTree(params) {
    return request({
        url: '/userInfo/department/subDepartmentAndUserInfo',
        method: 'get',
        params: params
    })
}
