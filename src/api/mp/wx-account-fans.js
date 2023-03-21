import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/mp/wx-account-fans/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/mp/wx-account-fans',
    method: 'post',
    data: obj
  })
}

export function sync(appId) {
  return request({
    url: '/mp/wx-account-fans/sync/' + appId,
    method: 'post'
  })
}

export function getObj(id) {
  return request({
    url: '/mp/wx-account-fans/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/mp/wx-account-fans/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/mp/wx-account-fans',
    method: 'put',
    data: obj
  })
}
