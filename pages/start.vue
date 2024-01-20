<!-- das ist die seite für user/admin auswahl-->
<script setup lang="ts">
import { globalStore } from '@/global.js';
console.log('Current Personen_ID:', globalStore.Personen_ID);
definePageMeta({layout:'login',});

const { data: users, pending, error } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query { swps_Personen { Vorname Name Mail Anrede Aktiv Personen_ID PersonenExt { Latest_update PIN Personen_ID } } }" },
})
const show_all = ref(false);
const show_all_model_text = computed(() => show_all.value ? "ja" : "nein");

</script>

<template>
  <v-card  class="pa-8 d-flex my-card justify-center flex-wrap">
    <v-responsive max-width="550">
      <!-- hier kann man seinen Namen anzeigen lassen und der soll dann unten aufgeführt werden -->
      <!-- hier muss man die items noch richtig anschliessen an die query-->
      <!-- farbe in das autocomplete einbauen-->
      <v-autocomplete 
        :items="items" 
        append-inner-icon="mdi-microphone"
        auto-select-first
        class="flex-full-width"
        density="comfortable"
        item-props
        menu-icon=""
        placeholder="Deinen Namen suchen"
        prepend-inner-icon="mdi-magnify"
        rounded
        theme="light"
        variant="solo"
      ></v-autocomplete>
    </v-responsive>
  </v-card>
  <v-container style="width: 100vw;">
    <v-row>
      <v-col sm="3">Alle Nutzer anzeigen: {{ show_all_model_text }}</v-col>
      <v-col sm="2">
        <v-switch color="primary" v-model="show_all"  density="dense" messages="alle anzeigen"></v-switch>
      </v-col>
    </v-row>
  </v-container>
  <p v-if="pending">Fetching...</p>
  <pre v-else-if="error">Could not load: {{ error.data }}</pre>
  <div v-else>
    
    <v-container>
      <v-row>
        <v-col v-for="user in users.data.swps_Personen" :key="user.Personen_ID" sm="4">
          <User :user="user" :correctPIN="user.PersonenExt.PIN" v-if="show_all || user.Aktiv" ></User>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.my-card {
  background-color: rgba(255, 255, 255, 0.25);
 

}
</style>