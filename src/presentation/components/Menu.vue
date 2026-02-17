
<template>
  <aside>

    <div>
      <div>
        <img src="/img_logo_global_transparent.png" class="w-40" alt="Atlaz Logo"/>
      </div>

      <nav>
        <router-link to="/" class="nav-link">
          Página Inicial
        </router-link>

        <router-link to="/students" class="nav-link">
          Alunos
        </router-link>

        <router-link to="/books" class="nav-link">
          Livros
        </router-link>

        <router-link to="/loans" class="nav-link">
          Empréstimos
        </router-link>

        <router-link to="/reports" class="nav-link">
          Relatórios
        </router-link>
      </nav>
    </div>

  </aside>
</template>
