import request from '@/router/axios'
import {cloud} from "@/api/cloud"

const DB = cloud.database()
const DB_NAME = {
  SYS_ROLE: 'sys_role',
  SYS_MENU: 'sys_menu',
  SYS_ROLE_MENU: 'sys_role_menu'
}

export async function roleList() {
  console.debug('Role[roleList]')
  const res = await DB.collection(DB_NAME.SYS_ROLE).get()
  console.debug('Role[roleList] result->', res)
  return res
}

export async function fetchList(query) {
  console.debug('Role[fetchList] request param query->', query)
  const {current, size} = query
  const res = await DB
    .collection(DB_NAME.SYS_ROLE)
    .where({})
    .skip(size * (current - 1))
    .limit(size)
    .get()
  const {total} = await DB.collection(DB_NAME.SYS_ROLE)
    .where({})
    .count()
  console.debug('分页查询结果: ', res.data)
  const r = {
    data: res.data,
    success: res.ok,
    total
  }
  console.debug('Role[fetchList] result->', r)
  return r
}

export function deptRoleList() {
  return request({
    url: '/admin/role/list',
    method: 'get'
  })
}

export async function getObj(id) {
  return await DB.collection(DB_NAME.SYS_ROLE)
    .where({_id: id})
    .getOne()
}

export function getObjByCode(code) {
  return request({
    url: '/admin/role/code/' + code,
    method: 'get'
  })
}

export async function addObj(obj) {
  console.debug('Role[addObj] request param query->', obj)
  const o = {
    ...obj,
    createTime: new Date(),
    updateTime: new Date(),
    delFlag: '0'
  }
  const r = await DB.collection(DB_NAME.SYS_ROLE).add(o)
  console.debug('Role[addObj] result->', r)
}

export async function putObj(obj) {
  console.debug('Role[putObj] request param query->', obj)
  const id = obj._id
  const o = {
    ...obj,
    _id: undefined,
    updateTime: new Date(),
    delFlag: '0'
  }
  delete o._id
  const r = await DB.collection(DB_NAME.SYS_ROLE)
    .doc(id)
    .update(o)
  console.debug('Role[putObj] result->', r)
}

export function delObj(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'delete'
  })
}

export async function permissionUpd(roleId, menuIds) {
  const role = DB.collection(DB_NAME.SYS_ROLE)
    .where({_id: roleId})
    .getOne()
  if (!role) {
    throw new Error("[role not found roleId]" + roleId)
  }
  const {ok, error} = await DB.collection(DB_NAME.SYS_ROLE_MENU)
    .where({roleId: roleId})
    .remove({multi: true})
  if (!ok) {
    throw new Error("[remove menus by role error]" + error)
  }
  const roleMenus = menuIds.split(",").map((menuId) => {
    return {roleId, menuId}
  })
  for (const roleMenu of roleMenus) {
    console.debug(roleMenu,'?????')
    await DB.collection(DB_NAME.SYS_ROLE_MENU)
      .add(roleMenu)
  }
}

export async function fetchMenuIdsByRoleId(roleId) {
  const role = DB.collection(DB_NAME.SYS_ROLE).where({_id: roleId}).getOne()
  if (!role) {
    throw new Error("role not found")
  }
  const cmd = DB.command
  const {data: rolePermissions} = await DB.collection(DB_NAME.SYS_ROLE_MENU)
    .where({roleId: roleId})
    .get()
  const menuIds = rolePermissions.map((menu) => {
    return menu.menuId
  })
  const {data, ok} = await DB.collection(DB_NAME.SYS_MENU)
    .where({_id: cmd.in(menuIds)})
    .get()
  if (data.length === 0) {
    return []
  }
  const r = {
    data: data.map(item => item._id),
    success: ok
  }
  return r
}
