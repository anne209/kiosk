<!-- das ist die seite für user/admin auswahl-->
<script setup lang="ts">
import { useGlobalState } from '~/composables/useGlobalState';
const { Personen_ID, Name, Vorname } = useGlobalState();

// Log 
console.log(`Initial Personen_ID: ${Personen_ID.value}`);
console.log(`Initial Name: ${Name.value}`);
console.log(`Initial Vorname: ${Vorname.value}`);

// Watcher
watch(Personen_ID, (newValue, oldValue) => {
  console.log(`Personen_ID changed from ${oldValue} to ${newValue}`);
});

definePageMeta({layout:'login',});

const { data: users, pending, error } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query { swps_Personen { Vorname Name Mail Anrede Aktiv Personen_ID PersonenExt { Latest_update PIN Personen_ID } } }" },
})
const show_all = ref(false);
const show_all_model_text = computed(() => show_all.value ? "ja" : "nein");
const PersonenSuche = ref('');




</script>

<template>
  <v-card  class="pa-8 d-flex my-card justify-center flex-wrap">
    <v-responsive max-width="550">
      
     
      <!-- farbe in das autocomplete einbauen-->
      <v-autocomplete 
        v-model="PersonenSuche"
        :items="users.data.swps_Personen.map(item => ({Personen_ID: item.Personen_ID, text: item.Name}))"
        item-text="text"
        item-value="Personen_ID"
        item-title="text"
        auto-select-first
        class="flex-full-width"
        item-props
        menu-icon=""
        placeholder="Name"
        label="Deinen Namen suchen"

        prepend-inner-icon="mdi-magnify"
        rounded
        theme="light"
        variant="solo"
      ></v-autocomplete>
    </v-responsive>
  </v-card>
 
  <!-- hier muss irgendwie gecentered werden-->
  <v-container >
      <v-row>
        <v-col v-if="PersonenSuche" :key="PersonenSuche">
        <User
          :user="users.data.swps_Personen.find(user => user.Personen_ID === PersonenSuche)"
          :correctPIN="users.data.swps_Personen.find(user => user.Personen_ID === PersonenSuche)?.PersonenExt.PIN"
        ></User>
      </v-col>
      </v-row>
    </v-container>
 
  
</template>

<style scoped>
.my-card {
  background-color: rgba(255, 255, 255, 0.0); 
}
</style>