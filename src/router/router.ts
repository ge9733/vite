import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/discovery',
    name: 'discovery',
    component: () => import('@/view/DiscoveryMusic.vue')
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('@/view/mv/Mv.vue')
  },
  {
    path: '/newest',
    name: 'newest',
    component: () => import('@/view/Newest.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/view/recommend.vue')
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: () => import('@/view/playlist/PlayList.vue')
  },
  {
    path: '/MvPlay/:id',
    name: 'mvPlay',
    component: () => import('@/view/mv/MvPlay.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/discovery'
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
