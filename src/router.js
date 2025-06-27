import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 处理锚点链接的平滑滚动
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // 顶部偏移量，考虑固定头部的高度
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router 