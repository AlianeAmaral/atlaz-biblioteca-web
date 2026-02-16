<script setup lang="ts">

  fetch('http://localhost:8081/books')
    .then(resposta => resposta.json())
    .then(livros => {
      console.log("Livros enviados pelo back-end: ", livros);
    })
    .catch(erro => {
      console.error("Erro ao buscar livros do back-end: ", erro);
    });
</script>

<template>
  <div>
    <h1>Biblioteca Atlaz</h1>
  </div>
</template>

<style scoped>
  h1 {
    color: #42b883;
  }
</style>
