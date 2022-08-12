import Page from '@/page'
const asyncRoutes = [{
  path: '/page',
  component: Page,
  meta: {
    title: 'page',
    keepAlive: true,
    auth: 'page',
    needLogin: true
  },
  children: [
    {
      path: 'asyncRouteExample',
      name: 'asyncRouteExample',
      meta: {
        title: '页面',
        keepAlive: true,
        auth: 'page.asyncRouteExample',
        needLogin: true
      },
      component: () => import('@/views/asyncRouteExample/asyncRouteExample')
    },
    {
      path: 'asyncRouteExample1',
      name: 'asyncRouteExample1',
      meta: {
        title: '页面',
        keepAlive: true,
        auth: 'page.asyncRouteExample1',
        needLogin: true
      },
      component: () => import('@/views/asyncRouteExample1/asyncRouteExample1')
    }

  ]
}
]
export default asyncRoutes
