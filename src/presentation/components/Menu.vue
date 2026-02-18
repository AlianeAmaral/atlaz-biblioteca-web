<template>
  <aside class="w-64 bg-[#1a1d23] border-r border-gray-800 fixed h-full">
    
    <router-link to="/">
      <div class="p-6 flex items-center gap-3">

      <img src="/img_logo_global_transparent.png" class="w-12" alt="Logo - Mascote Atlaz" />

        <div class="text-white">
          <h1 class="font-bold text-sm pl-2">Atlaz</h1>
          <p class="text-xs font-normal text-gray-400 pl-2">Biblioteca</p>
        </div>

      </div>
    </router-link>

    <nav class="flex flex-col p-4 gap-2">
      <router-link to="/" class="nav-link">Página Inicial</router-link>
      <router-link to="/students" class="nav-link">Alunos</router-link>
      <router-link to="/books" class="nav-link">Livros</router-link>
      <router-link to="/loans" class="nav-link">Empréstimos</router-link>
    </nav>

  </aside>
</template>

<style scoped>

.nav-link {
  @apply p-3 rounded-lg text-gray-400 transition-all hover:bg-gray-800 hover:text-white;
}

.router-link-active {
  @apply bg-cyan-900 text-white font-semibold;
}

</style>