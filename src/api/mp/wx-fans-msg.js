import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/mp/wx-fans-msg/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/mp/wx-fans-msg',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/mp/wxfansmsg/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/mp/wxfansmsg/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/mp/wxfansmsg',
    method: 'put',
    data: obj
  })
}

export function fetchResList(query) {
  return request({
    url: '/mp/wx-fans-msg/page',
    method: 'get',
    params: query
  })
}

export function addResObj(obj) {
  return request({
    url: '/mp/wx-fans-msg',
    method: 'post',
    data: obj
  })
}

export function delResObj(id) {
  return request({
    url: '/mp/wx-fans-msg/' + id,
    method: 'delete'
  })
}
