import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/app/appuserrole/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/app/appuserrole',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/app/appuserrole/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/app/appuserrole/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/app/appuserrole',
    method: 'put',
    data: obj
  })
}
