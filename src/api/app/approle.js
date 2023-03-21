import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/app/approle/page',
    method: 'get',
    params: query
  })
}

export function list() {
  return request({
    url: '/app/approle/list',
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/app/approle',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/app/approle/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/app/approle/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/app/approle',
    method: 'put',
    data: obj
  })
}

export function fetchRoleTree(roleId) {
  return request({
    url: '/app/appmenu/tree/' + roleId,
    method: 'get'
  })
}

export function permissionUpd(roleId, menuIds) {
  return request({
    url: '/app/approle/menu',
    method: 'put',
    data: {
      roleId: roleId,
      menuIds: menuIds
    }
  })
}
