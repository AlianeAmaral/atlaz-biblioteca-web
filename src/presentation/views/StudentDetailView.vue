<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { StudentService } from '@/infrastructure/services/StudentService';
import type { Student } from '@/domain/models/Student';

const route = useRoute();
const router = useRouter();
const studentService = new StudentService();

const student = ref<Student | null>(null);
const loading = ref(true);

// coleta ID da rota
const studentId = Number(route.params.id);

// carrega os dados do aluno por ID
const loadStudent = async () => {
  try {
    student.value = await studentService.getStudentById(studentId);
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar detalhes do aluno.');
    router.push('/students');
  } finally {
    loading.value = false;
  }
};

onMounted(loadStudent);
</script>

<template>
  <h1 class="text-2xl font-bold p-6 bg-cyan-900 text-white">Detalhes do Aluno</h1>

  <div class="p-8 max-w-2xl text-black">
    <div v-if="loading">Carregando...</div>

    <div
      v-else-if="student"
      class="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6"
    >
      <div class="flex flex-col items-center gap-2">
        <div class="w-32 h-32 overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center rounded-xl">
          <img
            v-if="student.imageId"
            :src="`http://localhost:8081/images/${student.imageId}/view`"
            alt="Foto do aluno"
            class="w-full h-full object-cover"
          />
          <span v-else class="text-gray-400 text-sm">Sem foto</span>
        </div>
      </div>

      <div>
        <span class="text-sm text-gray-500">Nome</span>
        <p class="font-bold text-lg">{{ student.name }}</p>
      </div>

      <div>
        <span class="text-sm text-gray-500">Matrícula</span>
        <p class="font-bold">{{ student.registration }}</p>
      </div>

      <div>
        <span class="text-sm text-gray-500">E-mail</span>
        <p class="font-bold">{{ student.email }}</p>
      </div>

      <div>
        <span class="text-sm text-gray-500">Comprovante de Matrícula</span>
        <div v-if="student.enrollmentProofId" class="mt-2">
          <a
            :href="`http://localhost:8081/images/${student.enrollmentProofId}/download`"
            target="_blank"
            class="text-cyan-600 hover:underline"
          >
            Download do Comprovante
          </a>
        </div>
        <p v-else class="text-gray-400">Não enviado</p>
      </div>

      <div class="flex gap-4 pt-4">
        <button
          @click="router.push(`/students/${student.id}/edit`)"
          class="flex-1 bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Editar
        </button>

        <button
          @click="router.push('/students')"
          class="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
        >
          Voltar
        </button>
      </div>
    </div>
  </div>
</template>
