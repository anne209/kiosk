<!-- dieses component wird auf der Page /verwaltung angewandt-->


<script setup>

function createGuid() {  //damit wird ein uuid generiert
         function _p8(s) {  
          var p = (Math.random().toString(16) + "000000000").substr(2,8);  
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p;  
  }  
  return _p8() + _p8(true) + _p8(true) + _p8();  
}  

var guid = createGuid(); 

console.log(guid);


const Name = ref('');
const successAlert= ref(false);
const errorAlert = ref(false); 
const successMessage= ref(''); 
const errorMessage= ref('');

const addLocation = async () => {
  try {
    // Standortnamen prüfen
    if (!/^[a-zA-Z]+$/.test(Name.value)) {
      throw new Error('Standort erforderlich');
    }
    // Standort_ID generieren als uuid
    const Standort_ID = createGuid();
    
    // Logs
    console.log('Sending request with values:', {
      Name: Name.value,
      Standort_ID: Standort_ID,


    });
      //damit wird auf das graphQL bzw auf die Datenbank zugegriffen
    const res = await useFetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        // im Folgenden wird ein neuer Standort in die Datenbank mittles mutation hinzugefügt
      body: JSON.stringify({
        query: `
          mutation MyMutation($Name: String!,$Standort_ID: uniqueidentifier!) {       
            insert_swps_Standort(objects: {
              Name: $Name, 
              Standort_ID: $Standort_ID
            }) {
              returning {
                Name
                Standort_ID
               
              }
            } 
          }`,
          variables: { // die Namen und die Standort-IDs müssen definiert werden
          Name: Name.value,
          Standort_ID: Standort_ID,
        },
      }),
    });    
    
    // Log für Raw response vom Server
    console.log('Raw response:', res);

     // Log für Success Benachrichtigung 
    if (res && res.data && res.data.value) {
      console.log('Processed response:', res.data.value);
      successMessage.value= 'Standort erfolgreich hinzugefügt';
      successAlert.value= true; 
      errorAlert.value= false;
    }

    // Log für Error Benachrichtigung
    if (res.error && res.error.value) {
      console.error('Fetch error:', res.error.value);
    }
    // try { wird hier gecatched 
  } catch (error) {
    console.error('Error during fetch operation:', error);
    errorMessage.value= 'Fehler beim Standort hinzufügen '; 
    errorAlert.value= true; 
    successAlert.value= false;
}
};
  
</script>  

<template>
  <v-form ref="form">
    <v-card
      class="mx-auto"
      title="Neuen Standort einrichten" 
    > <!-- erscheint ganz unten auf der page /verwaltung-->

        <!-- Alert notifications -->
      <v-container>
        <v-alert
         v-if="successAlert"
         type="success"
         dismissible
         @dismiss="successAlert=false"
         >{{ successMessage }}
        </v-alert>
         
        <v-alert
         v-if="errorAlert"
         type="error"
         dismissible
         @dismiss="errorAlert=false"
        > {{ errorMessage }}
        </v-alert>
        <!-- bei rules wird überprüft, ob der Name korrekt ist-->
        <v-text-field 
          v-model="Name"
          :rules="[() => !!Name.value || 'Standort erforderlich', (v) => /^[a-zA-Z]+$/.test(v) || 'Der Name darf nur Buchstaben enthalten']" 
          color="primary"
          label="Neuer Standort"
          placeholder="z.B. Berlin"
          variant="underlined"
          required
        ></v-text-field> <!-- Berlin erscheint, wenn man ins Textfeld klickt -->
        <v-btn
          color="success" 
          @click="addLocation" 
        >Standort einrichten 
          <v-icon icon="mdi-chevron-right" end></v-icon> <!-- Das ist der grüne Button -->
        </v-btn>
      </v-container>
    </v-card>
  </v-form>
</template>
