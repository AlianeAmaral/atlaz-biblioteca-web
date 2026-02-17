<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { StudentService } from '@/infrastructure/services/StudentService';
import type { Student } from '@/domain/models/Student';

// instanciação do serviço
const studentService = new StudentService();

const students = ref<Student[]>([]);
const loading = ref(true);

// método de busca dos dados
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
  <div>
    <h1 class="text-2xl font-bold p-7 bg-cyan-900">Alunos</h1>
  </div>

    <div class="flex justify-start pl-6 pt-6">
      <router-link 
        to="/students/create" 
        class="flex items-center bg-lime-700 hover:bg-lime-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
      >
        <span class="text-xl"></span>
        Cadastrar Novo Aluno
      </router-link>
    </div>

  <div class="p-6">
      <div v-if="loading">Carregando...</div>

      <table v-else class="min-w-full bg-white text-black rounded-2xl">
        <thead>
          <tr class="bg-cyan-900 text-white">
          <th class="p-3 text-left"></th>
          <th class="p-3 text-left">Nome</th>
          <th class="p-3 text-left">Matrícula</th>
          <th class="p-3 text-left">E-mail</th>
          <th class="p-3 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id" class="border-t">
          
          <td class="p-4">
            <div class="w-12 h-12 ml-10 overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
              <img 
                v-if="student.imageId"
              :src="`http://localhost:8081/images/${student.imageId}/view`"
                alt="Foto Aluno"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-gray-400 text-xs text-center flex justify-center items-center">Sem foto</span>
            </div>
          </td>
          
          <td class="p-3">{{ student.name }}</td>
          <td class="p-3">{{ student.registration }}</td>
          <td class="p-3">{{ student.email }}</td>
          <td class="p-3 text-center">
            <router-link 
              :to="`/students/${student.id}`" 
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