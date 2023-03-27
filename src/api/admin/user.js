import request from '@/router/axios'
import { cloud } from "@/api/cloud"

const DB = cloud.database()
const DB_NAME = {
  SYS_USER: 'sys_user',
  SYS_ROLE: 'sys_role',
  SYS_MENU: 'sys_menu',
  SYS_DEPT: 'sys_dept',
  SYS_ROLE_MENU: 'sys_role_menu',
  SYS_USER_ROLE: 'sys_user_role'
}

export async function fetchList(query) {
  const { current, size } = query
  const { data } = await DB
    .collection(DB_NAME.SYS_USER)
    .withOne({
      query: DB.collection(DB_NAME.SYS_DEPT),
      localField: "deptId",
      foreignField: "_id",
      as: "dept"
    })
    .where({})
    .skip(size * (current - 1))
    .limit(size)
    .get()

  console.log('res', data)

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
