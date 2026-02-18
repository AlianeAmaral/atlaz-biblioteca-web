<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { BookService } from '@/infrastructure/services/BookService';
import type { Book } from '@/domain/models/Book';

const route = useRoute();
const router = useRouter();
const bookService = new BookService();

const book = ref<Book | null>(null);
const loading = ref(true);

// coleta ID da rota
const bookId = Number(route.params.id);

// carrega os dados do livro por ID
const loadBook = async () => {
  try {
    book.value = await bookService.getBookById(bookId);
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar detalhes do livro.');
    router.push('/books');
  } finally {
    loading.value = false;
  }
};

onMounted(loadBook);
</script>

<template>
  <h1 class="text-2xl font-bold p-6 bg-cyan-900 text-white">Detalhes do Livro</h1>

  <div class="p-8 max-w-2xl text-black">
    <div v-if="loading">Carregando...</div>

    <div
      v-else-if="book"
      class="bg-white py-8 px-8 rounded-2xl shadow-lg flex flex-col gap-3"
    >
      <div class="flex flex-col items-center gap-2">
        <div class="w-44 h-60 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
          <img
            v-if="book.imageId"
            :src="`http://localhost:8081/images/${book.imageId}/view`"
            alt="Capa do Livro"
            class="w-full h-full object-cover"
          />
          <span v-else class="text-gray-400 text-sm">Sem Foto</span>
        </div>
      </div>

      <div class="flex justify-center items-center">
      <div>
        <span class="text-sm text-gray-500">Código do Livro</span>
        <p class="text-xs text-white my-2 bg-cyan-900 px-3 py-1 rounded-full border border-gray-700 w-24 flex justify-center">{{ book.bookCode }}</p>
      </div>
      </div>

      <div>
        <span class="text-sm text-gray-500">Título</span>
        <p class="font-bold">{{ book.title }}</p>
      </div>

      <div>
        <span class="text-sm text-gray-500">Autor</span>
        <p class="font-bold">{{ book.author }}</p>
      </div>

      <div>
        <span class="text-sm text-gray-500">Genre</span>
        <p class="font-bold">{{ book.genre }}</p>
      </div>

      <div>
        <span class="text-sm text-gray-500">Status do Livro</span>
        <p class="font-bold">{{ book.bookStatus }}</p>
      </div>

      <div class="flex gap-4 pt-2">
        <button
          @click="router.push(`/books/${book.id}/edit`)"
          class="flex-1 bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Editar
        </button>

        <button
          @click="router.push('/books')"
          class="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
        >
          Voltar
        </button>
      </div>
    </div>
  </div>
</template>
