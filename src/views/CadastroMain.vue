<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const nome = ref('');
const email = ref('');
const password = ref('');

// --- SISTEMA DE TOAST (NOTIFICAÇÃO) ---
const toast = reactive({
  show: false,
  message: '',
  type: 'success' // 'success' ou 'error'
});

const triggerToast = (msg, type = 'success') => {
  toast.message = msg;
  toast.type = type;
  toast.show = true;
  // Esconde depois de 3 segundos
  setTimeout(() => {
    toast.show = false;
  }, 3000);
};

const handleRegister = () => {
  if (!nome.value || !email.value || !password.value) {
    triggerToast("Preencha todos os campos!", 'error');
    return;
  }

  // 1. Abrir (ou criar) o Banco de Dados IndexedDB
  const request = window.indexedDB.open("QrSafeDB", 1);

  // 2. Cria a tabela 'users' se ela não existir
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("users")) {
      db.createObjectStore("users", { keyPath: "email" });
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["users"], "readwrite");
    const objectStore = transaction.objectStore("users");

    // 4. Tenta adicionar o usuário
    const addUserRequest = objectStore.add({
      nome: nome.value,
      email: email.value,
      password: password.value
    });

    addUserRequest.onsuccess = () => {
      // SUCESSO
      triggerToast("Conta criada com sucesso! Redirecionando...", 'success');

      // Aguarda 2 segundos para o usuário ler o toast antes de ir pro login
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    };

    addUserRequest.onerror = () => {
      // ERRO (Geralmente email duplicado)
      triggerToast("Erro: Este e-mail já está cadastrado.", 'error');
    };
  };

  request.onerror = () => {
    triggerToast("Erro crítico ao acessar o banco de dados.", 'error');
  };
};
</script>

<template>
  <main class="min-h-screen items-center px-4 bg-[#EEEEEE] pt-10 relative">

    <!-- COMPONENTE TOAST -->
    <div v-if="toast.show" class="toast toast-top toast-end z-50 mt-4 mr-2">
      <div :class="['alert shadow-lg text-white font-semibold', toast.type === 'success' ? 'alert-success' : 'alert-error']">
        <!-- Ícones Opcionais -->
        <span v-if="toast.type === 'success'">✅</span>
        <span v-else>⚠️</span>
        <span>{{ toast.message }}</span>
      </div>
    </div>

    <div class="w-full max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div class="w-full max-w-[420px] mx-auto text-center mt-2 mb-6">
        <h1 class="text-3xl sm:text-4xl font-bold leading-tight">Cadastre-se</h1>
        <p class="text-[15px] mt-4 text-gray-600">Preencha com suas informações de login</p>
      </div>

      <form @submit.prevent="handleRegister">
        <p class="mt-3 text-[17px] font-semibold">Nome Completo *</p>
        <input v-model="nome" type="text" class="w-full border border-gray-300 p-1.5 rounded focus:outline-none focus:border-black transition-colors" placeholder="Ex: João Silva...">

        <p class="mt-3 text-[17px] font-semibold">E-mail *</p>
        <input v-model="email" type="email" class="w-full border border-gray-300 p-1.5 rounded focus:outline-none focus:border-black transition-colors" placeholder="Ex: user@email.com">

        <p class="mt-3 text-[17px] font-semibold">Senha *</p>
        <input v-model="password" type="password" class="w-full border border-gray-300 p-1.5 rounded focus:outline-none focus:border-black transition-colors" placeholder="Ex: 123456...">

        <div class="p-5 px-0">
          <button type="submit" class="w-full cursor-pointer bg-black text-[15px] font-bold text-white py-2 rounded-[7px] hover:bg-gray-800 transition-colors">Criar Conta</button>
        </div>

        <p class="text-center text-sm">Já tem conta? <router-link to="/login" class="font-bold text-blue-600 hover:underline">Faça Login</router-link></p>
      </form>
    </div>
  </main>
</template>
