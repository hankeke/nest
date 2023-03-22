import request from '@/router/axios'
import {cloud} from "@/api/cloud";

const DB = cloud.database()
const DB_NAME = {
  SYS_ROLE: 'sys_role'
}

export function roleList() {
  return request({
    url: '/admin/role/roleList',
    method: 'get'
  })
}

export async function fetchList(query) {
  console.debug('Role[fetchList] request param query->', query)
  const {current, size} = query;
  const res = await DB
    .collection(DB_NAME.SYS_ROLE)
    .where({})
    .skip(size * (current - 1))
    .limit(size)
    .get();

  const {total} = await DB.collection(DB_NAME.SYS_ROLE)
    .where({})
    .count();

  console.debug('分页查询结果: ', res.data);
  const r = {
    data: res.data,
    success: res.ok,
    total,
  };
  console.debug('Role[fetchList] result->', r)
  return r
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
