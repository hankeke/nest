import request from '@/router/axios'

export function getObj(id) {
  return request({
    url: '/mp/wx-menu/' + id,
    method: 'get'
  })
}

export function saveObj(appId, data) {
  return request({
    url: '/mp/wx-menu/' + appId,
    method: 'post',
    data: data
  })
}

export function publishObj(id) {
  return request({
    url: '/mp/wx-menu/' + id,
    method: 'put'
  })
}
