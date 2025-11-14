<script setup>
import ComponentHeader from './componentHeader.vue';
</script>
<template>
    <ComponentHeader></ComponentHeader>
    <div class=" bg-gray-50">
        <div class=" text-center text-4xl mt-6 mr-6 ml-6 ">
            <h1 class="text -4x1 font-bold">Seu Cartão de Emergencia </h1>
        </div>
        <p class="text-center text-[17px] m-6">Preencha seus dados e seu QR Code será gerado automaticamente</p>
        <div class=" bg-white mt-0 m-6 flex flex-wrap border border-gray-100 shadow-md rounded-md p-6.5 pt-2 pb-4">
            <H2 class="font-bold text-[25px] mt-0 pt-0"  >
                Informações Pessoais
            </H2>
            <P class="text-[17px]">
                Preencha com seus dados de emergência
            </P>
            <P class="mt-3 text-[17px] font-semibold">Nome Completo *</P>
            <input v-model="nome" type="text" class="border border-gray-300 p-1.5 rounded"  placeholder="Ex: João silva...">

            <P class=" mt-3 text-[17px] font-semibold">Telefone Pessoal *</P>
            <input v-model="celular" type="tel" class="border  border-gray-300 p-1.5 rounded"  placeholder="Ex:(xx) 9xxx-xxxx">

            <P class=" mt-3 text-[17px] font-semibold">Contato de Emergência *</P>
            <input v-model="contato" type="tel" class="border border-gray-300  p-1.5 rounded"  placeholder="Ex:(xx) 9xxx-xxxx">

            <P class=" mt-3 text-[17px] font-semibold">Telefone de Emergência </P>
            <input v-model="emergencia" type="tel" class="border border-gray-300  p-1.5 rounded"  placeholder="(xx) 3322-xxxx">

            <P class=" mt-3 text-[17px] font-semibold">Alergias </P>
            <input v-model="sangue" type="text" class="border border-gray-300  p-1.5 rounded"  placeholder="Ex: Penicilina, Látex...">

            <P class=" mt-3 text-[17px] font-semibold">Tipo Sanguíneo </P>
            <input v-model="sangue" type="text" class="border  border-gray-300 p-1.5 rounded"  placeholder="O+">

            <P class=" mt-3 text-[17px] font-semibold">Medicamentos em uso</P>
            <input v-model="medicamentos" type="text" class="border border-gray-300  p-1.5 rounded"  placeholder="Ex: Aspirina 100mg, Losartana...">

            <P class=" mt-3 text-[17px] font-semibold">Condições Médicas Relevantes</P>
            <input v-model="nome" type="text" class="border  border-gray-300 p-1.5 rounded"  placeholder="Ex: Diabetes, Pressão Alta...">

            <button click="Gerar Cartão" class=" bg-black text-[15px] font-bold text-white px-14 py-2 rounded ml-4 mt-6" >Gerar Cartão</button>
        </div>
    </div>
</template>
