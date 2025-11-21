<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const nomeUsuario = ref('Visitante');
const temCartao = ref(false);
const ultimaAtualizacao = ref('');

// Dicas de saúde para preencher a tela inicial com conteúdo útil


onMounted(() => {
  // 1. Verifica nome do usuário
  const dadosUser = localStorage.getItem('dadosUsuario');
  if (dadosUser) {
    const user = JSON.parse(dadosUser);
    nomeUsuario.value = user.nome || user.email.split('@')[0];
  }

  // 2. Verifica se já existe um cartão salvo
  const cartao = localStorage.getItem('cartaoEmergencia');
  if (cartao) {
    temCartao.value = true;
    // Simulando uma data de atualização (poderia salvar isso no objeto no futuro)
    ultimaAtualizacao.value = 'Hoje';
  }
});

const irParaCartao = () => {
  router.push('/cartao');
};

const irParaLogin = () => {
  router.push('/login');
};
</script>

<template>
  <main class="min-h-screen bg-[#F5F5F5] pb-20">

    <!-- HEADER / BOAS VINDAS -->
    <header class="bg-black text-white p-6 pt-10 rounded-b-[30px] shadow-lg relative overflow-hidden">
      <div class="relative z-10">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-400 text-sm">Bem-vindo(a) de volta,</p>
            <h1 class="text-2xl font-bold capitalize">{{ nomeUsuario }}</h1>
          </div>
          <div class="bg-white/20 p-2 rounded-full backdrop-blur-sm">
             <img src="../assets/images/qrLogo.png" class="w-8 h-8 invert brightness-0" alt="Logo">
          </div>
        </div>

        <!-- CARD DE STATUS DO QR CODE -->
        <div v-if="temCartao" class="mt-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p class="font-bold text-sm">Status do QR Code</p>
            <p class="text-xs text-green-400 flex items-center gap-1">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Ativo e pronto para uso
            </p>
          </div>
          <button @click="irParaCartao" class="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            Ver Cartão
          </button>
        </div>

        <div v-else class="mt-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-center">
           <p class="text-sm mb-2">Você ainda não tem um cartão ativo.</p>
           <button @click="irParaLogin" class="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg w-full">
             Criar Cartão Agora
           </button>
        </div>
      </div>

      <!-- Efeito de fundo decorativo -->
      <div class="absolute -right-10 -bottom-20 w-64 h-64 bg-gray-800 rounded-full opacity-50 blur-3xl"></div>
    </header>

    <div class="px-6 -mt-6 relative z-20">

      <!-- ATALHOS RÁPIDOS (Números de Emergência) -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        <a href="tel:192" class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-md transition active:scale-95 cursor-pointer">
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2 text-xl">🚑</div>
          <span class="font-bold text-gray-800 text-lg">192</span>
          <span class="text-xs text-gray-500">SAMU</span>
        </a>
        <a href="tel:193" class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-md transition active:scale-95 cursor-pointer">
          <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2 text-xl">🚒</div>
          <span class="font-bold text-gray-800 text-lg">193</span>
          <span class="text-xs text-gray-500">Bombeiros</span>
        </a>
      </div>

      <!-- AÇÕES DO SISTEMA -->
      <h3 class="font-bold text-gray-800 mb-4 text-lg">Acesso Rápido</h3>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div @click="irParaCartao" class="p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50">
          <div class="flex items-center gap-3">
            <div class="bg-gray-100 p-2 rounded-lg">📝</div>
            <div>
              <p class="font-bold text-sm">Editar Meus Dados</p>
              <p class="text-xs text-gray-500">Mantenha suas informações médicas atuais</p>
            </div>
          </div>
          <span class="text-gray-400">›</span>
        </div>

        <div class="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
          <div class="flex items-center gap-3">
            <div class="bg-gray-100 p-2 rounded-lg">🔗</div>
            <div>
              <p class="font-bold text-sm">Compartilhar Sistema</p>
              <p class="text-xs text-gray-500">Envie para amigos e família</p>
            </div>
          </div>
          <span class="text-gray-400">›</span>
        </div>
      </div>

      <!-- DICAS DE PRIMEIROS SOCORROS -->



    </div>
  </main>
</template>
