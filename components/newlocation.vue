<!-- bei mir lässt sich die seite irgendwie nicht anzeigen, obwohl eigentlich alles funktionieren sollte-->

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


const Name = ref('');

const addLocation = async () => {
  try {
    // Standortnamen prüfen
    if (!/^[a-zA-Z]+$/.test(Name.value)) {
      throw new Error('Standort erforderlich');
    }
    // Standort_ID generieren
    const Standort_ID = createGuid();
    
    // Log the values before sending the request
    console.log('Sending request with values:', {
      Name: Name.value,
      Standort_ID: Standort_ID,


    });

    const res = await useFetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    
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
          variables: {
          Name: Name.value,
          Standort_ID: Standort_ID,
        },
      }),
    });    
    
    // Log the raw response from the server
    console.log('Raw response:', res);

    // Additional logging based on how useFetch works
    if (res && res.data && res.data.value) {
      console.log('Processed response:', res.data.value);
      successMessage.value= 'Standort erfolgreich hinzugefügt';
      successAlert.value= true; 
      errorAlert.value= false;
    }

    // Check and log any errors
    if (res.error && res.error.value) {
      console.error('Fetch error:', res.error.value);
    }
    
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
    >
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
        <v-text-field
          v-model="Name"
          :rules="[() => !!Name.value || 'Standort erforderlich', (v) => /^[a-zA-Z]+$/.test(v) || 'Der Name darf nur Buchstaben enthalten']"
          color="primary"
          label="Neuer Standort"
          placeholder="z.B. Berlin"
          variant="underlined"
          required
        ></v-text-field>
        <v-btn
          color="success"
          @click="addLocation"
        >Standort einrichten
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-container>
    </v-card>
  </v-form>
</template>
