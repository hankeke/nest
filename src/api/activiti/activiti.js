import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/act/model',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: '/act/model/' + id,
    method: 'delete'
  })
}

export function deploy(id) {
  return request({
    url: '/act/model/deploy/' + id,
    method: 'post'
  })
}

export function addObj(obj) {
  return request({
    url: '/act/model/insert',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/log/' + id,
    method: 'get'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/log/',
    method: 'put',
    data: obj
  })
}
