<template>
  <div class="w-85 m-auto p-4.75 pb-10 rounded-lg shadow-lg max-w-sm mb-4">
    <div class="flex mb-8 items-center">
      <img class="w-9" :src="imagem" alt="">
      <h3 class="pl-3 font-black">{{ titulo }}</h3>
    </div>
    <div>
      <p class="justify-start font-semibold text-[#464646]">{{ texto }}</p>
    </div>
  </div>
</template>


<script setup>
  defineProps(["imagem", "titulo", "texto"])
</script>
