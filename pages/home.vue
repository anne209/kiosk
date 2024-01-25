
<script setup lang="ts">
definePageMeta({layout:'default',});

import { useGlobalState } from '~/composables/useGlobalState';
const {Personen_ID, setPersonen_ID, resetPersonen_ID} = useGlobalState();

console.log(`Initial Personen_ID: ${Personen_ID.value}`);



// hier müssen wir möglicherweise eine andere Query: swps_Standort_by_pk 
// die Produkte werden so angezeigt je nach dem was der User eingestellt hat 
// war anfrage aus scrum meeting 
const { data: produkte, pending, error } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query { swps_Produkt { Name Preis Produkt_ID Standort_ID }}" },
})
const show_all = ref(false);
const show_all_model_text = computed(() => show_all.value ? "yes" : "no");


</script>


<template>

  <main>
  <v-sheet  color="#F5F5F5">
    <v-container style="width: 100vw;">
    <v-row>
      <v-col sm="1">Show all: {{ show_all_model_text }}</v-col>
      <v-col sm="1">
        <v-switch color="primary" v-model="show_all"  messages="show all"></v-switch>
      </v-col>
      <v-col>
        <cartbadge></cartbadge>
      </v-col>
    </v-row>
    </v-container>
  <p v-if="pending">Fetching...</p>
  <pre v-else-if="error">Could not load: {{ error.data }}</pre>
  <div v-else>
    <v-container>
      <v-row>
        <v-col v-for="produkt in produkte.data.swps_Produkt" :key="produkt.Produkt_ID">               
          <produkt :produkt="produkt" :Personen_ID="Personen_ID"></produkt> 
        </v-col>
      </v-row>
    </v-container>
  </div>
</v-sheet>
</main>
  
</template>