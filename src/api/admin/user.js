import request from '@/router/axios'
import { cloud } from "@/api/cloud"

const DB = cloud.database()
const DB_NAME = {
  SYS_USER: 'sys_user',
  SYS_ROLE: 'sys_role',
  SYS_MENU: 'sys_menu',
  SYS_DEPT: 'sys_dept',
  SYS_POST: 'sys_post',
  SYS_ROLE_MENU: 'sys_role_menu',
  SYS_USER_ROLE: 'sys_user_role',
  SYS_USER_POST: 'sys_user_post'
}

export async function fetchList(query) {
  console.debug('User[fetchList] request param query->', query)
  const { current, size, username, deptId } = query
  const qo = {}
  if (username) {
    qo.username = username
  }
  if (deptId) {
    qo.deptId = deptId
  }
  const { data: users, ok } = await DB
    .collection(DB_NAME.SYS_USER)
    .withOne({
      query: DB.collection(DB_NAME.SYS_DEPT),
      localField: "deptId",
      foreignField: "_id",
      as: "dept"
    })
    .where(qo)
    .skip(size * (current - 1))
    .limit(size)
    .get()
  if (!users && users.length === 0) {
    return {
      data: [],
      success: ok,
      total: 0
    }
  }
  const { total } = await DB.collection(DB_NAME.SYS_USER)
    .where(qo)
    .count()
  
  const r = {
    data: users,
    success: ok,
    total
  }
  console.debug('User[fetchList] result->', r)
  return r
}

export function addObj(obj) {
  return request({
    url: '/admin/user',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: obj
  })
}

export function getDetails(obj) {
  return request({
    url: '/admin/user/details/' + obj,
    method: 'get'
  })
}


export function getDetailsByPhone(obj) {
  return request({
    url: '/admin/user/detailsByPhone/' + obj,
    method: 'get'
  })
}

// 更改个人信息
export function editInfo(obj) {
  return request({
    url: '/admin/user/edit',
    method: 'put',
    data: obj
  })
}
