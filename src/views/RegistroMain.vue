<script setup>
import { reactive } from 'vue';

// Objeto reativo para guardar os dados do formulário
const form = reactive({
  celular: '',
  contato: '',
  telefoneEmergencia: '',
  alergias: '',
  tipoSanguineo: '',
  medicamentos: '',
  condicoesMedicas: ''
});

const gerarCartao = () => {
  // Aqui futuramente salvaremos no IndexedDB
  console.log("Dados do cartão:", form);
  alert("Cartão gerado com sucesso! (Dados no console)");
};
</script>

<template>
  <main class="min-h-screen bg-[#EEEEEE] py-10 px-4 flex justify-center">
    <div class="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

      <div class="text-center mt-6 px-6">
        <h1 class="text-3xl font-bold leading-tight">Seu Cartão de Emergência</h1>
        <p class="text-[15px] mt-4 text-gray-600">Preencha seus dados e seu QR Code será gerado automaticamente</p>
      </div>

      <div class="p-6 pb-10">
        <h2 class="text-center font-bold text-[22px] mb-1">Informações Pessoais</h2>
        <p class="text-center text-[15px] text-gray-500 mb-6">Preencha com seus dados de emergência</p>

        <form @submit.prevent="gerarCartao">
          <!-- Inputs organizados horizontalmente como pedido -->
          <p class="mt-3 text-[17px] font-semibold">Telefone Pessoal *</p>
          <input v-model="form.celular" type="tel" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black transition-colors" placeholder="Ex:(xx) 9xxx-xxxx">

          <p class="mt-3 text-[17px] font-semibold">Contato de Emergência *</p>
          <input v-model="form.contato" type="tel" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black transition-colors" placeholder="Ex:(xx) 9xxx-xxxx">

          <p class="mt-3 text-[17px] font-semibold">Telefone de Emergência</p>
          <input v-model="form.telefoneEmergencia" type="tel" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black transition-colors" placeholder="(xx) 3322-xxxx">

          <p class="mt-3 text-[17px] font-semibold">Alergias</p>
          <input v-model="form.alergias" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black transition-colors" placeholder="Ex: Penicilina, Látex...">

          <p class="mt-3 text-[17px] font-semibold">Tipo Sanguíneo</p>
          <input v-model="form.tipoSanguineo" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black transition-colors" placeholder="O+">

          <p class="mt-3 text-[17px] font-semibold">Medicamentos em uso</p>
          <input v-model="form.medicamentos" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black transition-colors" placeholder="Ex: Aspirina 100mg, Losartana...">

          <p class="mt-3 text-[17px] font-semibold">Condições Médicas Relevantes</p>
          <input v-model="form.condicoesMedicas" type="text" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black transition-colors" placeholder="Ex: Diabetes, Pressão Alta...">

          <div class="mt-8 flex justify-center">
            <button type="submit" class="w-full bg-black text-[15px] font-bold text-white py-3 rounded-[7px] hover:bg-gray-800 transition-colors">Gerar Cartão</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
