<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { StudentService } from '@/infrastructure/services/StudentService';
import mascotSuccess from '@/presentation/assets/images/img_mascot_success.png';
import mascotError from '@/presentation/assets/images/img_mascot_error.png';

const router = useRouter();
const loading = ref(false);
const studentService = new StudentService();

// formulário para criação, modelo antigo sem o Omit (só para exemplificar)
const form = ref({
  name: '',
  registration: '',
  email: '',
  imageId: '',
  enrollmentProofId: ''
});

// controle do modal de resposta à criação de aluno
const modal = ref({
  show: false,
  isError: false,
  title: '',
  message: ''
});

// função para converter para Base64 (é necessário para o ImageRequest que está no Java)
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// gerencia o upload quando é selecionado um arquivo
const handleUpload = async (event: Event, field: 'imageId' | 'enrollmentProofId') => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    try {
      const base64 = await convertToBase64(file);
      // chama o StudentService.uploadFile para executar o upload
      const uploadedId = await studentService.uploadFile(file.name, base64);
      
      // salva o ID retornado do arquivo no campo correto do formulário
      form.value[field] = uploadedId;
    } catch (error) {
        console.error(error);
        alert("Erro ao subir o arquivo");
    }
  }
};

// disparo do modal
const triggerModal = (isError: boolean, title: string, message: string) => {
  modal.value = { show: true, isError, title, message };
};

// salva o aluno e finaliza a operação
const saveStudent = async () => {
  loading.value = true;
  try {
    await studentService.createStudent(form.value);
    // retorno com modal de sucesso
    triggerModal(false, 'Cadastro Realizado!', 'O aluno foi salvo com sucesso.');
  } catch (error) {
    console.error(error);
    // retorno com modal de erro
    triggerModal(true, 'Ops, algo deu errado!', 'Não foi possível salvar. Verifique as informações e tente novamente.');
  } finally {
    loading.value = false;
  }
};

const handleCloseModal = () => {
  const wasError = modal.value.isError;
  modal.value.show = false;
  
  // condição que se for sucesso, redireciona para lista de alunos, se for erro, permanece na mesma página
  if (!wasError) {
    router.push('/students');
  }
};

</script>

<template>
  <h1 class="text-2xl font-bold p-6 bg-lime-900 text-white">Cadastrar Novo Aluno</h1>

  <div class="p-8 max-w-2xl text-black">
    <form @submit.prevent="saveStudent" class="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">
      
      <div class="flex flex-col">
        <label class="font-bold mb-1">Nome Completo</label>
        <input v-model="form.name" 
          type="text" 
          required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Matrícula</label>
        <input v-model="form.registration"
          type="text"
          required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">E-mail</label>
        <input v-model="form.email"
          type="email"
          required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Foto do Aluno</label>

        <input type="file"
          @change="handleUpload($event, 'imageId')"
          accept="image/*"
          class="p-2 border border-dashed rounded-lg bg-gray-50"
        />

        <span v-if="form.imageId"
          class="text-xs text-green-600 mt-1">
          ✓ Foto carregada (ID: {{ form.imageId }})
        </span>

      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Comprovante de Matrícula (PDF)</label>

        <input type="file"
          @change="handleUpload($event, 'enrollmentProofId')"
          accept=".pdf"
          class="p-2 border border-dashed rounded-lg bg-gray-50"
        />

        <span v-if="form.enrollmentProofId"
          class="text-xs text-green-600 mt-1">
          ✓ Comprovante carregado (ID: {{ form.enrollmentProofId }})
        </span>

      </div>

      <div class="flex gap-4">

        <button type="submit"
          :disabled="loading" 
          class="flex-1 bg-lime-900 hover:bg-lime-700 text-white font-bold py-3 rounded-lg transition-colors">
          {{ loading ? 'Salvando...' : 'Finalizar Cadastro' }}
        </button>

        <button type="button"
          @click="router.push('/students')"
          class="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100">
          Cancelar
        </button>

      </div>
    </form>
  </div>

  <div v-if="modal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-[#080808] p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full border-t-8" 
         :class="modal.isError ? 'border-red-500' : 'border-lime-600'">
      
      <img :src="modal.isError ? mascotError : mascotSuccess" 
        class="w-40 h-40 mb-4 object-contain"
        alt="Mascote"
      />
      
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
        :class="modal.isError ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-900 hover:bg-lime-800'">
        {{ modal.isError ? 'Tentar Novamente' : 'Continuar' }}
      </button>

    </div>
  </div>
</template>