<!-- muss noch bearbeitet werden -->
<script setup lang="ts">
definePageMeta({layout: 'admin'}); 

const { data: produkte, pending, error} = await useFetch(`http://localhost:8080/v1/graphql`,{
method:"POST", 
body: {query: "query { swps_Produkt {Name Preis Latest_update Produkt_ID Transaktions {Anzahl Personen {Name}}  Transaktions_aggregate {aggregate {count}} Standort {Name Standort_ID}}}"}
})
</script>

<template>
<p v-if="pending"> Fetching</p>
    <pre v-else-if="error"> Could not load: {{ error.data }}</pre>
    <div v-else>
    <v-container>
      <v-row>
        <v-col v-for="produkt in produkte.data.swps_Produkt" :key="produkt.Produkt_ID">             
          <produktadmin :produkt="produkt" ></produktadmin> 
        </v-col>
      </v-row>
    </v-container>
        
    </div>

    
</template>
