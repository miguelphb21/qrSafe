<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Adicionado useRouter

const route = useRoute();
const router = useRouter(); // Instância do roteador para redirecionar

// 1. Controla se a LOGO e o MENU MOBILE aparecem
const mostrar = computed(() => {
  const rotasEscondidas = ['login', 'cadastro', 'registro'];
  // Se route.name for undefined (carregando), assume false para evitar erros
  return route.name && !rotasEscondidas.includes(route.name);
});

// 2. Verifica se o usuário está LOGADO baseado na rota (UI Logada)
const usuarioLogado = computed(() => {
  const rotasAutenticadas = ['dashboard', 'cartao'];
  return route.name && rotasAutenticadas.includes(route.name);
});

// 3. FUNÇÃO DE LOGOUT (Adicionada)
const fazerLogout = () => {
  // A. Limpa os dados de sessão do navegador
  localStorage.removeItem('usuarioLogado');
  localStorage.removeItem('dadosUsuario');

  // Opcional: Se quiser limpar o cartão da memória também
  // localStorage.removeItem('cartaoEmergencia');

  // B. Fecha o menu mobile se estiver aberto (buscando pelo ID do checkbox)
  const drawerCheckbox = document.getElementById('my-drawer-5');
  if (drawerCheckbox) drawerCheckbox.checked = false;

  // C. Redireciona para a tela de login
  router.push('/login');
};
</script>

<template>
  <!-- O Header inteiro só aparece se não estiver nas rotas escondidas -->
  <header>
    <div class="navbar bg-[#000] text-neutral-content transition-all duration-300">

      <!-- LOGO (Canto Esquerdo) -->
      <div class="navbar-start ml-6">
        <RouterLink :to="usuarioLogado ? '/dashboard' : '/'">
          <button class="cursor-pointer text-[20px] font-extrabold flex items-center text-white hover:opacity-80 transition-opacity">
            QrSafe
            <img class="ml-2" width="30" height="30" src="../assets/images/qrLogo.png" alt="Logo">
          </button>
        </RouterLink>
      </div>

      <!-- MENU MOBILE (Drawer / Hambúrguer) -->
      <div class="md:hidden navbar-end">
        <input id="my-drawer-5" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <label for="my-drawer-5" class="border-none bg-[#000] drawer-button btn btn-primary">
            <svg class="swap-off fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
        </div>

        <div class="drawer-side z-50">
          <label for="my-drawer-5" aria-label="close sidebar" class="drawer-overlay"></label>
          <ul class="menu bg-white text-black min-h-full w-80 p-4 font-bold">
            <li class="mb-4">
              <label for="my-drawer-5" aria-label="close sidebar" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            </li>

            <!-- ITENS MOBILE -->
            <template v-if="!usuarioLogado">
              <li @click="document.getElementById('my-drawer-5').checked = false"><RouterLink to="/cadastro">Cadastro</RouterLink></li>
              <li @click="document.getElementById('my-drawer-5').checked = false"><RouterLink to="/login">Login</RouterLink></li>
              <li @click="document.getElementById('my-drawer-5').checked = false"><RouterLink to="/sobre">Sobre</RouterLink></li>
            </template>

            <!-- Se ESTIVER logado -->
            <template v-else>
              <li @click="document.getElementById('my-drawer-5').checked = false"><RouterLink to="/cartao">Meu Cartão</RouterLink></li>
              <!-- AQUI MUDOU: Agora chama a função fazerLogout -->
              <li><a @click="fazerLogout" class="text-red-600 hover:bg-red-50">Sair</a></li>
            </template>
          </ul>
        </div>
      </div>

      <!-- MENU DESKTOP (Telas Grandes) -->
      <div class="navbar-end hidden md:flex">
        <ul class="menu menu-horizontal px-1 font-semibold text-sm">

          <!-- Se NÃO estiver logado: Mostra tudo -->
          <template v-if="!usuarioLogado">
            <li v-if="mostrar" class="hover:text-gray-300 transition-colors"><RouterLink to="/cadastro">Cadastro</RouterLink></li>
            <li v-if="mostrar" class="hover:text-gray-300 transition-colors"><RouterLink to="/login">Login</RouterLink></li>
            <li class="hover:text-gray-300 transition-colors"><RouterLink to="/sobre">Sobre</RouterLink></li>
          </template>

          <!-- Se ESTIVER logado: Mostra Sair -->
          <template v-else>
             <!-- AQUI MUDOU: Botão Sair com lógica -->
             <li>
               <button @click="fazerLogout" class="hover:text-red-400 transition-colors cursor-pointer">
                 Sair
               </button>
             </li>
          </template>

        </ul>
      </div>

    </div>
  </header>
</template>
