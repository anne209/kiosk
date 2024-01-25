<script setup lang="ts">
definePageMeta({layout: 'admin'});

const { data: transaktionen, pending, error } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query {swps_Transaktion {Abrechnungszeitpunkt Anzahl Transaktionszeitpunkt Transaktions_ID Personen { Name Personen_ID } Produkt { Name Preis} }}" },
})



const { graphQlQueryToJson } = require("graphql-query-to-json");

const { data: personen, pending: personenPending } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: JSON.stringify({ query: "query { swps_Personen { Vorname Name }}" }),
});


const Vorname = ref('');
const Name = ref('');

// Corrected the query string, added 'query' keyword, and fixed syntax for variables
const query = `
  query viewer($Vorname: String, $Name: String) {
    viewer {
      personal(criteria: { Vorname: $Vorname, Name: $Name }) {
        Vorname
        Name
      }
    }
  }
`;

// Access the value property of reactive variables for the 'variables' object
const result = graphQlQueryToJson(query, {
  variables: {
    Vorname: Vorname.value,
    Name: Name.value,
  },
});

const jsonString = JSON.stringify(result);
const fs = require ('fs');
const filePath = 'C:/Users/user/kiosk/result.json';
fs.writeFileSync(filePath, jsonString);

console.log(personen);



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