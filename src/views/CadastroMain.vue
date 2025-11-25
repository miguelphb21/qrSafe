<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const nome = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// FrontEND, um cartão que é gerado quando algo der certo ou não

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
});

const triggerToast = (msg, type = 'success') => {
  toast.message = msg;
  toast.type = type;
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);
};

const registroDeUsuario = () => {
  //  se caso alguma caixa de texto estiver alterada
  if (!nome.value || !email.value || !password.value || !confirmPassword.value) {
    triggerToast("Preencha todos os campos!", 'error');
    return;
  }

  if (password.value !== confirmPassword.value) {
    triggerToast("As senhas não coincidem!", 'error');
    return;
  }

  const request = window.indexedDB.open("QrSafeDB", 1);

  // cria a entidade Users
  request.onupgradeneeded = async (event) => {
    const db = await event.target.result;
    if (!db.objectStoreNames.contains("users")) {
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
      triggerToast("Conta criada com sucesso! Redirecionando...", 'success');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    };

    addUserRequest.onerror = () => {
      triggerToast("Erro: Este e-mail já está cadastrado.", 'error');
    };
  };

  request.onerror = () => {
    triggerToast("Erro crítico ao acessar o banco de dados.", 'error');
  };
};
</script>

<template>
  <!-- Fundo cinza suave -->
  <main class="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 font-sans text-gray-900">

    <!-- TOAST -->
    <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="toast.show" class="fixed top-6 right-6 z-50">
        <div :class="['px-6 py-4 rounded-lg shadow-xl border-l-4 font-medium bg-white',
          toast.type === 'success' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700']">
          {{ toast.message }}
        </div>
      </div>
    </Transition>

    <!-- CARD PRINCIPAL: Aumentado para max-w-3xl para acomodar itens horizontais -->
    <div class="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">

      <!-- Cabeçalho com mais espaçamento -->
      <div class="px-10 pt-12 pb-8 text-center border-b border-gray-100">
        <h1 class="text-4xl font-extrabold tracking-tight text-black mb-2">Cadastre-se</h1>
        <p class="text-gray-500 text-sm font-medium">Crie sua conta para acessar o QrSafe</p>
      </div>

      <!-- Formulário: GRID Layout adicionado -->
      <form @submit.prevent="registroDeUsuario" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 px-10 py-12">

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
