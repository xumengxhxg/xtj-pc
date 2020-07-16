import request from '../utils/request'

export function getPersonnelTree(params) {
    return request({
        url: '/userInfo/department/subDepartmentAndUserInfo',
        method: 'get',
        params: params
    })
}

export function getUserInfo(params) {
    return request({
        url: '/userInfo/all',
        method: 'get',
        params: params
    })
}

// 导出数据
// export function downloadUserInfo(params) {
//     window.location.href = 'http://localhost/' + '/download/userinfo?quitStatus='+ params.quitStatus + '0&deptIds=' + params.deptIds
// }
