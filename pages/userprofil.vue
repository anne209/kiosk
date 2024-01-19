
<script setup>
import { globalStore } from '@/global.js';
const Personen_ID = globalStore.Personen_ID;
if (Personen_ID) {
  console.log('Received Personen_ID:', Personen_ID);
} else {
  console.log('Personen_ID not received.');
}

</script>
<template>
   



    hier kommt user profil zeugs hin 
</template>