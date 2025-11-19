<template>
  <div :class="['w-85 m-auto p-4.75 pb-10 rounded-lg shadow-xl mb-4 ', colorClass]">
    <div class="flex mb-8 items-center">
      <img class="w-9" :src="imagem" alt="">
      <h3 class="pl-3 font-black">{{ titulo }}</h3>
    </div>
    <div>
      <p class="justify-start font-semibold text-[#464646] text-[15px] px-2">{{ texto }}</p>
    </div>
    <slot></slot>
  </div>
</template>


<script setup>

  defineProps({
  imagem: String,
  titulo: String,
  texto: String,
  texto2: String,
  colorClass: {
    type: String,
    default: 'bg-#fff'
  }
})

</script>
