import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/app/appuser/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/app/appuser',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/app/appuser/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/app/appuser/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/app/appuser',
    method: 'put',
    data: obj
  })
}
