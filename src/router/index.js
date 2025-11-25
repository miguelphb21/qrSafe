import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('@/views/CadastroMain.vue'),
    },
    {
      path: '/informacoes',
      name: 'informacoes',
      component: () => import('@/views/InformacoesMain.vue'),
      meta: { requerAuth: true }
    },

      {
      path: '/emergencia',
      name: 'emergencia',
      component: () => import("@/views/EmergenciaView.vue"),
      meta: { publico: true }
    },

    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('@/views/sobreMain.vue')
    },
    {
      path: '/cartao',
      name: 'cartao',
      component: () => import('@/views/CartaoView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginMain.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashBoard.vue')
    }
  ],
})

export default router
