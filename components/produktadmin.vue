<script setup>

import {computed} from 'vue'; 

const props = defineProps({
  produkt:Object,
  });

  const confirmDialog = ref(false);

  const currentDatetime = new Date().toISOString();
    console.log(currentDatetime)

  // der veränderbare const
  const editablePreis = ref(props.produkt.Preis);
  const editableName = ref(props.produkt.Name); 
// vielleicht ein emit des Inventar bestands

const successAlert= ref(false);
const errorAlert = ref(false); 
const successMessage= ref(''); 
const errorMessage= ref('');


const loading = ref(false); 
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


//Produkt bearbeiten 

const updateProduct = async () => {
  loading.value = true; 
  if (editablePreis.value === props.produkt.Preis.toString() && editableName.value === props.produkt.Name) {
    console.error('No changes detected');
    loading.value = false;
    return; // Exit the function early if no changes are detected
  } 
  try{
    const res = await useFetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        mutation MyMutation ($Preis: Int! , $Name: String = "", $Latest_update: datetime = "", $Produkt_ID: uniqueidentifier = "") {
          update_swps_Produkt_by_pk(pk_columns:{Produkt_ID: $Produkt_ID}, _set: {Latest_update: $Latest_update, Name: $Name, Preis: $Preis} ) {
            Produkt_ID
            Name 
            Preis
            Latest_update
          }
        }
        `, 
        variables: {
          Produkt_ID: props.produkt.Produkt_ID, 
          Latest_update: currentDatetime, 
          Preis: parseInt(editablePreis.value),
          Name: editableName.value, 

        }, 
  })
}); 
    
    console.log('Produktupdate erfolgreich:', res);
// Log für Success Benachrichtigung
if (res && res.data && res.data.value) {
      console.log('Processed response:', res.data.value);
      successMessage.value= 'Erfolgreiches Produktupdate';
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
    errorMessage.value = 'Fehler bei Produktupdate ';
    errorAlert.value = true; 
    successAlert.value = false; 
  }
};

//Produkt löschen mutation MyQuery($Produkt_ID: uniqueidentifier = "") {
  // mit delete product siehe v-dialog 

</script>

<template>
    <v-card class="mx-auto my-12" :class="inventoryClass" max-width="400" hover>
          <v-alert
              v-if="successAlert"
              type="success"
              closable
              dismissible
              @dismiss="successAlert=false"
              >{{ successMessage }}
          </v-alert>     <!-- Alert notifications -->  
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
              Produktname ändern 
                 <v-text-field v-model="editableName" variant="outlined" suffix="Produkt"/>
            </v-card-title>
            <v-card-subtitle>
              Preis bearbeiten:  
              <v-text-field v-model="editablePreis" type="number"  step="1" variant="outlined" suffix="€"/>
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
        @click="updateProduct"
        >Bearbeiten
        </v-btn>
      </v-col>

        <v-col cols="6">
        <v-btn
        block
        color="error"
        variant="flat"
        elevation="4"
        @click="confirmDialog = true"
        >Löschen
        </v-btn>
        <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Entfernen bestätigen </v-card-title>
        <v-card-text>
          Sind Sie sicher, dass Sie das Produkt: {{ produkt.Name }} entfernen möchten? 
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="deleteProduct">Ja, entfernen </v-btn>
          <v-btn @click="confirmDialog = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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