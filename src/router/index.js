import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeMain.vue'),
    },
    {
      path: '/cadastro',
      component: () => import('@/views/CadastroMain.vue'),
    },
    {
      path: '/sobre',
      component: () => import('@/views/sobreMain.vue')
    },
  ],
})

export default router
