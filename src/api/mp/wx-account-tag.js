import request from '@/router/axios'

export function getPage(query) {
  return request({
    url: '/mp/wx-account-tag/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/mp/wx-account-tag',
    method: 'post',
    data: obj
  })
}


export function delObj(obj) {
  return request({
    url: '/mp/wx-account-tag',
    method: 'delete',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/mp/wx-account-tag',
    method: 'put',
    data: obj
  })
}

export function sync(appId) {
  return request({
    url: '/mp/wx-account-tag/sync/' + appId,
    method: 'post'
  })
}

export function list(appId) {
  return request({
    url: '/mp/wx-account-tag/list/',
    method: 'get',
    params: {'wxAccountAppid': appId}
  })
}
