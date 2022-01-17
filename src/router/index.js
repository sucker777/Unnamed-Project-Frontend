import { createRouter, createWebHashHistory } from 'vue-router'
import { useAppStore } from '@/store'

const routes = [
  {
    path: '/',
    name: 'App',
    meta: { requiresAuth: false },
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: 'Home',
    meta: { requiresAuth: false },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/',
    meta: { disableForAuthenticated: true },
    component: () => import('../views/Login/Index.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        meta: { disableForAuthenticated: true },
        component: () => import('../views/Login/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        meta: { disableForAuthenticated: true },
        component: () => import('../views/Login/Register.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async function (to) {
  
  const appStore = useAppStore()
  
  if (to.meta.disableForAuthenticated === true) {
    if(appStore.authenticated) {
      return { name: 'Home' }
    }
  }
})

export default router