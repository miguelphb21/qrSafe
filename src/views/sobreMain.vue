<script setup lang="ts">
import CardFatosImportantes from '@/components/cardFatosImportantes.vue';
import CardMain from '@/components/CardMain.vue';
import ChamadaParaInstalação from '@/components/chamadaParaInstalação.vue';
</script>

<template>
  <main>
    <div class=" text-center text-4xl mt-6 mr-6 ml-6 ">
      <h1 class="text-4x1 font-bold">Sobre o QrSafe </h1>
    </div>
    <p class="text-center text-[17px] m-6">Entenda a importância e o impacto de estar preparado para situações de emergência</p>
    <div class="text-start w-85 m-auto pt-5">
      <h2 class="text-[30px] font-black text-[#000]">O Problema</h2>
    </div>
    <CardMain texto="Todos os dias, acidentes acontecem. Em situações de emergência, cada segundo conta. Os primeiros socorristas e profissionais de saúde precisam de informações críticas imediatamente:">
      <ul class="pl-6.75 pt-2 list-disc justify-start font-medium text-[#464646] text-[15px] px-2">
        <li >Quem contatar em caso de emergência?</li>
        <li>O paciente tem alergias a medicamentos?</li>
        <li>Qual é o tipo sanguíneo?</li>
        <li>Existem condições médicas importantes que devemos saber?</li>
        <li>Qual é o dispositivo de contato para avisar a família?</li>
      </ul>
    </CardMain>
    <div class="text-start w-85 m-auto pt-10 pb-5">
      <h2 class="text-[30px] font-black text-[#000]">Nossa Solução</h2>
    </div>
    <CardMain texto="SafeDriver QR oferece uma forma simples, rápida e segura de disponibilizar suas informações críticas em qualquer situação de emergência. Com um único QR Code, todo o contexto médico e de contato fica acessível:" color-class="bg-[#E0E0E0]">
      <h3 class="pt-2 list-disc justify-start font-black text-[#000000] text-[15px] px-2">Para Motoristas</h3>
      <div class="pl-1.75">
        <p>✓ Proteção em caso de acidentes</p>
        <p>✓ Informações médicas acessíveis</p>
        <p>✓ Contato com família garantido</p>
        <p>✓ Paz de espírito ao dirigir</p>
      </div>
      <h3 class="pt-2 list-disc justify-start font-black text-[#000000] text-[15px] px-2">Para Socorristas</h3>
      <div class="pl-1.75">
        <p>✓ Informações críticas em segundos</p>
        <p>✓ Melhor atendimento emergencial</p>
        <p>✓ Identificação rápida do paciente</p>
        <p>✓ Contato com familiares facilitado</p>
      </div>
    </CardMain>
    <div class="text-start w-85 m-auto pt-10 pb-5">
      <h2 class="text-[30px] font-black text-[#000]">Por Que Isso Importa? </h2>
    </div>
    <CardMain>
      <h3 class="pt-2 list-disc justify-start font-black text-[#000000] text-[15px] px-2">Para Socorristas</h3>
      <div class="pl-1.75">
        <p>Informações médicas rápidas permitem que os profissionais de saúde tomem decisões melhores e mais rápidas, potencialmente salvando sua vida.</p>
      </div>
    </CardMain>
    <CardMain>
      <h3 class="pt-2 list-disc justify-start font-black text-[#000000] text-[15px] px-2">Reduz Tratamentos Inadequados</h3>
      <div class="pl-1.75">
        <p>Socorristas sabem sobre alergias, medicamentos atuais e condições pré-existentes, evitando complicações durante o atendimento de emergência.</p>
      </div>
    </CardMain>
    <CardMain>
      <h3 class="pt-2 list-disc justify-start font-black text-[#000000] text-[15px] px-2">Conecta Família Rapidamente</h3>
      <div class="pl-1.75">
        <p>Seus contatos de emergência são avisados imediatamente, garantindo suporte emocional e orientação durante momentos críticos.</p>
      </div>
    </CardMain>
    <CardMain>
      <h3 class="pt-2 list-disc justify-start font-black text-[#000000] text-[15px] px-2">Privacidade Mantida</h3>
      <div class="pl-1.75">
        <p>Você controla quando e como compartilha suas informações. Nenhum rastreamento ou coleta de dados desnecessários.</p>
      </div>
    </CardMain>
    <div class="text-start w-85 m-auto pt-10 pb-5">
      <h2 class="text-[30px] font-black text-[#000]">Fatos Importantes</h2>
    </div>
    <CardFatosImportantes  numero="37.8M"
      texto="Acidentes de trânsito por ano globalmente que poderiam ser melhor tratados com informações médicas acessíveis"
    />
    <CardFatosImportantes  numero="60%"
      texto="Dos erros médicos em emergências ocorrem por falta de informação do histórico do paciente"
    />
    <CardFatosImportantes  numero="4-6 min"
      texto="Tempo crítico em que informações médicas corretas fazem diferença no resultado de um acidente"
    />
    <CardFatosImportantes  numero="3x"
      texto="Mais chances de sobrevivência com acesso rápido a informações médicas críticas"
    />

    <ChamadaParaInstalação titulo="Não Deixe Para Depois" texto="Você nunca sabe quando uma emergência pode acontecer. Crie seu cartão de segurança hoje e proteja-se"/>
  </main>
</template>
