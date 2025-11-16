<script setup>

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
        <p class="mt-3 text-[17px] font-semibold">Nome Completo *</p>
        <input v-model="nome" type="text" class="w-[274px] border border-gray-300 p-1.5 rounded"
          placeholder="Ex: João silva...">

        <p class=" mt-3 text-[17px] font-semibold">Telefone Pessoal *</p>
        <input v-model="celular" type="tel" class="w-[274px] border  border-gray-300 p-1.5 rounded"
          placeholder="Ex:(xx) 9xxx-xxxx">

        <p class=" mt-3 text-[17px] font-semibold">Contato de Emergência *</p>
        <input v-model="contato" type="tel" class="w-[274px] border border-gray-300  p-1.5 rounded"
          placeholder="Ex:(xx) 9xxx-xxxx">

        <p class=" mt-3 text-[17px] font-semibold">Telefone de Emergência </p>
        <input v-model="emergencia" type="tel" class="w-[274px] border border-gray-300  p-1.5 rounded"
          placeholder="(xx) 3322-xxxx">

        <p class=" mt-3 text-[17px] font-semibold">Alergias </p>
        <input v-model="sangue" type="text" class="w-[274px] border border-gray-300  p-1.5 rounded"
          placeholder="Ex: Penicilina, Látex...">

        <p class=" mt-3 text-[17px] font-semibold">Tipo Sanguíneo </p>
        <input v-model="sangue" type="text" class="w-[274px] border  border-gray-300 p-1.5 rounded" placeholder="O+">

        <p class=" mt-3 text-[17px] font-semibold">Medicamentos em uso</p>
        <input v-model="medicamentos" type="text" class="w-[274px] border border-gray-300  p-1.5 rounded"
          placeholder="Ex: Aspirina 100mg, Losartana...">

        <p class=" mt-3 text-[17px] font-semibold">Condições Médicas Relevantes</p>
        <input v-model="nome" type="text" class="w-[274px] border  border-gray-300 p-1.5 rounded"
          placeholder="Ex: Diabetes, Pressão Alta...">
        <div class="p-5 flex justify-center">
          <button click="Gerar Cartão"
            class="w-[374px] bg-black text-[15px] font-bold text-white py-2 rounded-[7px]">Gerar Cartão</button>
        </div>
      </div>
    </div>
  </main>
</template>
