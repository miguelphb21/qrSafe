<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <footer class="bg-[#000]">
    <div class="text-[#fff] m-auto w-85 pb-10 rounded-lg shadow-lg max-w-sm">
      <router-link to="/">
        <button class="navbar-start cursor-pointer text-[50px] font-extrabold pb-2">QrSafe <img class="ml-2" width="30" height="30" src="../assets/images/qrLogo.png" alt="">
        </button>
      </router-link>
      <h6 class="pb-1">Redes Sociais</h6>
      <hr>
      <div class="flex items-center pb-2">
        <a class="pr-2" href="#"><img src="../assets/images/instagram.svg" alt=""></a>
        <a class="pr-2" href="#"><img src="../assets/images/facebook.svg" alt=""></a>
        <a class="pr-2" href="#"><img src="../assets/images/whatsapp.svg" alt=""></a>
      </div>
      <h6 class="pb-1">Navegação</h6>
      <hr>
      <div>
        <nav>
          <ul>
            <li>Home</li>
            <RouterLink to="/sobre"><li>Sobre</li></RouterLink>
            <RouterLink to="/cadastro"><li>Cadastre-se</li></RouterLink>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>
