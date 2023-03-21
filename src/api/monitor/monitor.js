import request from '@/router/axios'

export function fetchInfo() {
  return request({
    url: '/monitor/redis/info',
    method: 'get'
  })
}

export function fetchExec(query) {
  return request({
    url: '/monitor/redis/exec',
    method: 'get',
    params: query
  })
}
