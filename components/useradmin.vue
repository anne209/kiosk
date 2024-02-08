<script setup>
import {ref} from 'vue'; 
import LionScratchIcon from "@/components/LionScratchIcon.vue";

// LöwenScratch bearbeiten 
const iconColor = ref('silver'); // die Farbe wird hier nicht verändert, ist fest eingstellt in LionScratchIcon.vue
const iconWidth = ref('70'); // Breite
const iconHeight = ref('80'); // Höhe


const props = defineProps({
    user:Object, 
}); 

</script>


<template>
    <v-card class="card" elevation="9" max-width="400" hover >
     
        
      <v-card-item class="py-0"> 
        <v-card-title class="text-h6 d-flex align-center" style="flex: 1;">
            {{ user.Vorname }}
            {{ user.Name }} 
           <div class="ml-auto">
                <LionScratchIcon :color="iconColor" :width="iconWidth" :height="iconHeight" />
              </div>
        </v-card-title>
        <v-card-subtitle>{{ user.Mail }}</v-card-subtitle>
      <v-card-text>
        <div>
          Aktiv: {{ user.Aktiv }}
        <div>
          Standort: {{ user.Standort.Name}}
        </div>
        </div>
        <div> 
         Anzahl der Transaktionen: {{ user.Transaktions_aggregate.aggregate.count}}
        </div>
        <!-- hier müsste noch die richige query aus dem parent -->
        <div>
          Größte einmalige Bestellung: {{ user.Transaktions[0]?.Anzahl }} - {{ user.Transaktions[0]?.Produkt?.Name }} ({{ user.Transaktions[0]?.Produkt?.Produkt_ID }})
        </div>
        <div>
          Letztes Update: {{ user.PersonenExt.Latest_update }}
        </div>
         
         <!-- hier könnte noch das Lieblingsprodukt stehen-->
         <!-- Nutzer Standort anzeigen -->
        </v-card-text>
        
     </v-card-item>
   </v-card>
</template>

<style scoped>
.card {
    
    border-radius: 18px; 
    box-shadow: 0px 4px 24px 2px rgba(255, 255, 255, 0.2); /* Adjust spread and blur */
    backdrop-filter: blur(20px);
    

    /*  Hier muss weiss schwarz swerden */
    background: rgb(2,0,3);
    background: linear-gradient(70deg, rgba(2,0,3,1) 60%, rgba(2,2,6,1) 67%, rgba(2,49,68,1) 77%, rgba(1,78,107,1) 82%, rgba(1,107,147,1) 87%, rgba(0,148,202,1) 92%, rgba(0,205,181,1) 97%, rgba(0,233,171,1) 100%);
    
    /* Other styles for text, etc. inside the card */
    color: #FFF; /* For text color, assuming a light background */
    font-family: 'Arial', sans-serif; /* Font style for text */
  }

</style>