<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();
const dados = ref({});

onMounted(() => {
  // Pega os dados que estão na URL (colocados lá pelo QR Code)
  dados.value = route.query;
});
</script>

<template>
  <main class="min-h-screen  p-4 font-sans text-white">
    <div class="max-w-md mx-auto bg-white text-black rounded-xl shadow-2xl overflow-hidden">

      <!-- Cabeçalho de Emergência -->
      <div class="bg-black   p-6 text-center text-white">
        <h1 class="text-3xl font-black uppercase tracking-wider">Emergência</h1>
        <p class="text-sm opacity-90 mt-1">Dados Médicos Críticos</p>
      </div>

      <div class="p-6 space-y-6">
        <!-- Nome -->
        <div class="border-b pb-4">
          <p class="text-xs text-gray-500 uppercase font-bold">Nome do Paciente</p>
          <p class="text-2xl font-bold">{{ dados.nome || 'Não informado' }}</p>
        </div>

        <!-- Tipo Sanguíneo e Alergias -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 uppercase font-bold">Tipo Sanguíneo</p>
            <p class="text-xl font-black text-red-600">{{ dados.tipoSanguineo || '-' }}</p>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 uppercase font-bold">Alergias</p>
            <p class="font-bold text-red-600">{{ dados.alergias || 'Nenhuma' }}</p>
          </div>
        </div>

        <!-- Contatos -->
        <div class="space-y-3">
          <div class="bg-green-50 border border-green-200 p-4 rounded-lg">
             <p class="text-xs text-green-700 uppercase font-bold mb-1">Contato de Emergência</p>
             <a :href="'tel:' + dados.contato" class="text-xl font-black text-green-800 block hover:underline">
               {{ dados.contato }}
             </a>
          </div>

          <div v-if="dados.telefoneEmergencia" class="p-2">
             <p class="text-xs text-gray-500 uppercase font-bold">Contato Alternativo</p>
             <a :href="'tel:' + dados.telefoneEmergencia" class="font-bold text-gray-800">
               {{ dados.telefoneEmergencia }}
             </a>
          </div>
        </div>

        <!-- Dados Médicos -->
        <div v-if="dados.condicoesMedicas || dados.medicamentos" class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 class="font-bold text-yellow-800 mb-2">Histórico Médico</h3>
          <p v-if="dados.condicoesMedicas" class="text-sm mb-2"><span class="font-bold">Condições:</span> {{ dados.condicoesMedicas }}</p>
          <p v-if="dados.medicamentos" class="text-sm"><span class="font-bold">Medicamentos:</span> {{ dados.medicamentos }}</p>
        </div>
      </div>

      <div class="bg-gray-100 p-4 text-center text-xs text-gray-500">
        Dados fornecidos via QrSafe.
      </div>
    </div>
  </main>
</template>
