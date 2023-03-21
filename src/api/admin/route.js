import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/route',
    method: 'get',
    params: query
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/route',
    method: 'put',
    data: obj
  })
}

export function refreshObj() {
  return request({
    url: '/actuator/gateway/refresh',
    method: 'post'
  })
}
