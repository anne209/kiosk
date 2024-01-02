<script setup lang="ts">
definePageMeta({layout: 'admin'});

const { data: transaktionen, pending, error } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query {swps_Transaktion {Abrechnungszeitpunkt Anzahl Transaktionszeitpunkt Transaktions_ID Personen { Name Personen_ID } Produkt { Name Preis} }}" },
})
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