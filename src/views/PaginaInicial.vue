<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
<<<<<<< HEAD
import qrLogo from '../assets/images/qrLogo.png';
// Importa funções do banco
import { getSessao,  verificarCartaoExistente } from '../services/db';

const router = useRouter();
const nomeUsuario = ref('');
const temCartao = ref(false);

onMounted(async () => {
  try {
    // 1. Busca a sessão no IndexedDB
    const usuarioLogado = await getSessao();

    if (!usuarioLogado) {
      alert("Acesso negado. Faça login.");
      router.push('/login');
      return;
    }

    // 2. Preenche dados
    nomeUsuario.value = usuarioLogado.nome;

    // 3. Verifica cartão (aqui ainda usando a lógica mista ou DB se você migrou cartões)
    const cartao = await verificarCartaoExistente(usuarioLogado.email);
    if (cartao) temCartao.value = true;

  } catch (error) {
    console.error("Erro ao carregar home:", error);
    router.push('/login');
  }
});



const irParaCartao = () => router.push('/cartao');
</script>

<template>
  <!-- O HTML PERMANECE EXATAMENTE O MESMO DO CÓDIGO ANTERIOR -->
  <main class="min-h-screen bg-[#F5F5F5] pb-20 font-sans">
    <header class="bg-black text-white p-6 pt-10 rounded-b-[30px] shadow-2xl relative overflow-hidden">
      <div class="relative z-10">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-400 text-sm font-medium mb-1">Bem-vindo(a) de volta,</p>
            <h1 class="text-2xl font-bold capitalize tracking-tight">{{ nomeUsuario || '...' }}</h1>
          </div>
          <div class="flex flex-col items-end gap-2">
            <div class="bg-white/20 p-2 rounded-full backdrop-blur-sm shadow-inner">
               <img :src="qrLogo" class="w-8 h-8 invert " alt="Logo">
            </div>

          </div>
        </div>

        <div v-if="temCartao" class="mt-8 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p class="font-bold text-sm text-white">Status do QR Code</p>
            <p class="text-xs text-green-400 flex items-center gap-1.5 mt-1 font-medium bg-green-400/10 px-2 py-1 rounded-md w-fit">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span> Ativo e seguro
            </p>
          </div>
          <button @click="irParaCartao" class="bg-white text-black text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-md">
=======

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
>>>>>>> 692f010 (WP:Adicionando a logica do sistma e criando novas paginas)
            Ver Cartão
          </button>
        </div>

<<<<<<< HEAD
        <div v-else class="mt-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center shadow-lg">
           <div class="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">⚠️</div>
           <p class="text-sm font-medium text-gray-200 mb-4">Você ainda não configurou seu cartão.</p>
           <button @click="irParaCartao" class="bg-white text-black text-sm font-bold px-6 py-3 rounded-xl w-full hover:bg-gray-100 transition-colors shadow-md">
=======
        <div v-else class="mt-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-center">
           <p class="text-sm mb-2">Você ainda não tem um cartão ativo.</p>
           <button @click="irParaLogin" class="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg w-full">
>>>>>>> 692f010 (WP:Adicionando a logica do sistma e criando novas paginas)
             Criar Cartão Agora
           </button>
        </div>
      </div>
<<<<<<< HEAD
      <div class="absolute -right-10 -bottom-20 w-64 h-64 bg-gray-800 rounded-full opacity-50 blur-3xl pointer-events-none"></div>
      <div class="absolute -left-10 -top-20 w-64 h-64 bg-gray-900 rounded-full opacity-50 blur-3xl pointer-events-none"></div>
    </header>

    <div class="px-6 -mt-6 relative z-20">
      <div v-if="temCartao">
        <h3 class="font-bold text-gray-800 mt-8 mb-4 text-lg tracking-tight">Acesso Rápido</h3>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div @click="irParaCartao" class="p-5 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group">
            <div class="flex items-center gap-4">
              <div class="bg-gray-100 p-3 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">📝</div>
              <div>
                <p class="font-bold text-sm text-gray-900">Editar Meus Dados</p>
                <p class="text-xs text-gray-500 mt-0.5">Atualize informações médicas</p>
              </div>
            </div>
            <span class="text-gray-300 group-hover:text-black transition-colors">›</span>
          </div>
          <div class="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group">
            <div class="flex items-center gap-4">
              <div class="bg-gray-100 p-3 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">🔗</div>
              <div>
                <p class="font-bold text-sm text-gray-900">Compartilhar</p>
                <p class="text-xs text-gray-500 mt-0.5">Envie seu perfil para contatos</p>
              </div>
            </div>
            <span class="text-gray-300 group-hover:text-black transition-colors">›</span>
          </div>
        </div>
      </div>
      <div v-else class="mt-12 text-center px-4">
        <p class="text-gray-400 text-sm">Complete seu cadastro acima para desbloquear as funcionalidades.</p>
      </div>
=======

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



>>>>>>> 692f010 (WP:Adicionando a logica do sistma e criando novas paginas)
    </div>
  </main>
</template>
