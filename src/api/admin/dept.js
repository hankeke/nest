import request from '@/router/axios'

export function fetchTree(query) {
  return request({
    url: '/admin/dept/tree',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/dept/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dept/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/dept/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/dept/',
    method: 'put',
    data: obj
  })
}

export function syncUser() {
  return request({
    url: '/admin/connect/sync/ding/user',
    method: 'post'
  })
}

export function syncDept() {
  return request({
    url: '/admin/connect/sync/ding/dept',
    method: 'post'
  })
}

export function syncCpUser() {
  return request({
    url: '/admin/connect/sync/cp/user',
    method: 'post'
  })
}

export function syncCpDept() {
  return request({
    url: '/admin/connect/sync/cp/dept',
    method: 'post'
  })
}
