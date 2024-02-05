<script setup>
import {computed} from 'vue'; 

const props = defineProps({
  produkt:Object,
  });

// vielleicht ein emit des Inventar bestands


// volles Inventar 
const fullStock = 20; 

const currentInventory = computed(() => {
  const sumbought = props.produkt.Transaktions_aggregate.aggregate.sum.Anzahl || 0; 
  return fullStock - sumbought;   
}); 

// Determine the class based on the current inventory level
const inventoryClass = computed(() => {
  if (currentInventory.value <= 5) {
    return 'low-stock';
  } else if (currentInventory.value <= 10) {
    return 'medium-stock';
  } else {
    return 'high-stock';
  }
});


</script>

<template>
    <v-card class="mx-auto my-12" :class="inventoryClass" max-width="400" hover>
      
    <v-card-item>     
            <v-card-title class="text-h5 d-flex align-center">
                 {{ produkt.Name }}
            </v-card-title>
            <v-card-subtitle> <!-- hier sollte man den preis ändern koennen-->
                 Preis: {{produkt.Preis}}€    
            </v-card-subtitle>
    </v-card-item>
       <v-card-text>
       <h3>
         Inventarbestand: {{currentInventory }}
       </h3>

        <div class="text-subtitle-1"> 
            Standort: {{ produkt.Standort.Name }}
        </div>

        <div> <!-- zeigt of wie viele Transakationen einem Produkt zu geordnet werden aber nicht viele einzelne Produkte bestellt wurde-->
            Anzahl der Transakationen: {{ produkt.Transaktions_aggregate.aggregate.count}}
        </div>
        <div> <!-- zeigt Summe der bestellten Waren -->
            Summe der verkauften Waren: {{ produkt.Transaktions_aggregate.aggregate.sum.Anzahl}}
        </div>

            Letztes Produktupdate: {{ produkt.Latest_update }}
        <div>
        Produkt_ID: {{ produkt.Produkt_ID }}
        </div>
        </v-card-text>
      <v-card-actions>
        
        <v-row justify-space-between>
        <v-col cols="6">
        <v-btn
        block
        color="info"
        variant="flat"
        elevation="4"
        >Bearbeiten
        </v-btn>
      </v-col>

        <v-col cols="6">
        <v-btn
        block
        color="error"
        variant="flat"
        elevation="4"
        >Löschen
        </v-btn>
      </v-col>
      </v-row>


      </v-card-actions>
      
</v-card>
</template>


<style scoped>
.low-stock {
  background-color: red;
  border-radius: 18px; 
  backdrop-filter: blur(20px);
  
}
.medium-stock {
  background-color: orange;
  border-radius: 18px; 
  backdrop-filter: blur(20px);
  
}
.high-stock {
  background-color: green;
  border-radius: 18px; 
  backdrop-filter: blur(20px);
  
}


</style>