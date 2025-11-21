import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home', // <--- ADICIONADO O NOME
      component: () => import('@/views/HomeMain.vue'),
    },
    {
      path: '/cadastro',
      name: 'cadastro', // <--- ADICIONADO O NOME
      component: () => import('@/views/CadastroMain.vue'),
    },
    {
      path: '/sobre',
      name: 'sobre', // <--- ADICIONADO O NOME
      component: () => import('@/views/sobreMain.vue')
    },
    {
      path: '/registro',
      name: 'registro', // <--- ADICIONADO O NOME
      component: () => import('@/views/RegistroMain.vue')
    },
    {
      path: '/login',
      name: 'login', // <--- ADICIONADO O NOME
      component: () => import('@/views/LoginMain.vue')
    },
    // ADICIONE ESTA ROTA PARA A TELA LOGADA (O CARTÃO)
    // {
    //   path: '/cartao',
    //   name: 'cartao',
    //   // Certifique-se de criar este arquivo ou apontar para onde salvou o form
    //   component: () => import('@/views/CartaoMain.vue')
    // },
  ],
})

export default router
