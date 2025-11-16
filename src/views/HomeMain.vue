<template>
  <main>
    <div class="text-[#fff] bg-gradient-to-b from-black to-[#212121] justify-center">
      <h1 class="text-center p-4 font-bold text-[30px]">QrSafe</h1>
      <p class="text-center mx-5 text-[20px] font-ligth">Sua segurança em primeiro lugar. Crie um cartão de emergência
        com QR Code para situações de risco</p>
      <div class="flex justify-center py-5">
        <RouterLink to="/cadastro"><button class="bg-[#fff] text-[#000] p-3 border rounded-lg font-black cursor-pointer">Criar Meu Qr Agora</button></RouterLink>

      </div>
    </div>
    <h2 class="text-center p-4 font-extrabold text-[30px]">Por Que Usar o QrSafe?</h2>
    <div class="grid grid-cols-1 gap-4">
        <CardMain :imagem="sos" titulo="Acesso Imediato" texto="Primeiro responders podem escanear seu QR Code e acessar informações críticas em segundos"/>
        <CardMain :imagem="data" titulo="Dados Completos" texto="Informações médicas, alergias, contatos de emergência - tudo em um único QR Code"/>
        <CardMain :imagem="padlock" titulo="Privado e seguro" texto="Seus dados ficam sob seu controle. Compartilhe apenas quando necessário"/>
    </div>
    <h2 class="text-center p-4 font-extrabold text-[30px]">Como Funciona?</h2>
    <div>
      <CardTutorial numero="1" infoTitle="Preencha seus dados" infoText="Insira informações pessoais, médicas e de contato de emergência"/>
      <CardTutorial numero="2" infoTitle="Gere seu QR Code" infoText="Um código único é gerado automaticamente com todos os seus dados"/>
      <CardTutorial numero="3" infoTitle="Imprima ou compartilhe" infoText="Um código único é gerado automaticamente com todos os seus dados"/>
      <CardTutorial numero="4" infoTitle="Proteja-se em emergências" infoText="Em situações de risco, qualquer pessoa pode escanear e obter suas informações críticas"/>
    </div>
    <ChamadaParaInstalação/>
  </main>
</template>

<script setup>
  import CardMain from '../components/CardMain.vue';
  import sos from '../assets/images/sos_image.svg'
  import padlock from '../assets/images/padlock_image.svg'
  import data from '../assets/images/data_image.svg'
import CardTutorial from '../components/cardTutorial.vue';
import ChamadaParaInstalação from '../components/chamadaParaInstalação.vue';

</script>
