<!-- irgendwie schöner machen und geordneter-->

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  transaktion: Object,
});

// Log für das Prop
console.log('transaktion prop:', props.transaktion);
</script>

<template>
  <v-card>
    <v-list>
      <v-list-item-group>
        <!-- kein plan wie das funktioniert hat -->
        <v-list-item v-for="(item, index) in transaktion" :key="index">
      
          <v-list-item-content class="custom-product-quantity">
            <v-list-item-title class="headline text--primary">
              Produkt: {{ item.Produkt.Name }}
            </v-list-item-title>
            <v-list-item-subtitle class="caption text--secondary">
              Preis: {{ item.Produkt.Preis }} 
            </v-list-item-subtitle>
            <v-list-item-subtitle class="caption text--secondary">
              Standort: {{ item.Produkt.Standort.Name }} 
            </v-list-item-subtitle>
          </v-list-item-content>

         
          <v-list-item-content>
            <v-list-item-subtitle class="caption text--secondary">
              Transaktions-ID: {{ item.Transaktions_ID }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="caption text--secondary">
              Anzahl: {{ item.Anzahl }} 
            </v-list-item-subtitle>
            <v-list-item-subtitle class="caption text--secondary">
              Transaktionszeitpunkt: {{ item.Transaktionszeitpunkt }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
  
<style scoped>

</style>