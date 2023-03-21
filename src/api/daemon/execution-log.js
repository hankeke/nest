import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/daemon/execution-log/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/daemon/execution-log',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/daemon/execution-log/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/daemon/execution-log/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/daemon/execution-log',
    method: 'put',
    data: obj
  })
}
