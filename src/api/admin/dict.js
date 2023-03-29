import request from '@/router/axios'
import { cloud } from "@/api/cloud"
import { R } from "@/util/R"

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

export async function addObj(obj) {
  console.debug('Dict[addObj] request param query->', obj)
  const o = {
    ...obj,
    createTime: Date.now(),
    updateTime: Date.now(),
    delFlag: '0',
    records: []
  }
  const r = await DB.collection(DB_NAME.SYS_DICT).add(o)
  console.debug('Dict[addObj] result->', r)
  return r
}

export async function getObj(id) {
  console.debug('Dict[getObj] request param ID->', id)
  const res = await DB.collection(DB_NAME.SYS_DICT).where({
    _id: id
  }).getOne()
  console.debug('Dict[getObj] response result->', res)
  return res
}

export async function delObj(id) {
  console.debug('Dict[delObj] request param ID->', id)
  const res = await DB.collection(DB_NAME.SYS_DICT).where({
    _id: id
  }).remove()
  console.debug('Dict[delObj] response result->', res)
  return res
}

export async function putObj(obj) {
  console.debug('Dict[putObj] request param query->', obj)
  const { _id: id } = obj
  const { data: param } = await DB.collection(DB_NAME.SYS_DICT)
    .where({ _id: id })
    .getOne()
  if (!param) {
    return R.failed("更新的对象不存在")
  }
  const data = {
    ...obj,
    _id: undefined,
    updateTime: Date.now(),
    delFlag: '0'
  }
  console.debug('Dict[putObj] data->', data)
  delete data._id
  const res = await DB.collection(DB_NAME.SYS_DICT)
    .doc(id)
    .update(data)
  console.debug('Dict[putObj] result->', res)
  return R.ok(res.matched)
}

export async function fetchItemList(query) {
  console.debug('Dict[fetchItemList] request param query->', query)
  const { dictId } = query
  const { data: dict, ok } = await DB
    .collection(DB_NAME.SYS_DICT)
    .where({ _id: dictId })
    .getOne()
  if (!dict.records && dict.records.length === 0) {
    return {
      data: [],
      success: ok
    }
  }  
  const r = {
    data: dict.records,
    success: ok
  }
  console.debug('Dict[fetchItemList] result->', r)
  return r
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
