/*
 * @Description: 
 * @Author: YiFan Zhang
 * @LastEditors: YiFan Zhang
 * @LastEditTime: 2025-09-22 16:06:18
 */
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', redirect: '/park' },
  // { path: '/', component: () => import('@/pages/home/indexTest.vue') },
  { path: '/hello', component: () => import('@/pages/hello/index.vue') },
  { path: '/trfirst', component: () => import('@/pages/trfloor/first.vue') },
  { path: '/trsecond', component: () => import('@/pages/trfloor/second.vue') },
  { path: '/trthird', component: () => import('@/pages/trfloor/three.vue') },
  { path: '/trfourth', component: () => import('@/pages/trfloor/four.vue') },
  { path: '/trfifth', component: () => import('@/pages/trfloor/five.vue') },
  { path: '/trtextEchart', component: () => import('@/pages/textEchartsAll/textEchart.vue') },
  // { path: '/ts', component: () => import('@/pages/home/indexTS.vue') },
  { path: '/2', component: () => import('@/pages/home/index.vue') },
  { path: '/park', component: () => import('@/pages/parkMonitor/index.vue') },
  { path: '/person', component: () => import('@/pages/personMonitor/index.vue') },
  { path: '/device', component: () => import('@/pages/deviceMonitor/index.vue') },
  { path: '/alarm', component: () => import('@/pages/alarmMonitor/index.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active' // 全局配置激活类名（所有 router-link 生效）
})

export default router
