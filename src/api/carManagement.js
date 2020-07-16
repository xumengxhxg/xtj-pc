import request from '../utils/request'

// 获取车辆数据
export function getCarAll(params) {
    return request({
        url: '/car/all',
        method: 'get',
        params: params
    })
}

// 修改显示隐藏的状态
export function editCar(data) {
    return request({
        url: '/car',
        method: 'put',
        data: data
    })
}
