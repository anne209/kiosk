<script setup>

const props = defineProps({
  transaktion:Object,
  

});   
</script>
<template>
 
    <v-list>
      <v-list-item-group>
    <v-list-item>
  {{ transaktion.Personen.Name }}
  {{ transaktion.Personen.Personen_ID }}
      </v-list-item>
        <v-list-item>
          <!-- Produkt -->
          <v-list-item-content class="custom-product-quantity">
            <v-list-item-title class="headline text--primary">
              Bestellung {{ transaktion.Produkt }}
            </v-list-item-title>
            <v-list-item-subtitle class="caption text--secondary">
              Anzahl der Produkte: {{ transaktion.Anzahl }} 
            </v-list-item-subtitle>
          </v-list-item-content>
  
          <!-- Abrechnungszeitpunkt -->
          <v-list-item-content class="text right">
            <v-list-item-title class="headline" v-if="transaktion.Abrechnungszeitpunkt">
              <v-icon color ="success"> mdi-check-circle-outline </v-icon>
              Abrechnung erfolgt am {{ transaktion.Abrechnungszeitpunkt }}
            </v-list-item-title>
            <v-list-item-title v-else class="headline">
                <v-icon color="error"> mdi-alert-circle-outline </v-icon>
                Abrechnung noch nicht erfolgt
            </v-list-item-title>
          </v-list-item-content>
  
          <!-- Transaktionszeitpunkt -->
          <v-list-item-content>
            <v-list-item-subtitle class="caption text--secondary">
              {{ transaktion.Transaktionszeitpunkt }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-divider class="mt-2 mb-2"></v-divider>
        </v-list-item>
      </v-list-item-group>
    </v-list>
 
  </template>
  
  
