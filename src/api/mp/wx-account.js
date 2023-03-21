import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/mp/wx-account/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/mp/wx-account',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/mp/wx-account/' + id,
    method: 'get'
  })
}

export function generateQr(appid) {
  return request({
    url: '/mp/wx-account/qr/' + appid,
    method: 'post'
  })
}

export function clearQuota(appid) {
  return request({
    url: '/mp/wx-account/clear-quota/' + appid,
    method: 'post'
  })
}

export function delObj(id) {
  return request({
    url: '/mp/wx-account/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/mp/wx-account',
    method: 'put',
    data: obj
  })
}

export function fetchAccountList() {
  return request({
    url: '/mp/wx-account/list',
    method: 'get'
  })
}

export function fetchStatistics(q) {
  return request({
    url: '/mp/wx-account/statistics',
    method: 'get',
    params: q
  })
}
