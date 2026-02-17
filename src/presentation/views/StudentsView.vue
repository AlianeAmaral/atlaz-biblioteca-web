<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { StudentService } from '@/infrastructure/services/StudentService';
import type { Student } from '@/domain/models/Student';

// 1. Instanciamos o serviço
const studentService = new StudentService();

// 2. Criamos o estado reativo
const students = ref<Student[]>([]);
const loading = ref(true);

// 3. Função para buscar os dados
const loadStudents = async () => {
  try {
    students.value = await studentService.getAllStudents();
  } catch (error) {
    console.error(error);
    alert("Erro ao carregar a lista de alunos.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadStudents();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Alunos</h1>
    
    <div v-if="loading">Carregando...</div>
    
    <table v-else class="min-w-full bg-white text-black">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-3 text-left"></th>
          <th class="p-3 text-left">Nome</th>
          <th class="p-3 text-left">Matrícula</th>
          <th class="p-3 text-left">E-mail</th>
          <th class="p-3 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id" class="border-b">
          <td class="p-3">{{ student.imageId }}</td>
          <td class="p-3">{{ student.name }}</td>
          <td class="p-3">{{ student.registration }}</td>
          <td class="p-3">{{ student.email }}</td>
          <td class="p-3 text-center">
            <router-link 
              :to="`/students/${student.id}`" 
              class="text-blue-600 hover:underline"
            >
              Ver Detalhes
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>