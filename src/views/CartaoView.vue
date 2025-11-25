<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import QrcodeVue from 'qrcode.vue';
import { getSessao, salvarCartao, buscarCartao, removerCartao } from '../services/db';

const router = useRouter();
const route = useRoute();
const etapa = ref('form');
const nomeUsuario = ref('Usuário');
const emailUsuario = ref('');
const valorQrCode = ref('');

// Todos os campos originais estão aqui
const form = reactive({
  celular: '',
  contato: '',
  telefoneEmergencia: '',
  alergias: '',
  tipoSanguineo: '',
  medicamentos: '',
  condicoesMedicas: ''
});

// --- SISTEMA DE TOAST ---
const toast = reactive({ show: false, message: '', type: 'success' });
const triggerToast = (msg, type = 'success') => {
  toast.message = msg; toast.type = type; toast.show = true;
  setTimeout(() => { toast.show = false; }, 3000);
};

// URL do QR Code
const montarUrlQrCode = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({ nome: nomeUsuario.value, ...form }).toString();
    return `${baseUrl}/emergencia?${params}`;
};

// --- CARREGAMENTO INICIAL ---
onMounted(async () => {
  try {
    const userObj = await getSessao();
    if (userObj) {
      emailUsuario.value = userObj.email;
      if(userObj.nome) nomeUsuario.value = userObj.nome;
      else if(userObj.email) nomeUsuario.value = userObj.email.split('@')[0];

      const dadosSalvos = await buscarCartao(userObj.email);
      if (dadosSalvos) {
        const { ...dadosLimpos } = dadosSalvos;
        Object.assign(form, dadosLimpos);

        // Verifica se é para editar ou mostrar o cartão
        if (route.query.editar === 'true') {
            etapa.value = 'form';
        } else {
            valorQrCode.value = montarUrlQrCode();
            etapa.value = 'card';
        }
      }
    } else {
      triggerToast("Sessão expirada. Faça login novamente.", 'error');
      setTimeout(() => router.push('/login'), 1500);
    }
  } catch (error) { console.error(error); }
});

// --- SALVAR ---
const gerarCartao = async () => {
  if (!emailUsuario.value) { triggerToast("Erro: Usuário não identificado.", 'error'); return; }
  if (!form.celular || !form.contato) { triggerToast("Preencha os campos obrigatórios (*)", 'error'); return; }

  try {
    await salvarCartao(emailUsuario.value, { ...form });
    valorQrCode.value = montarUrlQrCode();
    triggerToast("Cartão salvo com sucesso!", 'success');
    etapa.value = 'card';
  } catch (error) { triggerToast("Erro ao salvar.", 'error'); }
};

// --- EXCLUIR ---
const excluirCartao = async () => {
  if (!confirm("Tem certeza que deseja apagar seu cartão?")) return;
  try {
    await removerCartao(emailUsuario.value);
    Object.keys(form).forEach(key => form[key] = '');
    valorQrCode.value = '';
    triggerToast("Cartão removido com sucesso.", 'success');
    etapa.value = 'form';
  } catch (error) { triggerToast("Erro ao excluir cartão.", 'error'); }
};

// --- VISUALIZAR LINK ---
const verPreviaPublica = () => {
    if (!valorQrCode.value) return;
    window.open(valorQrCode.value, '_blank');
};

// --- BAIXAR IMAGEM ---
const baixarQrCode = () => {
  const svg = document.querySelector('#qr-capture svg');
  if (!svg) { triggerToast("Erro ao gerar imagem.", 'error'); return; }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const svgData = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  const size = 500;

  canvas.width = size;
  canvas.height = size;

  img.onload = () => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);

    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `QrSafe-${nomeUsuario.value}.png`;
    downloadLink.href = pngFile;
    downloadLink.click();
    triggerToast("Download iniciado!", 'success');
  };

  img.src = "data:image/svg+xml;base64," + btoa(svgData);
};
</script>

