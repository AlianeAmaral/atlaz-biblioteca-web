<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { LoanService } from '@/infrastructure/services/LoanService';
import type { Loan } from '@/domain/models/Loan';
import mascotSuccess from '@/presentation/assets/images/img_mascot_success.png';
import mascotError from '@/presentation/assets/images/img_mascot_error.png';

const router = useRouter();
const loading = ref(false);
const loanService = new LoanService();

// autopreenchimento das datas
const today = new Date();
const nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);

// opções de status de empréstimo
const statusOptions = [
  { label: 'Disponível', value: 'DISPONIVEL' },
  { label: 'Emprestado', value: 'EMPRESTADO' },
  { label: 'Devolvido (Dentro do Prazo)', value: 'FINALIZADO_DENTRO_DO_PRAZO' },
  { label: 'Devolvido (Fora do Prazo)', value: 'FINALIZADO_FORA_DO_PRAZO' },
  { label: 'Devolução Atrasada', value: 'ATRASADO' },
  { label: 'Perdido', value: 'PERDIDO' },
];

// formulário para criação, modelo novo condicionado ao ID
const form = ref<Omit<Loan, 'id'>>({
  registration: '',
  bookCode: 0,
  // coleta data de hoje no formato YYYY-MM-DD
  startDate: today.toISOString().split('T')[0] ?? '', // data de hoje
  endDate: nextWeek.toISOString().split('T')[0] ?? '', // data daqui 7 dias
  loanStatus: 'EMPRESTADO' as any
});

// controle do modal de resposta à criação de empréstimo
const modal = ref({
  show: false,
  isError: false,
  title: '',
  message: ''
});

// disparo do modal
const triggerModal = (isError: boolean, title: string, message: string) => {
  modal.value = { show: true, isError, title, message };
};

// salva o empréstimo e finaliza a operação
const saveLoan = async () => {
  loading.value = true;
  try {
    await loanService.createLoan(form.value);
    // retorno com modal de sucesso
    triggerModal(false, 'Empréstimo Realizado!', 'O empréstimo foi salvo com sucesso.');
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
  
  // condição que se for sucesso, redireciona para lista de empréstimos, se for erro, permanece na mesma página
  if (!wasError) {
    router.push('/loans');
  }
};

</script>

<template>
  <h1 class="text-2xl font-bold p-7 bg-teal-700 text-white">Cadastrar Novo Empréstimo</h1>

  <div class="p-8 max-w-2xl text-black">
    <form @submit.prevent="saveLoan" class="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">
      
      <div class="flex flex-col">
        <label class="font-bold mb-1">Matrícula</label>
        <input v-model="form.registration" 
          type="text" 
          required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Código do Livro</label>
        <input v-model="form.bookCode"
          type="text"
          required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Data de Início</label>
        <input v-model="form.startDate"
          type="date"
          required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Data de Devolução</label>
        <input v-model="form.endDate" 
          type="date"
          required class="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-lime-700"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1">Status</label>

          <select v-model="form.loanStatus" 
            required class="p-2 border rounded-lg outline-none bg-white focus:ring-2 focus:ring-cyan-700 cursor-pointer">  

            <option value="" disabled>Status</option>

            <option v-for="option in statusOptions" 
              :key="option.value" 
              :value="option.value">
              {{ option.label }}
            </option>  

          </select>
      </div>

      <div class="flex gap-4">

        <button type="submit" 
          :disabled="loading"
          class="flex-1 bg-lime-900 hover:bg-lime-700 text-white font-bold py-3 rounded-lg transition-colors">
          {{ loading ? 'Salvando...' : 'Criar Empréstimo' }}
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
        alt="Resposta - Mascote Atlaz"
      />
      
      <h2 class="text-2xl font-black mb-2 text-center" 
        :class="modal.isError ? 'text-red-600' : 'text-lime-900'">
        {{ modal.title }}
      </h2>
      
      <p class="text-gray-600 text-center mb-6 font-medium">
        {{ modal.message }}
      </p>
      
      <button @click="handleCloseModal"
        class="w-full text-white font-bold py-3 px-4 rounded-xl transition-transform active:scale-95 shadow-lg"
        :class="modal.isError ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-900 hover:bg-lime-800'">
        {{ modal.isError ? 'Tentar Novamente' : 'Continuar' }}
      </button>
      
    </div>
  </div>
  
</template>