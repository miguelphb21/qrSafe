<script setup>
import { reactive } from "vue"

  const form = reactive({
    nome: "",
    celular: "",
    contato: "",
    telefoneEmergencia: "",
    alergias: "",
    tipoSanguineo: "",
    medicamentos: "",
    condicoesMedicas: ""
  })

  const gerarCartao = () => {
    // Validações simples
    if (!form.nome.trim()) {
      alert("Oxente! Preencha o Nome Completo antes de continuar.");
      return;
    }

    if (!form.celular.trim()) {
      alert("Vixe! O Telefone Pessoal é obrigatório, viu?");
      return;
    }

    if (!form.contato.trim()) {
      alert("Ei cabra! O Contato de Emergência precisa ser preenchido.");
      return;
    }

    // Se passou nas validações:
    console.log("Dados salvos:", form)
    alert("Cartão gerado com sucesso!")
  }
</script>

<template>
  <main class="bg-[]">
    <div class="border">
      <div class=" text-center text-4xl mt-6 mr-6 ml-6 ">
        <h1 class="text-4x1 font-bold">Seu Cartão de Emergencia </h1>
      </div>
      <p class="text-center text-[17px] m-6">Preencha seus dados e seu QR Code será gerado automaticamente</p>
      <div class="w-85 m-auto p-8 border-black pb-10 rounded-lg shadow-lg ">
        <h2 class="text-center font-bold text-[25px]">
          Informações Pessoais
        </h2>
        <p class="text-center text-[17px]">
          Preencha com seus dados de emergência
        </p>

        <!-- Nome -->
        <p class="mt-3 text-[17px] font-semibold">Nome Completo *</p>
        <input v-model="form.nome" type="text" class="w-[274px] border border-gray-300 p-1.5 rounded"
          placeholder="Ex: João silva...">

        <!-- Celular -->
        <p class=" mt-3 text-[17px] font-semibold">Telefone Pessoal *</p>
        <input v-model="form.celular" type="tel" class="w-[274px] border  border-gray-300 p-1.5 rounded"
          placeholder="Ex:(xx) 9xxx-xxxx">

        <!-- Contato -->
        <p class=" mt-3 text-[17px] font-semibold">Contato de Emergência *</p>
        <input v-model="form.contato" type="tel" class="w-[274px] border border-gray-300  p-1.5 rounded"
          placeholder="Ex:(xx) 9xxx-xxxx">

        <!-- Telefone emergência -->
        <p class=" mt-3 text-[17px] font-semibold">Telefone de Emergência </p>
        <input v-model="form.telefoneEmergencia" type="tel" class="w-[274px] border border-gray-300  p-1.5 rounded"
          placeholder="(xx) 3322-xxxx">

        <!-- Alergias -->
        <p class=" mt-3 text-[17px] font-semibold">Alergias </p>
        <input v-model="form.alergias" type="text" class="w-[274px] border border-gray-300  p-1.5 rounded"
          placeholder="Ex: Penicilina, Látex...">

        <!-- Tipo sanguíneo -->
        <p class=" mt-3 text-[17px] font-semibold">Tipo Sanguíneo </p>
        <input v-model="form.tipoSanguineo" type="text" class="w-[274px] border  border-gray-300 p-1.5 rounded" placeholder="O+">

        <!-- Medicamentos -->
        <p class=" mt-3 text-[17px] font-semibold">Medicamentos em uso</p>
        <input v-model="form.medicamentos" type="text" class="w-[274px] border border-gray-300  p-1.5 rounded"
          placeholder="Ex: Aspirina 100mg, Losartana...">

        <!-- Condições médicas -->
        <p class=" mt-3 text-[17px] font-semibold">Condições Médicas Relevantes</p>
        <input v-model="form.condicoesMedicas" type="text" class="w-[274px] border  border-gray-300 p-1.5 rounded"
          placeholder="Ex: Diabetes, Pressão Alta...">

        <!-- Botão -->
        <div class="p-5 flex justify-center">
          <button @click="gerarCartao"
            class="w-[374px] bg-black text-[15px] font-bold text-white py-2 rounded-[7px]">
            Gerar Cartão
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
