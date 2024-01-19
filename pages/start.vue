<!-- admin log fehlt ist die seite für user/admin auswahl-->
<script setup lang="ts">
import { globalStore } from '@/global.js';
console.log('Current Personen_ID:', globalStore.Personen_ID);
definePageMeta({layout:'login',});

const { data: users, pending, error } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query { swps_Personen { Vorname Name Mail Anrede Aktiv Personen_ID PersonenExt { Latest_update PIN Personen_ID } } }" },
})
const show_all = ref(false);
const show_all_model_text = computed(() => show_all.value ? "yes" : "no");

</script>

<template>
  <v-container style="width: 100vw;">
    <v-row>
      <v-col sm="1">Show all: {{ show_all_model_text }}</v-col>
      <v-col sm="1">
        <v-switch color="primary" v-model="show_all"  density="dense" messages="show all"></v-switch>
      </v-col>
    </v-row>
  </v-container>
  <p v-if="pending">Fetching...</p>
  <pre v-else-if="error">Could not load: {{ error.data }}</pre>
  <div v-else>
    
    <newuser></newuser>
    <v-container>
      <v-row>
        <v-col v-for="user in users.data.swps_Personen" :key="user.Personen_ID" sm="4">
          <User :user="user" :correctPIN="user.PersonenExt.PIN" v-if="show_all || user.Aktiv" ></User>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>