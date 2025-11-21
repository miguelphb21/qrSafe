<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 1. Lógica para esconder o Header INTEIRO (já existente)
const mostrarMenu = computed(() => {
  const rotasEscondidas = ['login', 'cadastro'];
  return !rotasEscondidas.includes(route.name);
});

// 2. NOVA Lógica: Verifica se o usuário está logado baseando-se na rota atual
const usuarioLogado = computed(() => {
  // COLOQUE AQUI o 'name' da rota da sua página de Cartão de Emergência.
  // Por exemplo: 'cartao', 'dashboard', 'home', etc.
  const rotasAutenticadas = ['cartao', 'emergencia'];

  return rotasAutenticadas.includes(route.name);
});
</script>

<template>
  <header v-if="mostrarMenu">
    <div class="navbar bg-[#000] text-neutral-content">

      <div class="navbar-start ml-6">
        <RouterLink to="/">
          <button class="cursor-pointer text-[20px] font-extrabold flex items-center text-white">
            QrSafe
            <img class="ml-2" width="30" height="30" src="../assets/images/qrLogo.png" alt="Logo">
          </button>
        </RouterLink>
      </div>

      <div class="md:hidden navbar-end">
        <input id="my-drawer-5" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <label for="my-drawer-5" class="border-none bg-[#000] drawer-button btn btn-primary">
            <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
        </div>

        <div class="drawer-side z-50">
          <label for="my-drawer-5" aria-label="close sidebar" class="drawer-overlay"></label>
          <ul class="menu bg-base-200 text-[#000] min-h-full w-80 p-4">
            <li class="mb-4">
              <label for="my-drawer-5" aria-label="close sidebar" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            </li>

            <template v-if="!usuarioLogado">
              <li @click="document.getElementById('my-drawer-5').checked = false">
                <RouterLink to="/cadastro">Cadastro</RouterLink>
              </li>
              <li @click="document.getElementById('my-drawer-5').checked = false">
                <RouterLink to="/login">Login</RouterLink>
              </li>
            </template>

            <li @click="document.getElementById('my-drawer-5').checked = false">
              <RouterLink to="/sobre">Sobre</RouterLink>
            </li>

            <li v-if="usuarioLogado" @click="document.getElementById('my-drawer-5').checked = false">
               <RouterLink to="/login">Sair</RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="navbar-end hidden md:flex">
        <ul class="menu menu-horizontal px-1">

          <template v-if="!usuarioLogado">
            <li><RouterLink to="/cadastro">Cadastro</RouterLink></li>
            <li><RouterLink to="/login">Login</RouterLink></li>
          </template>

          <li><RouterLink to="/sobre">Sobre</RouterLink></li>

          <li v-if="usuarioLogado"><RouterLink to="/login">Sair</RouterLink></li>
        </ul>
      </div>

    </div>
  </header>
</template>
