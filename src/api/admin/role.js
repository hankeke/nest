import request from '@/router/axios'

export function roleList() {
  return request({
    url: '/admin/role/roleList',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/admin/role/page',
    method: 'get',
    params: query
  })
}

export function deptRoleList() {
  return request({
    url: '/admin/role/list',
    method: 'get'
  })
}

export function getObj(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function getObjByCode(code) {
  return request({
    url: '/admin/role/code/' + code,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/role',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/role',
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'delete'
  })
}

export function permissionUpd(roleId, menuIds) {
  return request({
    url: '/admin/role/menu',
    method: 'put',
    data: {
      roleId: roleId,
      menuIds: menuIds
    }
  })
}

export function fetchRoleTree(roleId) {
  return request({
    url: '/admin/menu/tree/' + roleId,
    method: 'get'
  })
}
