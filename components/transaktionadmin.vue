<script setup>

import {defineProps} from 'vue'; 

//emit an das parent(transaktionsverwaltung) damit die produkte neu gefetched werden 
const emit = defineEmits(['transaction-updated']); 

//prop vom parent(transaktionsverwaltung) damit die Produktdaten an die v-card weitergegeben 
const props = defineProps({
  transaktion:Object,
});   




const currentDatetime = new Date().toISOString();
    console.log(currentDatetime)

const successAlert= ref(false);
const errorAlert = ref(false); 
const successMessage= ref(''); 
const errorMessage= ref('');




//Abrechnung durchführen 
const abrechnungTransaktion = async () => {
  try{
    const res = await useFetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        mutation MyQuery ($Abrechnungszeitpunkt: datetime = "", $Transaktions_ID: uniqueidentifier = "") {
          update_swps_Transaktion_by_pk(pk_columns:{Transaktions_ID: $Transaktions_ID}, _set: {Abrechnungszeitpunkt: $Abrechnungszeitpunkt} ) {
            Transaktions_ID
            Abrechnungszeitpunkt
          }
        }
        `, 
        variables: {
          Transaktions_ID: props.transaktion.Transaktions_ID, 
          Abrechnungszeitpunkt: currentDatetime, 
        }, 
  })
}); 
    
    console.log('Produktupdate erfolgreich:', res);
// Log für Success Benachrichtigung
if (res && res.data && res.data.value) {
      console.log('Processed response:', res.data.value);
      successMessage.value= 'Erfolgreiche Abrechnung';
      successAlert.value = true; 
      errorAlert.value = false; 
      emit('transaction-updated'); 
    }

    // Log für Error Benachrichtigung
    if (res.error && res.error.value) {
      console.error('Fetch error:', res.error.value);
    }
    // try { wird hier gecatched 
  } catch (error) {
    console.error('Error during fetch operation:', error);
    errorMessage.value = 'Fehler bei Abrechnung ';
    errorAlert.value = true; 
    successAlert.value = false; 
  }
};


</script>
<template>
        <v-card  width="1000" color="#4E342E" hover>
          
          <v-alert
              v-if="successAlert"
              type="success"
              closable
              dismissible
              @dismiss="successAlert=false"
              >{{ successMessage }}
          </v-alert>     <!-- Alert Benachrichtigungen -->  
          <v-alert
              v-if="errorAlert"
              type="error"
              closable
              dismissible
              @dismiss="errorAlert=false"
              >{{ errorMessage }}
          </v-alert> 
        <v-card-item>
          <v-card-title>
            Transakation: {{ transaktion.Transaktions_ID }}
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
              <v-col cols="2">
                Kunde: {{ transaktion.Personen.Name }}
              </v-col>
              <v-col cols="5">
                Personen_ID: {{ transaktion.Personen.Personen_ID }}
              </v-col>
              <v-col cols="4">
                Transakationszeitpunkt: {{ transaktion.Transaktionszeitpunkt }}
              </v-col>
            </v-row>
            <v-row>
              <v-card-text class="headline" v-if="transaktion.Abrechnungszeitpunkt">
            <v-icon color ="success"> mdi-check-circle-outline </v-icon>
            Abrechnung erfolgt am {{ transaktion.Abrechnungszeitpunkt }}
          </v-card-text>
          <v-card-text v-else class="headline">
              <v-icon color="error"> mdi-alert-circle-outline </v-icon>
              Abrechnung noch nicht erfolgt
          </v-card-text>
          <v-col cols="4">
          <v-btn
          color="success"
          elevation="20"
          @click="abrechnungTransaktion"
          v-if="!transaktion.Abrechnungszeitpunkt">
            Abrechnung durchführen
          </v-btn>
        </v-col>
            </v-row>
          </v-card-text>
        </v-card-item>

</v-card>
    
  </template>
  
  
