<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import qrLogo from '../assets/images/qrLogo.png';
// Importe as funções do serviço novo
import { buscarUsuarioPorEmail, salvarSessao, verificarCartaoExistente } from '../services/db.js';


const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
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
          router.push('/cartao'); // Ou home, dependendo da sua lógica
        }

      } else {
        alert("Senha incorreta!");
      }
    } else {
      alert("Usuário não encontrado.");
    }
  } catch (error) {
    console.error(error);
    alert("Erro no sistema de login.");
  }
};
</script>

<!-- TEMPLATE CONTINUA IGUAL (VISUAL NÃO MUDA) -->
<template>

  <main class="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 font-sans text-gray-900">
    <!-- ... (mesmo código do card de login anterior) ... -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">
      <div class="px-8 pt-10 pb-6 text-center">
        <router-link to="/" class="inline-flex items-center justify-center group mb-4 hover:opacity-80 transition-opacity">
            <span class="text-3xl font-black tracking-tighter text-black mr-2">QrSafe</span>
            <img :src="qrLogo" width="35" height="35" alt="Logo QrSafe" class="object-contain" />
        </router-link>
        <h1 class="text-xl font-medium text-gray-500">Bem-vindo de volta</h1>
      </div>

      <form class="px-8 pb-10 space-y-6" @submit.prevent="handleLogin">
        <div class="group">
          <label for="email" class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1 transition-colors group-focus-within:text-black">E-mail</label>
          <input v-model="email" type="email" id="email" class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400" placeholder="seu@email.com" />
        </div>
        <div class="group">
          <label for="password" class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1 transition-colors group-focus-within:text-black">Senha</label>
          <input v-model="password" type="password" id="password" class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400" placeholder="********" />
        </div>
        <div class="pt-4">
          <button type="submit" class="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-900 transform active:scale-[0.98] transition-all duration-200 text-base tracking-wide">Entrar</button>
        </div>
        <div class="text-center pt-2">
          <p class="text-sm text-gray-500">Ainda não tem conta? <RouterLink to="/cadastro" class="font-bold text-black border-b-2 border-transparent hover:border-black transition-all pb-0.5 ml-1">Cadastre-se aqui</RouterLink></p>
        </div>
      </form>
    </div>
  </main>
</template>
