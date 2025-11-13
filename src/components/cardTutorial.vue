<script setup>
  defineProps(["numero", "infoTitle", "infoText"])
</script>
<template>
  <div class="flex -98.25 m-auto p-4.75  rounded-lg max-w-sm mb-4">
    <div class="p-2 bg-[#000] border h-[50%] text-[#fff] rounded-lg "><span class="p-[10px] font-black">{{ numero }}</span></div>
    <div class="pl-1 ">
      <h3 class="font-black">{{ infoTitle }}</h3>
      <p class="font-semibold text-[#464646]">{{ infoText }}</p>
    </div>
  </div>
</template>

