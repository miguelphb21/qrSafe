<template>
  <!-- Layout principal -->
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
  </head>
  <ComponentHeader/>
    <!-- <LoginMain/> -->
    <RouterView/>
  <ComponentFooter/>


</template>

<script setup>

  import ComponentFooter from "@/components/componentFooter.vue";
  import ComponentHeader from "@/components/componentHeader.vue";
  // import ComponentMain from "@/views/HomeMain.vue";
  // import ComponentRegistro from "@/views/CadastroMain.vue";
  import { onMounted } from "vue";
  import { RouterView } from 'vue-router';


  onMounted(() => {});
</script>

<style scoped>
  * {
    font-family: "Inter", sans-serif;
  }

</style>
