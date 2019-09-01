import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

// 基础路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]
// 需动态加载的路由
export const asyncRoutes = []

/**
 * vue-router路由权限控制 两种方式
 * @see https://blog.csdn.net/suolong914/article/details/89432563
 */
const createRouter = () => new Router({
  // mode: 'history',  // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
