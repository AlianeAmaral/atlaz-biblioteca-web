<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { BookService } from '@/infrastructure/services/BookService';
import type { Book } from '@/domain/models/Book';

// instanciação do serviço
const bookService = new BookService();

const books = ref<Book[]>([]);
const loading = ref(true);

// método de busca dos dados
const loadBooks = async () => {
  try {
    books.value = await bookService.getAllBooks();
  } catch (error) {
    console.error(error);
    alert("Erro ao carregar a lista de livros");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadBooks();
});

</script>

<template>
  <div>
    <h1 class="text-2xl font-bold p-7 bg-cyan-900 text-white">Livros</h1>
  </div>

  <div class="flex justify-start pl-6 pt-6">
    <router-link 
      to="/books/create" 
      class="flex items-center bg-lime-700 hover:bg-lime-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
    >
      Cadastrar Novo Livro
    </router-link>
  </div>

  <div class="p-6"> <div v-if="loading" class="text-center font-bold text-white">Carregando...</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      
      <div 
        v-for="book in books" 
        :key="book.id" 
        class="bg-black rounded-2xl shadow-md hover:shadow-xl transition-shadow p-5 flex flex-col items-center h-full border border-gray-800"
      >
        
        <div class="w-44 h-60 mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
          <img 
            v-if="book.imageId"
            :src="`http://localhost:8081/images/${book.imageId}/view`"
            alt="Capa Livro"
            class="w-full h-full object-cover" 
          />
          <span v-else class="text-gray-400 text-sm font-medium">Sem Foto</span>
        </div>

        <span class="text-xs text-gray-400 my-1 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
            Cód: {{ book.bookCode }}
          </span>

        <div class="flex flex-col items-center text-center w-full flex-1 w-44">
          <h3 class="text-1xl font-bold text-white w-full line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
            {{ book.title }}
          </h3>

          <h3 class="text-sm text-emerald-400 w-full line-clamp-2 pb-5 flex items-center justify-center">
            {{ book.author }}
          </h3>

          <router-link 
            :to="`/books/${book.id}`" 
            class="w-full py-2 bg-cyan-900 text-white rounded-lg font-bold hover:bg-cyan-700 transition-colors text-center mt-auto"
          >
            Ver Detalhes
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>