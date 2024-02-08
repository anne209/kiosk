<script setup>
  import {ref} from 'vue'; 
  import LionScratchIcon from "@/components/LionScratchIcon.vue";

  // LöwenScratch bearbeiten 
  const iconColor = ref('silver'); //Farbe 
  const iconWidth = ref('70'); //Breite
  const iconHeight = ref('80'); //Höhe

  // User Daten als props aus Nutzerverwaltung 
  const props = defineProps({
      user:Object, 
  }); 

</script>


<template>
  <!-- Useradmin card-->
  <v-card class="card" elevation="9" max-width="400" hover >

    <v-card-item class="py-0"> 
        <v-card-title class="text-h6 d-flex align-center" style="flex: 1;">
            {{ user.Vorname }}
            {{ user.Name }} 
              <div class="ml-auto">
                <LionScratchIcon :color="iconColor" :width="iconWidth" :height="iconHeight" />
              </div>
        </v-card-title>

        <v-card-subtitle> Mail: {{ user.Mail }}</v-card-subtitle>
        <v-card-subtitle>ID: {{ user.Personen_ID }}</v-card-subtitle>

        <v-card-text>
          Aktiv: {{ user.Aktiv }}
          <div>
          Standort: {{ user.Standort.Name}}
          </div>

          <div> 
          Anzahl der Transaktionen: {{ user.Transaktions_aggregate.aggregate.count}}
          </div>
          
          <div>
            Anzahl gekaufter Produke: {{ user.Transaktions_aggregate?.aggregate.sum?.Anzahl }}
          </div>

          <div>
            Größte Bestellung: {{ user.Transaktions[0]?.Anzahl }} - {{ user.Transaktions[0]?.Produkt?.Name }} 
          </div>

          <div>
            Letztes Update: {{ user.PersonenExt.Latest_update }}
          </div>
         
        </v-card-text>
    </v-card-item>
  </v-card>
</template>

<style scoped>

/*  Diverse Stylings für Usercard */
.card {
    
    border-radius: 18px; 
    box-shadow: 0px 4px 24px 2px rgba(255, 255, 255, 0.2); 
    backdrop-filter: blur(20px);
    
    background: rgb(2,0,3);
    background: linear-gradient(70deg, rgba(2,0,3,1) 60%, rgba(2,2,6,1) 67%, rgba(2,49,68,1) 77%, rgba(1,78,107,1) 82%, rgba(1,107,147,1) 87%, rgba(0,148,202,1) 92%, rgba(0,205,181,1) 97%, rgba(0,233,171,1) 100%);
    
    color: #FFF; /* Textfarbe */
  }

</style>