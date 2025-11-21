import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'inicio', // <--- ADICIONADO O NOME
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/cadastro',
      name: 'cadastro', // <--- ADICIONADO O NOME
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
      component: () => import('@/views/PerfilView.vue'),
      // Esta rota NÃO deve ter 'requerAuth', pois o médico/socorrista não tem login
    },
    {
      path: '/sobre',
      name: 'sobre', // <--- ADICIONADO O NOME
      component: () => import('@/views/sobreMain.vue')
    },
    {
      path: '/cartao',
      name: 'cartao', // <--- ADICIONADO O NOME
      component: () => import('@/views/CartaoView.vue')
    },
    {
      path: '/login',
      name: 'login', // <--- ADICIONADO O NOME
      component: () => import('@/views/LoginMain.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/PaginaInicial.vue')
    }
  ],
})

export default router
