<template>
  <div
    class="m-auto w-85 max-w-[420px] p-6 rounded-2xl shadow-xl text-white mb-5"         :class="backgroundClass">
    <h2 class="text-3xl font-extrabold mb-4">{{ numero }}</h2>

    <p class="text-[15px] leading-snug font-medium">
      {{ texto }}
    </p>
  </div>

</template>

<script setup>
defineProps({
  numero: String,
  texto: String,
  backgroundClass: {
    type: String,
    default:
      "bg-gradient-to-br from-[#000000] via-[#0d0d0d] to-[#1a1a1a]"
  }
})
</script>
