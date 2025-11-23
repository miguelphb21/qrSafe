<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const nome = ref('');
const email = ref('');
const password = ref('');

const handleRegister = () => {
  if (!nome.value || !email.value || !password.value) {
    alert("Preencha todos os campos!");
    return;
  }

  const request = window.indexedDB.open("QrSafeDB", 1);

  // 2. Cria a tabela 'users' se ela não existir (executa na primeira vez)
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStorenomes.contains("users")) {
      // Cria a 'tabela' users usando o email como chave única (ID)
      db.createObjectStore("users", { keyPath: "email" });
    }
  };

  request.onsuccess = async (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["users"], "readwrite");
    const objectStore = transaction.objectStore("users");

    const addUserRequest = objectStore.add({
      nome: nome.value,
      email: email.value,
      password: password.value
    });

    addUserRequest.onsuccess = () => {
      alert("Usuário cadastrado com sucesso!");
      router.push('/login'); // Redireciona para a rota de login
    };

    addUserRequest.onerror = () => {
      alert("Erro: Este e-mail já está cadastrado.");
    };
  };

  request.onerror = () => {
    triggerToast("Erro crítico ao acessar o banco de dados.", 'error');
  };
};
</script>

<template>
  <main class="min-h-screen items-center px-4 bg-[#EEEEEE] pt-10">
    <div class="w-full max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div class="w-full max-w-[420px] mx-auto text-center mt-2 mb-6">
        <h1 class="text-3xl sm:text-4xl font-bold leading-tight">Cadastre-se</h1>
        <p class="text-[15px] mt-4 text-gray-600">Preencha com suas informações de login</p>
      </div>

      <!-- Formulário: GRID Layout adicionado -->
      <form @submit.prevent="handleRegister" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 px-10 py-12">

        <!-- Grupo Nome (Coluna 1) -->
        <div class="group">
          <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1 transition-colors group-focus-within:text-black">
            Nome Completo
          </label>
          <input
            v-model="nome"
            type="text"
            class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
            placeholder="Ex: João Silva"
          >
        </div>

        <!-- Grupo Email (Coluna 2) -->
        <div class="group">
          <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1 transition-colors group-focus-within:text-black">
            E-mail
          </label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
            placeholder="Ex: user@email.com"
          >
        </div>

        <!-- Grupo Senha (Coluna 1) -->
        <div class="group">
          <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1 transition-colors group-focus-within:text-black">
            Senha
          </label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
            placeholder="Crie uma senha"
          >
        </div>

        <!-- Grupo Repetir Senha (Coluna 2) -->
        <div class="group">
          <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1 transition-colors group-focus-within:text-black">
            Repetir Senha
          </label>
          <input
            v-model="confirmPassword"
            type="password"
            class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
            placeholder="Confirme a senha"
          >
        </div>

        <!-- Botão Principal (Ocupa as 2 colunas) -->
        <div class="md:col-span-2 pt-4">
          <button
            type="submit"
            class="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-900 transform active:scale-[0.98] transition-all duration-200 text-base tracking-wide"
          >
            Criar Conta
          </button>
        </div>

        <!-- Link Login (Ocupa as 2 colunas) -->
        <div class="md:col-span-2 text-center -mt-2">
          <p class="text-sm text-gray-500">
            Já tem conta?
            <router-link to="/login" class="font-bold text-black border-b-2 border-transparent hover:border-black transition-all pb-0.5">
              Faça Login
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </main>
</template>
