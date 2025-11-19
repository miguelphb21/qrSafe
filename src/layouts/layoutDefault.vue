<template>
  <!-- Layout principal -->
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
  </head>
  <ComponentHeader/>
  <RouterView/>
  <ComponentFooter/>


</template>

<script setup>
// import { RouterView } from "vue-router";
// import menuLateral from "@/components/menuLateral.vue";
// import logo from "@/components/logo.vue";
// import navBar from "@/components/navBar.vue";
import ComponentHeader from "@/components/componentHeader.vue";
import ComponentFooter from "@/components/componentFooter.vue";
import { onMounted } from "vue";



  onMounted(() => {});
</script>

<style scoped>
  * {
    font-family: "Inter", sans-serif;
  }

</style>
