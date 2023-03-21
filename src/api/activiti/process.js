import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/act/process',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: '/act/process/' + id,
    method: 'delete'
  })
}

export function status(id, type) {
  return request({
    url: '/act/process/status/' + id + '/' + type,
    method: 'put'
  })
}
