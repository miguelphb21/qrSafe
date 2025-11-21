<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Objeto que receberá os dados vindos da URL (do QR Code)
const dados = reactive({
  nome: 'Desconhecido',
  celular: '',
  contato: '',
  telefoneEmergencia: '',
  alergias: 'Nenhuma',
  tipoSanguineo: '',
  medicamentos: 'Nenhum',
  condicoesMedicas: 'Nenhuma'
});

onMounted(() => {
  // Pega os dados da URL (Query Params)
  const q = route.query;

  if (q.nome) dados.nome = q.nome;
  if (q.celular) dados.celular = q.celular;
  if (q.contato) dados.contato = q.contato;
  if (q.telefoneEmergencia) dados.telefoneEmergencia = q.telefoneEmergencia;
  if (q.alergias) dados.alergias = q.alergias;
  if (q.tipoSanguineo) dados.tipoSanguineo = q.tipoSanguineo;
  if (q.medicamentos) dados.medicamentos = q.medicamentos;
  if (q.condicoesMedicas) dados.condicoesMedicas = q.condicoesMedicas;
});

// Função para copiar texto
const copiar = (texto) => {
  if(texto) {
    navigator.clipboard.writeText(texto);
    alert("Copiado: " + texto);
  }
};

const compartilhar = () => {
    if (navigator.share) {
        navigator.share({
            title: `Emergência: ${dados.nome}`,
            url: window.location.href
        });
    } else {
        copiar(window.location.href);
        alert("Link copiado para a área de transferência");
    }
};
</script>

<template>
    <main class="items-center px-4 bg-[#EEEEEE] min-h-screen pb-10">
        <img src="../assets/images/pessoa.svg" alt="Avatar" class="mx-auto mt-7 w-24 h-24">
        <div class="text-center">
            <h1 class="font-semibold text-xl mt-2">{{ dados.nome }}</h1>
        </div>

        <div class="w-full max-w-md mx-auto p-7 mt-6 mb-25 bg-white border border-gray-200 rounded-lg shadow-lg">

            <!-- BLOCO MÉDICO -->
            <div>
                <h2 class="text-center font-bold mb-7 mt-5">Informações médicas</h2>

                <div class="bg-red-100 border border-red-100 rounded-lg shadow-lg p-4">

                    <p class="font-semibold text-red-700 mx-auto mt-2 ml-2">Tipo Sanguíneo</p>
                    <p class="ml-2 text-[#FF7171] font-bold text-lg">{{ dados.tipoSanguineo || '---' }}</p>

                    <p class="font-semibold text-red-700 mt-4 ml-2">Alergias</p>
                    <p class="ml-2 text-[#FF7171]">{{ dados.alergias }}</p>

                    <p class="font-semibold text-red-700 mt-4 ml-2">Condição</p>
                    <p class="ml-2 text-[#FF7171]">{{ dados.condicoesMedicas }}</p>

                    <p class="font-semibold text-red-700 mt-4 ml-2">Medicamentos</p>
                    <p class="ml-2 mb-2 text-[#FF7171]">{{ dados.medicamentos }}</p>

                </div>
            </div>

            <h3 class="text-center font-bold mb-10 mt-8">Identificação pessoal</h3>

            <!-- BLOCO CONTATOS -->
            <div class="border shadow-lg bg-[#DDDDDD] border-gray-300 rounded-lg mb-15 p-4">

                <!-- Telefone Pessoal -->
                <div class="mb-4">
                    <p class="font-semibold text-[#000000] mx-auto ml-2">Telefone Pessoal</p>
                    <div class="flex justify-between items-center mt-1">
                        <span class="ml-2 pr-4 text-[#636363]">{{ dados.celular || 'Não informado' }}</span>
                        <button @click="copiar(dados.celular)" class="text-[#5582FF] text-sm font-bold hover:underline">
                            Copiar
                        </button>
                    </div>
                </div>

                <hr class="border-gray-400 my-3 opacity-30">

                <!-- Contato de Emergência -->
                <div>
                    <p class="font-semibold text-[#000000] mt-2 ml-2">Contato de Emergência</p>
                    <!-- Exibindo apenas o número principal para simplificar, ou ambos se preferir -->
                    <p class="ml-2 mb-0 text-[#636363] font-medium">Responsável</p>
                    <div class="flex justify-between items-center mt-1 ml-2 mb-2">
                        <span class="pr-4 text-[#636363]">{{ dados.contato || '---' }}</span>
                        <button @click="copiar(dados.contato)" class="text-[#5582FF] text-sm font-bold hover:underline">
                            Copiar
                        </button>
                    </div>

                    <!-- Segundo contato se existir -->
                    <div v-if="dados.telefoneEmergencia">
                        <p class="ml-2 mb-0 text-[#636363] text-sm mt-2">Alternativo</p>
                        <div class="flex justify-between items-center mt-1 ml-2">
                            <span class="pr-4 text-[#636363]">{{ dados.telefoneEmergencia }}</span>
                            <button @click="copiar(dados.telefoneEmergencia)" class="text-[#5582FF] text-sm font-bold hover:underline">
                                Copiar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-5 flex justify-center">
                <button @click="compartilhar" class="w-full bg-black text-[15px] font-bold text-white py-2 rounded-[7px] hover:bg-gray-800 transition">
                    Compartilhar Cartão
                </button>
            </div>
        </div>
    </main>
</template>
