import { createRouter, createWebHashHistory } from 'vue-router'

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
    meta: { requiresAuth: false },
    component: () => import('../views/Login/Index.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        meta: { requiresAuth: false },
        component: () => import('../views/Login/Login.vue')
      },
      /*{
        path: 'register',
        name: 'Register',
        meta: { requiresAuth: false },
        component: () => import('../views/Login/Register.vue')
      }*/
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router