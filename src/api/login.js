import request from '../utils/request'

export function login(query, data) {
    return request({
        url: '/login',
        method: 'post',
        params: query,
        data: data
    })
}
