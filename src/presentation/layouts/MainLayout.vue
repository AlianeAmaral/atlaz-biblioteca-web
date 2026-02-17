<script setup lang="ts">
import Menu from '../components/Menu.vue';
</script>

<template>
  <div class="flex min-h-screen bg-black">
    <Menu />

    <main class="flex-1 ml-64 min-h-screen text-white">
      <slot />
    </main>
  </div>
</template>