import {cloud} from "@/api/cloud"
// 初始化DB对象
const DB = cloud.database()
// 定义操作的文档
const DB_NAME = {
  SYS_DEPT: 'sys_dept'
}

export async function fetchTree(query) {
  console.debug('Dept[fetchTree] request param')
  let res = await DB.collection(DB_NAME.SYS_DEPT)
    .where({})
    .orderBy('sortOrder','asc')
    .get()
  res.data = buildTree(res.data)
  console.debug('Dept[fetchTree] res->', res)
  return res
}

export async function addObj(obj) {
  console.log('Dept[addObj] request param obj->', obj)
  const o = {
    ...obj,
    createTime: new Date()
  }
  const res = await DB.collection(DB_NAME.SYS_DEPT)
    .add(o)
  console.log('Dept[addObj] response result->', res)
}

/**
 * 根据ID 查询部门信息
 * @param id 主键
 */
export async function getObj(id) {
  console.log('Dept[getObj] request param ID->', id)
  const res = await DB.collection(DB_NAME.SYS_DEPT).where({
    _id: id
  }).getOne()
  console.log('Dept[getObj] response result->', res)
  return res
}

export async function delObj(id) {
  console.log('Dept[delObj] request param ID->', id)
  const res = await DB.collection(DB_NAME.SYS_DEPT).where({
    _id: id
  }).remove()
  console.log('Dept[delObj] response result->', res)
  return res
}

export async function putObj(obj) {
  console.debug('Dept[putObj] request param obj->', obj)
  const id = obj._id
  const data = {
    ...obj,
    updateTime: Date.now(),
    _id: undefined,
  };
  // 不可更新主键
  delete data._id;
  const res = await DB.collection(DB_NAME.SYS_DEPT)
    .doc(id)
    .update(data)
  console.debug('Dept[putObj] result->', res)
  return res

}


function buildTree(permissions) {
  let tree = [];
  for (let i = 0; i < permissions.length; i++) {
    let arr = [];
    for (let j = 0; j < permissions.length; j++) {
      if (permissions[i]._id === permissions[j].parentId) {
        permissions[i].children = arr;
        arr.push(permissions[j]);
      }
    }
  }
  for (let i = 0; i < permissions.length; i++) {
    if (permissions[i].parentId === '0') {
      tree.push(permissions[i]);
    }
  }
  return tree;
}
