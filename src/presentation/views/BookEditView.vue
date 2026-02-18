<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { BookService } from '@/infrastructure/services/BookService';
import type { Book } from '@/domain/models/Book';

import mascotSuccess from '@/presentation/assets/images/img_mascot_success.png';
import mascotError from '@/presentation/assets/images/img_mascot_error.png';

const route = useRoute();
const router = useRouter();
const bookService = new BookService();

const bookId = Number(route.params.id);
const loading = ref(true);
const saving = ref(false);

// controle do modal
const modal = ref({
  show: false,
  isError: false,
  title: '',
  message: ''
});

// formulário reativo
const form = ref<Omit<Book, 'id'>>({
  bookCode: 0,
  title: '',
  author: '',
  genre: '',  
  imageId: '',
  bookStatus: '' as any // evita erros caso status esteja vazio
});

// já carrega os dados atuais do livro para editar o formulário
const loadBook = async () => {
  try {
    const data = await bookService.getBookById(bookId);
    form.value = {
      bookCode: data.bookCode,
      title: data.title,
      author: data.author,
      genre: data.genre,
      imageId: data.imageId,
      bookStatus: data.bookStatus
    };
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar dados do livro');
    router.push('/books');
  } finally {
    loading.value = false;
  }
};

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const handleUpload = async (event: Event, field: 'imageId') => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    try {
      const base64 = await convertToBase64(file);
      const uploadedId = await bookService.uploadFile(file.name, base64);
      form.value[field] = uploadedId;
    } catch (error: any) {
      triggerModal(true, 'Erro no upload', error.response?.data?.message || 'Falha ao subir arquivo');
    }
  }
};

const triggerModal = (isError: boolean, title: string, message: string) => {
  modal.value = { show: true, isError, title, message };
};

const updateBook = async () => {
  saving.value = true;
  try {
    // traz o updateBook do BookService
    await bookService.updateBook(bookId, form.value);
    triggerModal(false, 'Cadastro Atualizado!', 'Os dados foram atualizados com sucesso.');
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Não foi possível atualizar com esses dados.';
    triggerModal(true, 'Erro na Atualização!', msg);
  } finally {
    saving.value = false;
  }
};

const handleCloseModal = () => {
  const wasError = modal.value.isError;
  modal.value.show = false;

  // possibilita retornar para o mesmo aluno em caso de erro
  if (!wasError) router.push(`/books/${bookId}`); 
};

onMounted(loadBook);
</script>

<template>
  <h1 class="text-2xl font-bold p-6 bg-cyan-900 text-white">Editar Livro</h1>

  <div class="p-8 max-w-2xl text-black">
    <div v-if="loading">Carregando...</div>

    <form @submit.prevent="updateBook" class="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">
      
      <div class="flex flex-col">
        <label class="font-bold mb-1">Código do Livro</label>
        <input v-model="form.bookCode" type="text" required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700" />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Título</label>
        <input v-model="form.title" type="text" required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700" />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Autor</label>
        <input v-model="form.author" type="text" required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700" />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Gênero</label>
        <input v-model="form.genre" type="text" required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700" />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Capa do Livro</label>
        <input type="file" @change="handleUpload($event, 'imageId')" accept="image/*" class="p-2 border border-dashed rounded-lg bg-gray-50" />
        <span v-if="form.imageId" class="text-xs text-green-600 mt-1">✓ Foto carregada (ID: {{ form.imageId }})</span>
      </div>

      <div class="flex gap-4">
        <button type="submit" :disabled="loading" class="flex-1 bg-lime-900 hover:bg-lime-700 text-white font-bold py-3 rounded-lg transition-colors">
          {{ loading ? 'Salvando...' : 'Atualizar Cadastro' }}
        </button>
        <button type="button" @click="router.push('/books')" class="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100">
          Cancelar
        </button>
      </div>
    </form>
  </div>

  <div v-if="modal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-[#080808] p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full border-t-8" 
         :class="modal.isError ? 'border-red-500' : 'border-lime-600'">
      
      <img :src="modal.isError ? mascotError : mascotSuccess" class="w-40 h-40 mb-4 object-contain" alt="Mascote Atlaz"/>
      
      <h2 class="text-2xl font-black mb-2 text-center" 
          :class="modal.isError ? 'text-red-600' : 'text-lime-900'">
        {{ modal.title }}
      </h2>
      
      <p class="text-gray-600 text-center mb-6 font-medium">
        {{ modal.message }}
      </p>
      
      <button 
        @click="handleCloseModal"
        class="w-full text-white font-bold py-3 px-4 rounded-xl transition-transform active:scale-95 shadow-lg"
        :class="modal.isError ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-900 hover:bg-lime-800'"
      >
        {{ modal.isError ? 'Tentar Novamente' : 'Continuar' }}
      </button>
    </div>
  </div>
</template>