<template>
  <div v-if="toast.show" class="toast toast-top toast-end z-50 mt-4 mr-2">
    <div :class="['alert shadow-lg text-white font-semibold', toast.type === 'success' ? 'alert-success' : 'alert-error']">
      <span>{{ toast.type === 'success' ? '✅' : '⚠️' }}</span><span>{{ toast.message }}</span>
    </div>
  </div>

  <!-- ETAPA 1: FORMULÁRIO -->
  <main v-if="etapa === 'form'" class="min-h-screen bg-[#EEEEEE] py-10 px-4 flex justify-center relative">

    <!-- Botão Voltar -->
    <button @click="router.push('/dashboard')" class="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-black font-bold transition-colors z-20 cursor-pointer group">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 group-hover:-translate-x-1 transition-transform"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
      Voltar
    </button>

    <div class="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mt-8 md:mt-0">
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
            <button type="submit" class="w-full bg-black text-[15px] font-bold text-white py-3 rounded-[7px] hover:bg-gray-800 transition-colors cursor-pointer">Gerar Cartão</button>
          </div>
        </form>
      </div>
    </div>
  </main>

  <!-- ETAPA 2: CARD COM QR CODE -->
  <main v-else-if="etapa === 'card'" class="min-h-screen bg-[#EEEEEE] flex flex-col items-center justify-center px-4 relative">

    <!-- Botão Voltar -->
    <button @click="router.push('/dashboard')" class="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-black font-bold transition-colors z-20 cursor-pointer group">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 group-hover:-translate-x-1 transition-transform"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
      Voltar
    </button>

    <h2 class="text-2xl font-bold mb-6 text-gray-800 mt-10 md:mt-0">Seu Cartão Digital</h2>

    <div class="w-full max-w-sm bg-gradient-to-r from-gray-900 to-black text-white rounded-xl shadow-2xl p-6 relative overflow-hidden">
      <div class="flex justify-between items-start z-10 relative">
        <div><h3 class="font-bold text-lg">Emergência</h3><p class="text-sm text-gray-300 mt-1">{{ nomeUsuario }}</p></div>

        <!-- ID qr-capture adicionado para o download funcionar -->
        <div id="qr-capture" @click="verPreviaPublica" class="bg-white p-2 rounded cursor-pointer hover:scale-105 transition-transform shadow-lg group">
            <QrcodeVue :value="valorQrCode" :size="80" level="M" render-as="svg" />
            <span class="absolute -bottom-6 right-0 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">Abrir</span>
        </div>
      </div>
      <div class="mt-6"><p class="text-xs text-gray-400 uppercase">Tipo Sanguíneo</p><p class="font-bold text-2xl">{{ form.tipoSanguineo || '-' }}</p></div>
      <div class="mt-4 pt-4 border-t border-gray-700"><p class="text-xs text-gray-400">Ao ler o QR Code acima, os socorristas verão seus dados.</p></div>
    </div>

    <div class="mt-8 flex flex-col gap-3 w-full max-w-xs">

        <!-- BOTÃO DE DOWNLOAD -->
        <button @click="baixarQrCode" class="bg-black text-white py-3 rounded font-bold hover:bg-gray-800 shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3-3m0 0l-3 3m3-3v12" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v9" />
          </svg>
          BAIXAR IMAGEM DO QR
        </button>

        <button @click="verPreviaPublica" class="bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 shadow-md transition-colors cursor-pointer">ABRIR LINK DO QR CODE</button>

        <div class="flex flex-col items-center gap-2 mt-2">
          <button @click="etapa = 'form'" class="hover:text-black cursor-pointer text-gray-600 underline text-sm">Editar Informações</button>
          <button @click="excluirCartao" class="hover:text-red-700 cursor-pointer text-red-500 text-xs font-bold uppercase tracking-wide transition-colors">Excluir Cartão</button>
        </div>
    </div>
  </main>
</template>
