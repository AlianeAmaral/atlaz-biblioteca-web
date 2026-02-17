<script setup lang="ts">
  import Menu from './presentation/components/Menu.vue'
</script>

<template>
  <div class="flex min-h-screen bg-slate-50">
    <Menu />
    <main class="flex-1 p-8 ml-64">
      <router-view/>
    </main>
  </div>
</template>
