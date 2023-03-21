import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/tenant-menu/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/tenant-menu',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/tenant-menu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/tenant-menu/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/tenant-menu',
    method: 'put',
    data: obj
  })
}

export function menuList() {
  return request({
    url: '/admin/tenant-menu/list',
    method: 'get'
  })
}

export function treemenu() {
  return request({
    url: '/admin/tenant-menu/tree/menu',
    method: 'get'
  })
}
