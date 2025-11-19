<template>
  <header>
    <div class="navbar bg-[#000] text-neutral-content">
      <div class="navbar-start ml-6 cursor-pointer text-[20px] font-extrabold" to="/cadastro">
        <RouterLink to="/">
          <button class="navbar-start ml-6 cursor-pointer text-[20px] font-extrabold">QrSafe <img class="ml-2" width="30" height="30" src="../assets/images/qrLogo.png" alt="">
        </button>
        </RouterLink>
      </div>
      <div class="md:hidden navbar-end sm:drawer drawer-end mr-6">
        <input id="my-drawer-5" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <!-- Page content here -->
          <label for="my-drawer-5" class="border-none bg-[#000] drawer-button btn btn-primary">
            <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
        </div>
        <div class="drawer-side">
          <label for="my-drawer-5" aria-label="close sidebar" class="drawer-overlay"></label>
          <ul class="menu bg-base-200 text-[#000] min-h-full w-80 p-4">
            <!-- Sidebar content here -->
            <label for="my-drawer-5" aria-label="close sidebar" class="drawer-overlay"><li>fechar</li></label>

            <RouterLink to="/cadastro"><li><a>Cadastro</a></li></RouterLink>
            <RouterLink to="/sobre"><li><a>Sobre</a></li></RouterLink>

          </ul>
        </div>
      </div>
      <div class="navbar-end hidden md:flex">
        <ul class="menu menu-horizontal px-1">
          <RouterLink to="/cadastro"><li><a>Cadastro</a></li></RouterLink>
          <RouterLink to="/sobre"><li><a>Sobre</a></li></RouterLink>

        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>

</script>


