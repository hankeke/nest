import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/app/social/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/app/social/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/app/social/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/app/social/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/app/social/',
    method: 'put',
    data: obj
  })
}
