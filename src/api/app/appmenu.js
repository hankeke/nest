import request from '@/router/axios'

export function getMenu(id) {
  return request({
    url: '/app/appmenu',
    params: {parentId: id},
    method: 'get'
  })
}

export function getTopMenu() {
  return request({
    url: '/app/appmenu',
    params: {type: 'top'},
    method: 'get'
  })
}

export function fetchMenuTree(params) {
  return request({
    url: '/app/appmenu/tree',
    method: 'get',
    params: params
  })
}

export function addObj(obj) {
  return request({
    url: '/app/appmenu',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/app/appmenu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/app/appmenu/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/app/appmenu',
    method: 'put',
    data: obj
  })
}
