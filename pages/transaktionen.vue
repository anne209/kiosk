<script setup lang="ts">
  
definePageMeta({layout: 'admin'}); 
import * as XLSX from 'xlsx';

// Hier werden die Transaktionen  gefetchted
const { data: transaktionen, pending, error } = await useFetch (`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: JSON.stringify({
    query: `
      query {
        swps_Transaktion {
          Abrechnungszeitpunkt
          Anzahl
          Transaktionszeitpunkt
          Transaktions_ID
          Personen { Name Personen_ID }
          Produkt { Name Preis }
        }
      }`
  }),
}); 


const excelfunction = async () => {
  
  if (error.value) {
    console.error('Error fetching data:', error.value);
    return;
  }

  if (pending.value) {
    console.log('Data is pending...');
    return;
  }
////Fehler bei 38
  // Accessing the transactions data
  const dataToExport = transaktionen?.data?.value?.swps_Transaktion;  // fehler ist hier, einfach ausprobieren was funktioniert
  if (!Array.isArray(dataToExport) || dataToExport.length === 0) {
    console.error('No data available to export');
    return;
  }
  console.log(transaktionen.value)

  // Prepare data for Excel export
  const ws = XLSX.utils.json_to_sheet(dataToExport.map(tx => ({
    'Transaktions-ID': tx.Transaktions_ID,
    'Abrechnungszeitpunkt': tx.Abrechnungszeitpunkt,
    'Transaktionszeitpunkt': tx.Transaktionszeitpunkt,
    'Anzahl': tx.Anzahl,
    'Personen Name': tx.Personen?.Name,
    'Personen ID': tx.Personen?.Personen_ID,
    'Produkt Name': tx.Produkt?.Name,
    'Preis': tx.Produkt?.Preis
  })));

  // Create a workbook and append the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Transaktionen');

  // Generate Excel file
  const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }); // was hattest du vorhin hier gehabt???

// was meinst du vorhin? ich habe geschaut, da war schon immer dieses blob, so wie es da steht

  // Trigger file download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Transaktionen.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


</script>


<template>


Daten auf Excel exportieren
<v-btn
@click="excelfunction"
></v-btn>

<p v-if="pending">Fetching...</p>
  <pre v-else-if="error">Could not load: {{ error.data }}</pre>
  <div v-else>
    <v-list>
    <v-list-item v-for="transaktion in transaktionen.data.swps_Transaktion" :key="transaktion.Transaktions_ID">
      <transaktionadmin :transaktion="transaktion"> </transaktionadmin>

    </v-list-item>
  </v-list>  
  </div>
</template>