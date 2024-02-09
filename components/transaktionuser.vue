

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  transaktion: Object,
});

// Log für das Prop
console.log('transaktion prop:', props.transaktion);
</script>

<template>
  <div>
    <v-card width="1000" color="#4E342E" hover>
      <v-card-item>
        <v-card-title>
          Transaktion: {{ transaktion.Transaktions_ID }}
        </v-card-title>
        <v-card-subtitle>
          Produkt: {{ transaktion.Produkt.Name }}
          <v-spacer></v-spacer>
          Preis: {{ transaktion.Produkt.Preis }}€
          <v-spacer></v-spacer>
          Produkt_ID: {{ transaktion.Produkt.Produkt_ID }}
          Standort: {{ transaktion.Produkt.Standort.Name }}
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              Transaktionszeitpunkt: {{ transaktion.Transaktionszeitpunkt }}
            </v-col>
          </v-row>
          <v-row v-if="transaktion.Abrechnungszeitpunkt" class="headline">
            <v-icon color="success">mdi-check-circle-outline</v-icon>
            Abrechnung erfolgt am {{ transaktion.Abrechnungszeitpunkt }}
          </v-row>
          <v-row v-else class="headline">
            <v-icon color="error">mdi-alert-circle-outline</v-icon>
            Abrechnung noch nicht erfolgt
          </v-row>
        </v-card-text>
      </v-card-item>
    </v-card>
  </div>
</template>