import request from '@/router/axios'

export function fetchPage(query) {
  return request({
    url: '/admin/tenant/page',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    url: '/admin/tenant/list',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/tenant',
    method: 'post',
    data: obj
  })
}

export function getObj(obj) {
  return request({
    url: '/admin/tenant',
    method: 'get',
    params: obj
  })
}

export function delObj(id) {
  return request({
    url: '/admin/tenant/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/tenant',
    method: 'put',
    data: obj
  })
}
