<template>
  <main class="bg-[#ffffff] min-h-screen flex flex-col font-sans">

    <div class="relative overflow-hidden bg-neutral-950 text-white pb-16 pt-10 shadow-2xl shadow-black/50 border-b border-[#333]">

      <!-- Efeito de luz de fundo (opcional, mas melhora o visual dark) -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div class="relative z-10 flex flex-col items-center justify-center px-4">
        <h1 class="text-center p-2 font-black text-4xl md:text-6xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          QrSafe
        </h1>

        <p class="text-center mx-auto mt-4 max-w-lg text-lg md:text-xl font-light text-gray-300 leading-relaxed">
          Sua segurança em primeiro lugar. Crie um cartão de emergência com
          <span class="text-white font-semibold">QR Code</span> para situações de risco.
        </p>

        <div class="flex justify-center pt-8 pb-4">
          <RouterLink to="/cadastro">
            <!-- Botão com efeito Hover e Active para melhor UX -->
            <button class="group relative bg-white text-black px-8 py-4 rounded-full font-black text-lg cursor-pointer transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95">
              Criar Meu Qr Agora
              <!-- Pequena seta que se move no hover -->
              <span class="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- CONTEÚDO PRINCIPAL -->
    <div class="flex-1 max-w-6xl mx-auto w-full px-6 py-12 space-y-16">

      <!-- FEATURES SECTION -->
      <section>
        <h2 class="text-center mb-10 font-extrabold text-3xl md:text-4xl text-white tracking-tight">
          Por Que Usar o QrSafe?
        </h2>

        <!-- Grid adaptativo: Mobile 1 col, Desktop 3 cols -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="transform transition-all duration-300 hover:-translate-y-2">
            <CardMain
              :imagem="sos"
              titulo="Acesso Imediato"
              texto="Primeiros socorristas podem escanear seu QR Code e acessar informações críticas em segundos."
            />
          </div>
          <div class="transform transition-all duration-300 hover:-translate-y-2">
            <CardMain
              :imagem="data"
              titulo="Dados Completos"
              texto="Informações médicas, alergias e contatos de emergência. Tudo em um único lugar."
            />
          </div>
          <div class="transform transition-all duration-300 hover:-translate-y-2">
            <CardMain
              :imagem="padlock"
              titulo="Privado e Seguro"
              texto="Seus dados ficam sob seu controle. Compartilhe apenas quando for realmente necessário."
            />
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS SECTION -->
      <section class="relative">
        <h2 class="text-center mb-12 font-extrabold text-3xl md:text-4xl text-white tracking-tight">
          Como Funciona?
        </h2>

        <!-- Linha conectora visual para desktop (opcional) -->
        <div class="space-y-6 relative">
          <div class="absolute left-[28px] top-0 bottom-0 w-0.5 bg-[#333] md:hidden"></div> <!-- Linha vertical mobile -->

          <!-- Passando classes via props ou container para espaçamento -->
          <div class="relative z-10">
            <CardTutorial numero="1" infoTitle="Preencha seus dados" infoText="Insira informações pessoais, médicas e de contato de emergência."/>
          </div>
          <div class="relative z-10">
            <CardTutorial numero="2" infoTitle="Gere seu QR Code" infoText="Um código único é gerado automaticamente com todos os seus dados."/>
          </div>
          <div class="relative z-10">
            <CardTutorial numero="3" infoTitle="Imprima ou compartilhe" infoText="Tenha o código na sua carteira, tela de bloqueio ou adesivo."/>
          </div>
          <div class="relative z-10">
            <CardTutorial numero="4" infoTitle="Proteja-se em emergências" infoText="Em situações de risco, qualquer pessoa pode escanear e obter ajuda."/>
          </div>
        </div>
      </section>

    </div>

    <!-- CALL TO ACTION FINAL -->
    <div class="mt-auto">
      <ChamadaParaInstalação texto="Sua segurança não espera. Crie seu cartão de emergência em menos de 2 minutos."/>
    </div>

  </main>
</template>

<script setup>
  import CardMain from '../components/CardMain.vue';
  import CardTutorial from '../components/cardTutorial.vue';
  import ChamadaParaInstalação from '../components/chamadaParacriacao.vue';

  import sos from '../assets/images/sos_image.svg'
  import padlock from '../assets/images/padlock_image.svg'
  import data from '../assets/images/data_image.svg'
</script>

<!-- Estilos globais rápidos para garantir contraste nos componentes filhos caso não tenham classes específicas -->
<style scoped>

</style>
