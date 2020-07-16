import request from '../utils/request'

// 获取车辆数据
export function getImage(id) {
    return request({
        url: '/file/' + id,
        method: 'get'
    })
}