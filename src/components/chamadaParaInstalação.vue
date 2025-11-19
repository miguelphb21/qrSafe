<template>
  <div class=" bg-gradient-to-r from-[#000000] via-[#111111] to-[#000000] p-4">
    <h3 class="text-center text-[#fff] text-[30px] my-3 font-extrabold">{{ titulo }}</h3>
    <div class="w-80 text-center m-auto">
      <p class="text-center text-[#fff] text-[18px]">{{ texto }}</p>
    </div>
    <div class="flex justify-center py-5">
      <RouterLink to="/cadastro">
        <button class="bg-[#fff] text-[#000] p-3 border rounded-lg font-black cursor-pointer">Criar Cartão</button>
      </RouterLink>
    </div>
  </div>
</template>

<!-- Sua segurança não espera. Crie seu cartão de emergência em menos de 2 minutos -->
<script setup>
  defineProps(["texto" , "titulo"])
</script>
