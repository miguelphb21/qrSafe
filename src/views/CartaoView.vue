<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // <--- Adicionado useRoute
import QrcodeVue from 'qrcode.vue';
// Importamos as funções do banco de dados
import { getSessao, salvarCartao, buscarCartao } from '../services/db';

const router = useRouter();
const route = useRoute(); // <--- Instância para ler os parâmetros da URL
const etapa = ref('form');
const nomeUsuario = ref('Usuário');
const emailUsuario = ref('');
const valorQrCode = ref('');

const form = reactive({
  celular: '', contato: '', telefoneEmergencia: '', alergias: '',
  tipoSanguineo: '', medicamentos: '', condicoesMedicas: ''
});

// --- SISTEMA DE TOAST (Notificações) ---
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

// Função auxiliar para gerar a URL do QR Code
const montarUrlQrCode = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
        nome: nomeUsuario.value,
        ...form
    }).toString();
    return `${baseUrl}/emergencia?${params}`;
};

onMounted(async () => {
  try {
    // 1. Recupera a sessão do IndexedDB (Assíncrono)
    const userObj = await getSessao();

    if (userObj) {
      emailUsuario.value = userObj.email;

      if(userObj.nome) nomeUsuario.value = userObj.nome;
      else if(userObj.email) nomeUsuario.value = userObj.email.split('@')[0];

      // 2. Busca se já existe cartão no Banco de Dados
      const dadosSalvos = await buscarCartao(userObj.email);

      if (dadosSalvos) {
        // Removemos o campo 'email' que vem do objeto do banco para não sujar o form
        const { ...dadosLimpos } = dadosSalvos;
        Object.assign(form, dadosLimpos);

        // --- LÓGICA DE EDIÇÃO ADICIONADA AQUI ---
        // Se a URL tiver ?editar=true, forçamos a etapa 'form'
        if (route.query.editar === 'true') {
            etapa.value = 'form';
        } else {
            // Caso contrário, mostra o cartão pronto
            valorQrCode.value = montarUrlQrCode();
            etapa.value = 'card';
        }
      }
    } else {
      // Se não tiver logado
      triggerToast("Sessão expirada. Faça login novamente.", 'error');
      setTimeout(() => router.push('/login'), 1500);
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    triggerToast("Erro ao acessar banco de dados.", 'error');
  }
});

const gerarCartao = async () => {
  if (!emailUsuario.value) {
    triggerToast("Erro: Usuário não identificado.", 'error');
    return;
  }

  if (!form.celular || !form.contato) {
      triggerToast("Preencha os campos obrigatórios (*)", 'error');
      return;
  }

  try {
    // 1. Salva os dados no IndexedDB
    await salvarCartao(emailUsuario.value, { ...form });

    // 2. Gera a URL
    valorQrCode.value = montarUrlQrCode();
    console.log("URL Gerada:", valorQrCode.value);

    // 3. Notifica e MUDA A TELA
    triggerToast("Cartão salvo com sucesso!", 'success');
    etapa.value = 'card';
  } catch (error) {
    console.error(error);
    triggerToast("Erro ao salvar o cartão.", 'error');
  }
};

const verPreviaPublica = () => {
    if (!valorQrCode.value) return;
    window.open(valorQrCode.value, '_blank');
};
</script>

<template>

  <div v-if="toast.show" class="toast toast-top toast-end z-50 mt-4 mr-2">
    <div :class="['alert shadow-lg text-white font-semibold', toast.type === 'success' ? 'alert-success' : 'alert-error']">
      <span v-if="toast.type === 'success'">✅</span>
      <span v-else>⚠️</span>
      <span>{{ toast.message }}</span>
    </div>
  </div>

  <!-- ETAPA 1: FORMULÁRIO -->
  <main v-if="etapa === 'form'" class="min-h-screen bg-[#EEEEEE] py-10 px-4 flex justify-center relative">

    <!-- BOTÃO VOLTAR (Etapa 1) -->
    <button @click="router.push('/')" class="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-black font-bold transition-colors z-20 cursor-pointer group">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 group-hover:-translate-x-1 transition-transform">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
      Voltar
    </button>

    <div class="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mt-8 md:mt-0"> <!-- Adicionado margin top para mobile não cobrir com botão -->
      <div class="text-center mt-6 px-6">
        <h1 class="text-3xl font-bold leading-tight">Seu Cartão de Emergência</h1>
        <p class="text-[15px] mt-4 text-gray-600">Preencha seus dados para gerar o QR Code</p>
      </div>

      <div class="p-6 pb-10">
        <h2 class="text-center font-bold text-[22px] mb-1">Informações Pessoais</h2>
        <form @submit.prevent="gerarCartao">
          <p class="mt-3 text-[17px] font-semibold">Telefone Pessoal *</p>
          <input v-model="form.celular" type="tel" required class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black" placeholder="(xx) 9xxx-xxxx">

          <p class="mt-3 text-[17px] font-semibold">Contato de Emergência *</p>
          <input v-model="form.contato" type="tel" required class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black" placeholder="(xx) 9xxx-xxxx">

          <p class="mt-3 text-[17px] font-semibold">Telefone Alternativo</p>
          <input v-model="form.telefoneEmergencia" type="tel" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black">

          <p class="mt-3 text-[17px] font-semibold">Alergias</p>
          <input v-model="form.alergias" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black">

          <p class="mt-3 text-[17px] font-semibold">Tipo Sanguíneo</p>
          <input v-model="form.tipoSanguineo" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black" placeholder="O+">

          <p class="mt-3 text-[17px] font-semibold">Medicamentos</p>
          <input v-model="form.medicamentos" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black">

          <p class="mt-3 text-[17px] font-semibold">Condições Médicas</p>
          <input v-model="form.condicoesMedicas" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black">

          <div class="mt-8 flex justify-center">
            <button type="submit" class="w-full bg-black text-[15px] font-bold text-white py-3 rounded-[7px] hover:bg-gray-800 transition-colors">Gerar Cartão</button>
          </div>
        </form>
      </div>
    </div>
  </main>

  <!-- ETAPA 2: CARD COM QR CODE -->
  <main v-else-if="etapa === 'card'" class="min-h-screen bg-[#EEEEEE] flex flex-col items-center justify-center px-4 relative">

    <!-- BOTÃO VOLTAR (Etapa 2) -->
    <button @click="router.push('/')" class="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-black font-bold transition-colors z-20 cursor-pointer group">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 group-hover:-translate-x-1 transition-transform">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
      Voltar
    </button>

    <h2 class="text-2xl font-bold mb-6 text-gray-800 mt-10 md:mt-0">Seu Cartão Digital</h2>

    <!-- Card Visual -->
    <div class="w-full max-w-sm bg-gradient-to-r from-gray-900 to-black text-white rounded-xl shadow-2xl p-6 relative overflow-hidden">
      <div class="flex justify-between items-start z-10 relative">
        <div>
          <h3 class="font-bold text-lg">Emergência</h3>
          <p class="text-sm text-gray-300 mt-1">{{ nomeUsuario }}</p>
        </div>

        <!-- QR CODE CLICÁVEL -->
        <div
            @click="verPreviaPublica"
            class="bg-white p-2 rounded cursor-pointer hover:scale-105 transition-transform shadow-lg group"
            title="Clique para testar a leitura do QR Code">

            <QrcodeVue :value="valorQrCode" :size="80" level="M" render-as="svg" />

            <span class="absolute -bottom-6 right-0 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">Clique para abrir</span>
        </div>
      </div>

      <div class="mt-6">
        <p class="text-xs text-gray-400 uppercase">Tipo Sanguíneo</p>
        <p class="font-bold text-2xl">{{ form.tipoSanguineo || '-' }}</p>
      </div>

      <div class="mt-4 pt-4 border-t border-gray-700">
         <p class="text-xs text-gray-400">Ao ler o QR Code acima, os socorristas verão seus dados médicos imediatamente.</p>
      </div>
    </div>

    <div class="mt-8 flex flex-col gap-3 w-full max-w-xs">
        <button @click="verPreviaPublica" class="bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 shadow-md transition-colors text-center cursor-pointer">
            ABRIR LINK DO QR CODE
        </button>

        <button @click="etapa = 'form'" class="hover:text-gray-700 cursor-pointer text-gray-500 underline text-sm text-center mt-2">
            Editar /
        </button>
    </div>
  </main>
</template>
