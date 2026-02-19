<script setup lang="ts">
import { computed } from 'vue';
import mascotSuccess from '@/presentation/assets/images/img_mascot_success.png';
import mascotError from '@/presentation/assets/images/img_mascot_error.png';

const props = defineProps<{
  show: boolean;
  isError: boolean;
  title: string;
  message: string;
}>();

const emit = defineEmits(['close']);

// centralização da lógica visual do modal, ao invés de usar e repetir estruturas ternárias
const modalStyle = computed(() => ({
  borderColor: props.isError ? 'border-red-500' : 'border-lime-600',
  titleColor: props.isError ? 'text-red-600' : 'text-lime-900',
  buttonColor: props.isError
    ? 'bg-red-500 hover:bg-red-600'
    : 'bg-lime-900 hover:bg-lime-800',
  buttonText: props.isError ? 'Tentar Novamente' : 'Continuar',
  image: props.isError ? mascotError : mascotSuccess
}));

</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div
      class="bg-[#080808] p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full border-t-8"
      :class="modalStyle.borderColor"
    >
      <img
        :src="modalStyle.image"
        class="w-40 h-40 mb-4 object-contain"
        alt="Mascote"
      />

      <h2
        class="text-2xl font-black mb-2 text-center"
        :class="modalStyle.titleColor"
      >
        {{ title }}
      </h2>

      <p class="text-gray-600 text-center mb-6 font-medium">
        {{ message }}
      </p>

      <button
        @click="emit('close')"
        class="w-full text-white font-bold py-3 px-4 rounded-xl transition-transform active:scale-95 shadow-lg"
        :class="modalStyle.buttonColor"
      >
        {{ modalStyle.buttonText }}
      </button>
    </div>
  </div>
</template>
