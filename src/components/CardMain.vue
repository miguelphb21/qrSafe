<template>
  <div class="w-98.25 m-auto p-4.75 pb-10 rounded-lg shadow-lg max-w-sm mb-4">
    <div class="flex mb-3">
      <img :src="imagem" alt="">
      <h3 class="pl-1 font-black">Acesso Imediato</h3>
    </div>
    <div>
      <p class="justify-start font-semibold text-[#464646]">{{ texto }}</p>
    </div>
  </div>
</template>


<script setup>
  defineProps(["imagem", "texto"])
</script>
