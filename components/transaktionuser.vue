<!-- hier ist auch ein Fehler-->

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  transaktion: Object,
});

// Diagnostic log
console.log('transaktion prop:', props.transaktion);
</script>

<template>
  <v-card>
    <div v-if="transaktion && transaktion.Transaktions">
      Bestellung: {{ transaktion.Transaktions }}
    </div>
    <div v-else>
      Keine Informationen zur Transaktion verfügbar.
    </div>
  </v-card>
</template>
  
<style scoped>
</style>