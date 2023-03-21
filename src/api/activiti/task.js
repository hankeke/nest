import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/act/task/todo',
    method: 'get',
    params: query
  })
}

export function fetchDetail(id) {
  return request({
    url: '/act/task/' + id,
    method: 'get'
  })
}

export function fetchComment(id) {
  return request({
    url: '/act/task/comment/' + id,
    method: 'get'
  })
}

export function doTask(obj) {
  return request({
    url: '/act/task',
    method: 'post',
    data: obj
  })
}
