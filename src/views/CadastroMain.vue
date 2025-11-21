<script setup>
import { ref } from 'vue';
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

  // 1. Abrir (ou criar) o Banco de Dados IndexedDB
  const request = window.indexedDB.open("QrSafeDB", 1);

  // 2. Cria a tabela 'users' se ela não existir (executa na primeira vez)
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStorenomes.contains("users")) {
      // Cria a 'tabela' users usando o email como chave única (ID)
      db.createObjectStore("users", { keyPath: "email" });
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    // 3. Inicia uma transação de escrita
    const transaction = db.transaction(["users"], "readwrite");
    const objectStore = transaction.objectStore("users");

    // 4. Tenta adicionar o usuário
    const addUserRequest = objectStore.add({
      nome: nome.value,
      email: email.value,
      password: password.value // Nota: Em produção real, nunca salve senhas sem criptografia
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
    alert("Erro ao acessar o banco de dados local.");
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
