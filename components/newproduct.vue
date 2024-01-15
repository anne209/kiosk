<!-- ich weiss nicht was passiert wenn man genau die selben Daten eingibt von einem bestehenden Produkt -->
<!-- es gibt noch einen fehler mit der Standort_ID wird nur als object angezeigt und als object weitergegeben obwohl .value  benutzt wird -->

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

const Name = ref('');
const Preis = ref(''); 
const Standort_ID = ref('');
const successAlert= ref(false);
const errorAlert = ref(false); 
const successMessage= ref(''); 
const errorMessage= ref('');


const { data: location, pending } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  headers: {
        'Content-Type': 'application/json',
      },
  body: JSON.stringify({
    query: "query { swps_Standort { Name Standort_ID } }"  
  })
});


const addProduct = async () => {
  try {
    // Produktnamen überprüfen
    if (!/^[a-zA-Z]+$/.test(Name.value)) {
    throw new Error('Produktname erforderlich');
    }
    // Preis überprüfen 
    if (!Preis.value) {
    throw new Error('Preis erforderlich');
    }
    // Produkt_ID generieren 
    const Produkt_ID =createGuid();
    
    // Log the values before sending the request
    console.log('Sending request with values:', {
      Name: Name.value,
      Preis: Preis.value,
      Produkt_ID: Produkt_ID,
      Standort_ID: Standort_ID.value,
      typeof: Standort_ID.value, 
    });

    const res = await useFetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // bei latest update müssen wir noch schauen wie wir das aktuelle datum kriegen, momentan nur 1900 01 01 etc. 
      // Standort muss noch verbessert werden 
      body: JSON.stringify({
        query: `
          mutation MyMutation($Name: String!, $Preis: Int!, $Produkt_ID: uniqueidentifier!, $Standort_ID: uniqueidentifier!, $Latest_update: datetime="") {       
            insert_swps_Produkt(objects: {
              Name: $Name, 
              Preis: $Preis, 
              Produkt_ID: $Produkt_ID,
              Standort_ID: $Standort_ID
              Latest_update: $Latest_update

            }) {
              returning {
                Name
                Preis
                Produkt_ID
                Standort_ID
                Latest_update
              }
            } 
          }`,
          variables: {
          Name: Name.value,
          Preis: parseInt(Preis.value, 10),
          Produkt_ID: Produkt_ID,
          Standort_ID: Standort_ID.value,
        },
      }),
    });      

    // Log the raw response from the server
    console.log('Raw response:', res);

    // Additional logging based on how useFetch works
    if (res && res.data && res.data.value) {
      console.log('Processed response:', res.data.value);
      successMessage.value= 'Produkt erfolgreich hinzugefügt';
      successAlert.value = true; 
      errorAlert.value = false; 
    }

    // Check and log any errors
    if (res.error && res.error.value) {
      console.error('Fetch error:', res.error.value);
    }
  } catch (error) {
    console.error('Error during fetch operation:', error);
    errorMessage.value = 'Fehler beim Produkt hinzufügen ';
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
        color="#FDFFFC">
            <v-img
              cover
              height="250"
              src="https://t4.ftcdn.net/jpg/02/95/80/15/360_F_295801504_UwNp39nnXHvLgborqjf2FpbWJB1yblvv.jpg"
            ></v-img>
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

          <v-text-field
          v-model="Name"
          :rules="[() => !!Name || 'Produktname ist erforderlich']"
          label="Produktname eingeben"
          required
          ></v-text-field> 

            <v-card-subtitle> <!-- hier sollte man den preis ändern koennen-->
              <v-text-field
              v-model="Preis"
              :rules="[() => !!Preis|| 'Preis ist erforderlich',v => /^\d+$/.test(v) || 'Nur Zahlen sind erlaubt.',]"
              label="Preis eingeben"
              required
              > </v-text-field>    
            </v-card-subtitle>
                 <!-- in der Standort items list wird nur object Object angezeigt, also kp warum nicht automatisch die Namen der Städte angezeigt werde-->
          
              <v-autocomplete 
              
              v-model="Standort_ID"
              
              :items="location.data.swps_Standort.map(item => ({ text: item.Name, value: item.Standort_ID }))" 
              
              item-text="Name"
              
              item-value="Standort_ID" 

              label="Standort"
              placeholder="Standort auswählen"
              > </v-autocomplete>  
          
          </v-card-item>
              <v-card-text>
                <v-row align="center" class="mx-0">          
                </v-row>
                  <div class="my-4 text-subtitle-1"> 

                  </div>
              </v-card-text>
          <v-card-actions>
            <v-btn
              class="text-none"
              color="#FF1654"
              variant="flat"
              @click="addProduct"
              >Produkt hinzufügen
            </v-btn>
      
        </v-card-actions>
      </v-card>
    </template>
