import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/pay/goods/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/pay/goods',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/pay/goods/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/pay/goods/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/pay/goods',
    method: 'put',
    data: obj
  })
}
