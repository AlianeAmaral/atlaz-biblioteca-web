<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { LoanService } from '@/infrastructure/services/LoanService';
import type { Loan } from '@/domain/models/Loan';

// instanciação do serviço
const loanService = new LoanService();

const loans = ref<Loan[]>([]);
const loading = ref(true);

// método de busca dos dados
const loadLoans = async () => {
  try {
    loans.value = await loanService.getAllLoans();
  } catch (error) {
    console.error(error);
    alert("Erro ao carregar histórico de empréstimos.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadLoans();
});

</script>

<template>
  <div>
    <h1 class="text-2xl font-bold p-7 bg-cyan-900">Histórico de Empréstimos</h1>
  </div>

    <div class="flex justify-start pl-6 pt-6">
      <router-link 
        to="/loans/create" 
        class="flex items-center bg-lime-700 hover:bg-lime-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
      >
        <span class="text-xl"></span>
        Cadastrar Novo Empréstimo
      </router-link>
    </div>

  <div class="p-6">
      <div v-if="loading">Carregando...</div>

      <table v-else class="min-w-full bg-white text-black rounded-2xl">
        <thead>
          <tr class="bg-cyan-900 text-white">
          <th class="p-3 text-left">ID</th>
          <th class="p-3 text-left">Matrícula</th>
          <th class="p-3 text-left">Código do Livro</th>
          <th class="p-3 text-left">Data de Início</th>
          <th class="p-3 text-left">Data de Fim</th>
          <th class="p-3 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in loans" :key="loan.id" class="border-t">
          <td class="p-3">{{ loan.id }}</td>
          <td class="p-3">{{ loan.registration }}</td>
          <td class="p-3">{{ loan.bookCode }}</td>
          <td class="p-3">{{ loan.startDate }}</td>
          <td class="p-3">{{ loan.endDate }}</td>
          <td class="p-3">{{ loan.loanStatus }}</td>
          <td class="p-3 text-center">
            <router-link 
              :to="`/loans/${loan.id}`" 
              class="text-cyan-600 hover:underline"
            >
              Ver Detalhes
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>