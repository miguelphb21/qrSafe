<template>
  <main class="min-h-screen items-center px-4 bg-[#EEEEEE]">

    <div class="w-full max-w-[420px] mx-auto text-center mt-6">
      <h1 class="text-3xl sm:text-4xl font-bold leading-tight">
        Seu Cartão de Emergência
      </h1>
      <p class="text-[15px] mt-4">
        Preencha com suas informações de login
      </p>
    </div>
    <div class="w-full max-w-md mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <p class="mt-3 text-[17px] font-semibold">Nome Completo *</p>
        <input type="text" class="w-full border border-gray-300 p-1.5 rounded"placeholder="Ex: João silva...">
        <p class="mt-3 text-[17px] font-semibold">E-mail *</p>
        <input type="text" class="w-full border border-gray-300 p-1.5 rounded" placeholder="Ex: João silva...">
        <p class="mt-3 text-[17px] font-semibold">Senha *</p>
        <input type="text" class="w-full border border-gray-300 p-1.5 rounded" placeholder="Ex: João silva...">

        <div class="p-5 flex justify-center">
            <button
            class="w-full bg-black text-[15px] font-bold text-white py-2 rounded-[7px]">
            Prosseguir
            </button>
        </div>
    </div>
  </main>
</template>
