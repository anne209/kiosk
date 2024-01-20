<!-- irgendwas ist hier falsch -->
<!-- bei reload wird glaub kommt 500 error-->

<script setup>
import { globalStore } from '@/global.js';
const Personen_ID = globalStore.Personen_ID;
if (Personen_ID) {
  console.log('Received Personen_ID:', Personen_ID);
} else {
  console.log('Personen_ID not received.');
}

const { data: transaktionen, pending, error } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      query MyQuery($Personen_ID: uniqueidentifier = "") {
        swps_Personen_by_pk(Personen_ID: $Personen_ID) {
          Transaktions {
            Produkt{
              Name
              Preis
              Standort {
                Name
              }
            }
            Transaktionszeitpunkt
            Transaktions_ID
            Anzahl
          }
        }
      }
    `, 
    variables: {
      Personen_ID: Personen_ID, 
    },    
  }),
});
</script>

<template>
  <p v-if="pending">Fetching...</p>
  <pre v-else-if="error">Could not load: {{ error.data }}</pre>
  <div v-else>
    <v-list>
      <v-list-item v-for="transaktion in transaktionen.data.swps_Personen_by_pk" :key="transaktion.Transaktions_ID">
        <transaktionuser :transaktion="transaktion"> </transaktionuser>
      </v-list-item>
    </v-list>  
  </div>
  <!-- hier kommt user profil zeugs hin -->
</template>
