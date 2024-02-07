<!-- ich weiss nicht was passiert wenn man genau die selben Daten eingibt von einem bestehenden Produkt -->
<!-- dieses component erscheint auf der page /verwaltung -->

<script setup>
function createGuid() {   //damit wird ein uuid generiert
         function _p8(s) {  
          var p = (Math.random().toString(16) + "000000000").substr(2,8);  
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p;  
  }  
  return _p8() + _p8(true) + _p8(true) + _p8();  
}  

var guid = createGuid(); //hier wird die Produkt_ID definiert

console.log(guid); // hier kann man in der Konsole die neu generierte uuid sehen


import { ref } from 'vue';

const currentDatetime = new Date().toISOString();
    console.log(currentDatetime)

const Name = ref('');
const Preis = ref(''); 
const Standort_ID = ref('');
const successAlert= ref(false);
const errorAlert = ref(false); 
const successMessage= ref(''); 
const errorMessage= ref('');


const { data: location, pending } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query { swps_Standort { Name Standort_ID } }"  
  }
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
    
    // Logs
    console.log('Sending request with values:', {
      Name: Name.value,
      Preis: Preis.value,
      Produkt_ID: Produkt_ID,
      Standort_ID: Standort_ID.value,
      typeof: Standort_ID.value, 
    });

    // hier wird die Datenbank aufgerufen
    const res = await useFetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        // neue Produkte werden mittels mutation der Datenbank hinzugefügt
      body: JSON.stringify({
        query: `
          mutation MyMutation($Name: String!, $Preis: Int!, $Produkt_ID: uniqueidentifier!, $Standort_ID: uniqueidentifier!, $Latest_update: datetime="") {       
            insert_swps_Produkt(objects: {
              Name: $Name, 
              Preis: $Preis, 
              Produkt_ID: $Produkt_ID,
              Standort_ID: $Standort_ID,
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
          Latest_update:currentDatetime,
        },
      }),
    });      

    // Log für Raw response vom Server
    console.log('Raw response:', res);

    // Log für Success Benachrichtigung
    if (res && res.data && res.data.value) {
      console.log('Processed response:', res.data.value);
      successMessage.value= 'Produkt erfolgreich hinzugefügt';
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
    errorMessage.value = 'Fehler beim Produkt hinzufügen ';
    errorAlert.value = true; 
    successAlert.value = false; 
}
};
</script>

    <template> <!-- die obere weiße viereckige componente auf der page /verwaltung wird hier definiert-->
      <v-card 
        class="mx-auto" max-width="450"  elevation="9"   hover color="#FDFFFC">

        
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
          <v-card-item class="py-0">

          <v-card-title>
          Neues Produkt hinzufügen
          </v-card-title>
                <v-text-field
                v-model="Name"
                :rules="[() => !!Name || 'Produktname ist erforderlich', (v) => /^[a-zA-Z]+$/.test(v) || 'Produktname darf nur Buchstaben enthalten']"
                label="Produktname eingeben"
                variant="outlined"
                required
                ></v-text-field>  <!-- mit rules wird der Name überprüft-->

            <v-card-subtitle> 
              <v-text-field
              v-model="Preis"
              :rules="[() => !!Preis|| 'Preis ist erforderlich',v => /^\d+$/.test(v) || 'Nur Zahlen sind erlaubt.',]"
              label="Preis eingeben"
              variant="outlined"
              required
              > </v-text-field>  

            </v-card-subtitle>
              <v-autocomplete 
                  v-model="Standort_ID"
                  :rules="[() => !!Standort || 'Standort ist erforderlich']"
                  :items="location.data.swps_Standort.map(item => ({ Standort_ID: item.Standort_ID, text: item.Name }))" 
                  item-text="text"
                  item-value="Standort_ID"
                  item-title="text" 
                  variant="outlined"
                  label="Standort"
                  placeholder="Standort auswählen"
              > </v-autocomplete>  <!-- items bedeutet, dass man nur die angezeigten Orte auswählen kann --> 
          
          </v-card-item>
              <v-card-text>
                <v-row align="center" class="mx-0">          
                </v-row>
                  <div class="my-4 text-subtitle-1"> 

                  </div>
              </v-card-text>
          <v-card-actions>
            <v-btn
              block
              color="success"
              @click="addProduct" 
              variant="flat"
              >Produkt hinzufügen
              <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn> <!-- addProduct bezieht sich auf das const oben vom Code im script-->
            
        </v-card-actions>
        
      </v-card>
    </template>
