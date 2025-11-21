<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = () => {
  if (!email.value || !password.value) {
    alert("Preencha e-mail e senha!");
    return;
  }

  const request = window.indexedDB.open("QrSafeDB", 1);

  request.onerror = () => alert("Erro ao abrir o banco de dados. Você já se cadastrou?");

  request.onsuccess = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains("users")) {
      alert("Nenhum usuário cadastrado encontrado.");
      return;
    }

    const transaction = db.transaction(["users"], "readonly");
    const objectStore = transaction.objectStore("users");
    const getRequest = objectStore.get(email.value);

    getRequest.onsuccess = () => {
      const user = getRequest.result;
      if (user) {
        if (user.password === password.value) {
          alert("Login realizado com sucesso!");
          router.push('/registro');
        } else {
          alert("Senha incorreta!");
        }
      } else {
        alert("Usuário não encontrado com este e-mail.");
      }
    };
    getRequest.onerror = () => alert("Erro ao buscar usuário.");
  };
};
</script>

<template>
  <main class="min-h-screen bg-[#EEEEEE] flex items-center justify-center">
    <div class="w-full max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">

      <div class="text-center mb-8">
        <router-link to="/">
          <button class="navbar-start cursor-pointer text-3xl font-extrabold pb-2 flex items-center justify-center w-full">QrSafe <img class="ml-2" width="30" height="30" src="../assets/images/qrLogo.png" alt="Logo"></button>
        </router-link>
        <h6 class="text-[15px] mt-4 text-gray-600">Bem-vindo de volta</h6>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-sm font-bold pb-1" for="email">Email</label>
          <input v-model="email" type="email" id="email" placeholder="seu@email.com" class="w-full bg-[#cecece] rounded-lg p-3 focus:outline-none focus:border-white transition-colors" />
        </div>

        <div>
          <label class="block text-sm font-bold pb-1" for="password">Senha</label>
          <input v-model="password" type="password" id="password" placeholder="********" class="w-full bg-[#cecece] rounded-lg p-3 focus:outline-none focus:border-white transition-colors" />
        </div>

        <button type="submit" class="mt-4 bg-black cursor-pointer text-white font-extrabold py-3 rounded-lg hover:bg-gray-900 transition-colors w-full">Entrar</button>
      </form>

      <div class="mt-6 text-center">
        <h6 class="pb-1 text-sm text-black">Ainda não tem conta?</h6>
        <RouterLink to="/cadastro">
          <span class="font-bold underline text-gray-800 cursor-pointer hover:text-gray-700">Cadastre-se aqui</span>
        </RouterLink>
      </div>

      <div class="mt-8 flex justify-center items-center pb-2 opacity-50 hover:opacity-100 transition-opacity"></div>
    </div>
  </main>
</template>
