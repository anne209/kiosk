<template>
  <v-btn @click="logout">Abmelden
    <v-icon>mdi-exit-to-app</v-icon>
  </v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useGlobalState } from '@/composables/useGlobalState';

const { resetPersonen_ID } = useGlobalState();
const router = useRouter();

function logout() {
  // Reset Personen_ID wieder auf  null
  resetPersonen_ID();

  // Wieder zur Login page  
  router.push({ path: '/start' });
}
</script>
