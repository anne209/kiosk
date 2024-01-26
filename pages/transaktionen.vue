<script setup lang="ts">
  
definePageMeta({layout: 'admin'});



const { data: transaktionen, pending, error } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query {swps_Transaktion {Abrechnungszeitpunkt Anzahl Transaktionszeitpunkt Transaktions_ID Personen { Name Personen_ID } Produkt { Name Preis} }}" },
})


import { ref, onMounted } from 'vue';
import * as XLSX from 'xlsx';

const personen = ref(null);

// Fetch data on component mount
onMounted(async () => {
  const { data, pending: personenPending } = await useFetch('http://localhost:8080/v1/graphql', {
    method: 'POST',
    body: JSON.stringify({ query: 'query { swps_Personen { Vorname Name }}' }),
  });

  personen.value = data;
  personenPending.value = pending;
});

// Export function
const exportToExcel = () => {
  if (personen.value && personen.value.swps_Personen) {
    const jsonData = personen.value.swps_Personen;
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'exported_data.xlsx');
  } else {
    console.error('Error: Data not available for export.');
  }
};












</script>




<template>

<p v-if="pending">Fetching...</p>
  <pre v-else-if="error">Could not load: {{ error.data }}</pre>
  <div v-else>
    <v-list>
    <v-list-item v-for="transaktion in transaktionen.data.swps_Transaktion" :key="transaktion.Transaktions_ID">
      <transaktion :transaktion="transaktion"> </transaktion>

    </v-list-item>
  </v-list>  
  </div>
</template>