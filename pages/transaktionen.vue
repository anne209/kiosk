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


// Excelfunction 
const excelfunction = async () => {
    if (error.value) {
        console.error('Error fetching data:', error.value);
        return;
    }

    if (pending.value) {
        console.log('Data is pending...');
        return;
    }

    // dataToExport wird mit den daten aus der query definiert
    const dataToExport = transaktionen.value.data.swps_Transaktion;

    if (!Array.isArray(dataToExport) || dataToExport.length === 0) {
        console.error('No data available to export');
        return;
    }

  console.log(transaktionen.value)

  const wb = XLSX.utils.book_new(); 

  // Daten für Export vorbereiten 
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

  XLSX.utils.book_append_sheet(wb, ws, 'Transaktionen');

  // Excel Workbook erstellen und tabelle einfügen 
  const binaryString = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const data = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        data[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Trigger den Daten download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Transaktionen.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


</script>

<!-- die transaktion sollten vielleicht irgendwie richtig sortiert werden -->
<template>

<v-btn
@click="excelfunction"
>Daten auf Excel exportieren</v-btn>

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