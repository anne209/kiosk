<script setup>
function createGuid() {  
         function _p8(s) {  
          var p = (Math.random().toString(16) + "000000000").substr(2,8);  
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p;  
  }  
  return _p8() + _p8(true) + _p8(true) + _p8();  
}  

var guid = createGuid(); 

console.log(guid);

import { ref } from 'vue';

const currentDatetime = new Date().toISOString();
    console.log(currentDatetime)

const props = defineProps({
  produkt:Object,
  Personen_ID:String,
});


const Anzahl= ref('');
const successAlert= ref(false);
const errorAlert = ref(false); 
const successMessage= ref(''); 
const errorMessage= ref('');
const show = ref(false);

const loading = ref(false)

  watch(loading, val => {
    if (!val) return
    setTimeout(() => (loading.value = false),1500)});   



            
const addTransaction = async () => {
  try {
    // Anzahl überprüfen 
    if (!Anzahl.value) {
    throw new Error('Anzahl erforderlich');
    }
    // Transaktion_ID generieren 
    const Transaktions_ID = createGuid();
    
    
    // Logs
    console.log('Sending request with values:', {
      Anzahl: Anzahl.value,
      Abrechnungszeitpunkt: currentDatetime,
      Personen_ID: props.Personen_ID, 
      Produkt_ID: props.produkt.Produkt_ID,
      Transaktions_ID: Transaktions_ID,
      Transaktionszeitpunkt: currentDatetime,
    });

    const res = await useFetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
        query: `
          mutation MyMutation($Transaktionszeitpunkt: datetime = "", $Transaktions_ID: uniqueidentifier = "", $Produkt_ID: uniqueidentifier = "", $Personen_ID: uniqueidentifier = "", $Anzahl: Int!, $Abrechnungszeitpunkt: datetime = "") {       
            insert_swps_Transaktion(objects: {
              Abrechnungszeitpunkt: $Abrechnungszeitpunkt, 
              Anzahl: $Anzahl,
              Personen_ID: $Personen_ID, 
              Produkt_ID: $Produkt_ID,
              Transaktions_ID: $Transaktions_ID,
              Transaktionszeitpunkt: $Transaktionszeitpunkt

            }) {
              returning {
                Abrechnungszeitpunkt
                Anzahl
                Personen_ID
                Produkt_ID
                Transaktions_ID
                Transaktionszeitpunkt
                
              }
            } 
          }`,
          variables: {
          Anzahl: parseInt(Anzahl.value),
          Abrechnungszeitpunkt: currentDatetime,
          Personen_ID: props.Personen_ID, 
          Produkt_ID: props.produkt.Produkt_ID,
          Transaktions_ID: Transaktions_ID,
          Transaktionszeitpunkt: currentDatetime,
        },
      }),
    });      

    // Log für Raw response vom Server
    console.log('Raw response:', res);

    // Log für Success Benachrichtigung 
    if (res && res.data && res.data.value) {
      console.log('Processed response:', res.data.value);
      successMessage.value= 'Produkt erfolgreich gekauft';
      successAlert.value = true; 
      errorAlert.value = false; 
    }

    // Log für Error Benachrichtigung
    if (res.error && res.error.value) {
      console.error('Fetch error:', res.error.value);
    }
    // try { wird hier gecatched 
  } catch (error) {
    console.error('Error during fetch operation:', error);
    errorMessage.value = 'Fehler beim Kauf ';
    errorAlert.value = true; 
    successAlert.value = false; 
}
};
</script>

<template>
        <v-card
          
          class="mx-auto my-12"
          max-width="374"
          hover
          color="#FF6B35">
        
          <v-card-item>
            <v-alert
            v-if="successAlert"
         type="success"
         closable
         dismissible
         @dismiss="successAlert=false"
         >{{ successMessage }}
          </v-alert>   
          <v-alert
         v-if="errorAlert"
         type="error"
         closable
         dismissible
         @dismiss="errorAlert=false"
        > {{ errorMessage }}
        </v-alert> 
          <v-card-title class="text-h5">
            {{ produkt.Name }}
          </v-card-title>
          <v-card-subtitle> 
            Preis: {{produkt.Preis}}€
          </v-card-subtitle>
           </v-card-item>
           <v-card-text>
            hier kommt das bild vom produkt
           </v-card-text>
          <v-card-actions>
          
            <v-text-field
            v-model="Anzahl"
            label="Anzahl auswählen"
            ></v-text-field>
            <v-btn
            :disabled="loading"
            :loading="loading"
            class="text-none"
            variant="flat"
            @click="addTransaction"
            
            >Kaufen</v-btn> 
            <v-btn
              variant="tonal"
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>     <!-- hier kommt der QR Code fuer die Augemented reality von den produkten rein-->
          AR QR-code
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
  p{
    font-family: sans
  }
</style>