import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/pay/order/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/pay/order',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/pay/order/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/pay/order/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/pay/order',
    method: 'put',
    data: obj
  })
}
