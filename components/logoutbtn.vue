
<!-- Button um sich abzumelden als component auf unterschiedlichen layouts -->
<template>
  <v-btn @click="logout">Abmelden
    <v-icon>mdi-exit-to-app</v-icon>
  </v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useGlobalState } from '@/composables/useGlobalState';

const { resetPersonen } = useGlobalState(); // damit werden die temporär gespeicherten Daten resettet
const router = useRouter();

function logout() {
  // Reset Personen_ID wieder auf  null
  resetPersonen();

  // Wieder zur Login page  
  router.push({ path: '/start' });
}
</script>
