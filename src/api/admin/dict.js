import request from '@/router/axios'
import { cloud } from "@/api/cloud"

const DB = cloud.database()
const DB_NAME = {
  SYS_DICT: 'sys_dict'
}

export async function fetchList(query) {
  console.debug('Dict[fetchList] request param query->', query)
  const { current, size, dictType, systemFlag } = query
  const qo = {}
  if (dictType) {
    qo.dictType = dictType
  }
  if (systemFlag) {
    qo.systemFlag = systemFlag
  }
  const res = await DB
    .collection(DB_NAME.SYS_DICT)
    .where(qo)
    .skip(size * (current - 1))
    .limit(size)
    .get()
  const { total } = await DB.collection(DB_NAME.SYS_DICT)
    .where(qo)
    .count()
  console.debug('分页查询结果: ', res.data)
  const r = {
    data: res.data,
    success: res.ok,
    total
  }
  console.debug('Dict[fetchList] result->', r)
  return r
}

export function addObj(obj) {
  return request({
    url: '/admin/dict/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dict/' + id,
    method: 'get'
  })
}

export function delObj(row) {
  return request({
    url: '/admin/dict/' + row.id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/dict/',
    method: 'put',
    data: obj
  })
}

export function fetchItemList(query) {
  return request({
    url: '/admin/dict/item/page',
    method: 'get',
    params: query
  })
}

export function addItemObj(obj) {
  return request({
    url: '/admin/dict/item',
    method: 'post',
    data: obj
  })
}

export function getItemObj(id) {
  return request({
    url: '/admin/dict/item/' + id,
    method: 'get'
  })
}

export function delItemObj(id) {
  return request({
    url: '/admin/dict/item/' + id,
    method: 'delete'
  })
}

export function putItemObj(obj) {
  return request({
    url: '/admin/dict/item',
    method: 'put',
    data: obj
  })
}

export async function remote(type) {
  console.debug('Dict[remote] type->', type)
  const { data: dict, ok } = await DB
    .collection(DB_NAME.SYS_DICT)
    .where({ dictType: type })
    .getOne()
  if (!dict) {
    return {
      data: null,
      success: ok
    }
  }
  console.debug('Dict[remote] result->', dict)
  return {
    data: dict,
    success: ok
  }
}


export async function listDictItemByType(type) {
  console.debug('Dict[listDictItemByType] type->', type)
  if (!type) {
    throw new Error('参数不合法')
  }
  const { data, ok } = await DB
    .collection(DB_NAME.SYS_DICT)
    .where({ dictType: type })
    .getOne()
  console.debug('Dict[listDictItemByType] data->', data)
  return {
    data: data.records,
    success: ok
  }
}
