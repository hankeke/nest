import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/daemon/status-trace-log/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/daemon/status-trace-log',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/daemon/status-trace-log/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/daemon/status-trace-log/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/daemon/status-trace-log',
    method: 'put',
    data: obj
  })
}
