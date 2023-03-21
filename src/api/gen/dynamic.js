import request from '@/router/axios'

export function dynamicApi(table) {
  return request({
    url: '/gen/dynamic/gen',
    method: 'get',
    params: table
  })
}


export function getTableConfig(tableName, dsName) {
  return request({
    url: '/gen/form/info',
    params: {tableName: tableName, dsName: dsName},
    method: 'get'
  })
}

export function getTableData(tableName, dsName, query) {
  return request({
    url: `/gen/api/dynamic/${dsName}/${tableName}/list`,
    method: 'post',
    params: query
  })
}

export function getTableMetaData(tableName, dsName, query) {
  return request({
    url: `/gen/api/dynamic/${dsName}/${tableName}/metadata`,
    method: 'get'
  })
}

export function delTableData(tableName, dsName, id) {
  return request({
    url: `/gen/api/dynamic/${dsName}/${tableName}/delete?id=` + id,
    method: 'delete'
  })
}

export function addTableData(tableName, dsName, obj) {
  return request({
    url: `/gen/api/dynamic/${dsName}/${tableName}/save`,
    method: 'post',
    data: obj
  })
}

export function updateTableData(tableName, dsName, obj) {
  return request({
    url: `/gen/api/dynamic/${dsName}/${tableName}/update`,
    method: 'put',
    data: obj
  })
}
