<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import QrcodeVue from 'qrcode.vue';

const router = useRouter();
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

onMounted(() => {
  const dadosUser = localStorage.getItem('dadosUsuario');

  if (dadosUser) {
    const userObj = JSON.parse(dadosUser);
    emailUsuario.value = userObj.email;

    if(userObj.nome) nomeUsuario.value = userObj.nome;
    else if(userObj.email) nomeUsuario.value = userObj.email.split('@')[0];

    // Recupera dados salvos
    const dadosSalvos = localStorage.getItem(`cartao_${userObj.email}`);

    if (dadosSalvos) {
      Object.assign(form, JSON.parse(dadosSalvos));
      valorQrCode.value = montarUrlQrCode();
      etapa.value = 'card';
    }
  } else {
    triggerToast("Você precisa estar logado.", 'error');
    setTimeout(() => router.push('/login'), 1500);
  }
});

const gerarCartao = () => {
  if (!emailUsuario.value) {
    triggerToast("Erro: Usuário não identificado. Faça login novamente.", 'error');
    return;
  }

  if (!form.celular || !form.contato) {
      triggerToast("Preencha os campos obrigatórios (*)", 'error');
      return;
  }

  localStorage.setItem(`cartao_${emailUsuario.value}`, JSON.stringify(form));
  valorQrCode.value = montarUrlQrCode();

  triggerToast("Cartão gerado e salvo com sucesso!", 'success');
  etapa.value = 'card';
};

const verPreviaPublica = () => {
    if (!valorQrCode.value) return;
    window.open(valorQrCode.value, '_blank');
};

// --- FUNÇÃO PARA VOLTAR AO INÍCIO ---
const irParaInicio = () => {
    router.push('/');
};
</script>

<template>
  <!-- TOAST GLOBAL -->
  <div v-if="toast.show" class="toast toast-top toast-end z-50 mt-4 mr-2">
    <div :class="['alert shadow-lg text-white font-semibold', toast.type === 'success' ? 'alert-success' : 'alert-error']">
      <span v-if="toast.type === 'success'">✅</span>
      <span v-else>⚠️</span>
      <span>{{ toast.message }}</span>
    </div>
  </div>

  <!-- ETAPA 1: FORMULÁRIO -->
  <main v-if="etapa === 'form'" class="min-h-screen bg-[#EEEEEE] py-10 px-4 flex justify-center relative">

    <!-- BOTÃO VOLTAR (No topo esquerdo) -->
    <div class="absolute top-4 left-4 z-20">
        <button @click="irParaInicio" class="bg-white px-3 py-2 rounded-full shadow text-gray-700 hover:text-black hover:bg-gray-50 transition-colors flex items-center gap-2 font-bold text-sm">
            <span>⬅ Início</span>
        </button>
    </div>

    <div class="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mt-8">

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

    <!-- BOTÃO VOLTAR (No topo esquerdo também aqui) -->
    <div class="absolute top-4 left-4 z-20">
        <button @click="irParaInicio" class="bg-white px-3 py-2 rounded-full shadow text-gray-700 hover:text-black hover:bg-gray-50 transition-colors flex items-center gap-2 font-bold text-sm">
            <span>⬅ Início</span>
        </button>
    </div>

    <h2 class="text-2xl font-bold mb-6 text-gray-800">Seu Cartão Digital</h2>

    <div class="w-full max-w-sm bg-gradient-to-r from-gray-900 to-black text-white rounded-xl shadow-2xl p-6 relative overflow-hidden">
      <div class="flex justify-between items-start z-10 relative">
        <div>
          <h3 class="font-bold text-lg">Emergência</h3>
          <p class="text-sm text-gray-300 mt-1">{{ nomeUsuario }}</p>
        </div>

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
        <button @click="verPreviaPublica" class="bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 shadow-md transition-colors text-center">
            ABRIR LINK DO QR CODE
        </button>

        <button @click="etapa = 'form'" class="text-gray-500 underline text-sm text-center mt-2">
            Voltar e editar dados
        </button>
    </div>
  </main>
</template>
