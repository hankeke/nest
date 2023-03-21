import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/pay/paychannel/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/pay/paychannel',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/pay/paychannel/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/pay/paychannel/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/pay/paychannel',
    method: 'put',
    data: obj
  })
}
