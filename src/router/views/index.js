import Layout from '@/page/index/'

export default [{
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/views/admin/user/info')
  }]
}, {
  path: '/activti',
  component: Layout,
  redirect: '/activti/detail',
  children: [{
    path: 'detail/:id',
    component: () =>
      import(/* webpackChunkName: "views" */ '@/views/activiti/detail')
  }]
}, {
  path: '/gen',
  component: Layout,
  redirect: '/gen/dynamic',
  children: [{
    path: 'dynamic/:dsName/:tableName',
    component: () =>
      import(/* webpackChunkName: "views" */ '@/views/gen/dynamic')
  }]
}, {
  path: '/admin',
  component: Layout,
  children: [{
    path: '/admin/tenantmenu/index',
    component: () =>
      import(/* webpackChunkName: "views" */ '@/views/admin/tenantmenu/index')
  }]
}
]
