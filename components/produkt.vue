<script setup>
import LionScratchIcon from "@/components/LionScratchIcon.vue";
import { ref } from 'vue';

// LöwenScratch bearbeiten 
const iconColor = ref('black'); // die Farbe wird hier nicht verändert, ist fest eingstellt in LionScratchIcon.vue
const iconWidth = ref('70'); // Breite
const iconHeight = ref('80'); // Höhe 


// Guid Funktion, Variable deklarieren, Guid log
function createGuid() {  
         function _p8(s) {  
          var p = (Math.random().toString(16) + "000000000").substr(2,8);  
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p;  
  }  
  return _p8() + _p8(true) + _p8(true) + _p8();  
}  

var guid = createGuid(); 
console.log(guid);


// Datum 
const currentDatetime = new Date().toISOString();
    console.log(currentDatetime)

// Props aus Home 
const props = defineProps({
  produkt:Object,
  Personen_ID:String,
});

// diverse Konstanten für Die Produkt Card 
const Anzahl= ref('');
const successAlert= ref(false);
const errorAlert = ref(false); 
const successMessage= ref(''); 
const errorMessage= ref('');
const show = ref(false);

// Loading Const 
const loading = ref(false);
 



  // Transkation const/Funktion             
  const addTransaction = async () => {
    //loading im kaufen btn wird aktiviert
    loading.value = true;
    try {
      // Anzahl überprüfen 
      if (!Anzahl.value|| Anzahl.value <= 0 || Anzahl.value > 10) {
      throw new Error('Anzahl erforderlich oder falsch');
      }
      // Transaktion_ID generieren 
      const Transaktions_ID = createGuid();
      
      
      // Logs
      console.log('Sending request with values:', {
        Anzahl: Anzahl.value,
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
        // es wird mittels mutation in der Datenbank eine neue Transaktion hinzugefügt
        body: JSON.stringify({
          query: `
            mutation MyMutation($Transaktionszeitpunkt: datetime = "", $Transaktions_ID: uniqueidentifier = "", $Produkt_ID: uniqueidentifier = "", $Personen_ID: uniqueidentifier = "", $Anzahl: Int!) {       
              insert_swps_Transaktion(objects: {
                Anzahl: $Anzahl,
                Personen_ID: $Personen_ID, 
                Produkt_ID: $Produkt_ID,
                Transaktions_ID: $Transaktions_ID,
                Transaktionszeitpunkt: $Transaktionszeitpunkt

              }) {
                returning {
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
    } finally {
      // Delay für den loader im kaufen btn 
      setTimeout(() => {
        loading.value = false;
      }, 500); // 500 millisekunden
    }
  };

  </script>

  <template>
    <v-card class="mx-auto my-10 card" elevation="9" max-width="400" hover>
      
      <!-- Alert Benachrichtigungen -->
        <v-alert
          v-if="successAlert"
          type="success"
          closable
          dismissible
          @dismiss="successAlert=false"
        >
          {{ successMessage }}
        </v-alert>
        <v-alert
          v-if="errorAlert"
          type="error"
          closable
          dismissible
          @dismiss="errorAlert=false"
        >
          {{ errorMessage }}
        </v-alert>
        
      
  
  
        <v-card-item class="py-0">
              <v-card-title class="text-h4 d-flex align-center" style="flex: 1;">
                {{ produkt.Name }}
                <div class="ml-auto">
                  <LionScratchIcon :color="iconColor" :width="iconWidth" :height="iconHeight" />
                </div>
              </v-card-title>
              
              <v-card-subtitle>
                {{produkt.Standort.Name}}
              </v-card-subtitle>

        </v-card-item>
              <v-card-text class="py-0">
                  <v-row align="center"  no-gutters>
                    
                    <v-col cols="6" class="text-left text-h6">  
                      <v-icon
                        color="#080705"
                        icon="mdi-food"
                        size="80"
                      ></v-icon> 
                    </v-col>

                    <v-col
                      class="text-h3 text-right"
                      cols="6">
                      {{produkt.Preis}}€
                  </v-col>
                </v-row>
              </v-card-text>
        


            <v-card-actions>
    
                <v-row  justify-space-between>
                  <v-col cols="6">
                    <v-text-field
                      v-model="Anzahl"
                      label="Anzahl"
                      variant="outlined"
                      hint="1,2,3...bis 10 Produkte sind möglich"
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-btn
                      block      
                      class="text-none"
                      :disabled="loading"
                      :loading="loading"
                      variant="flat"
                      size="x-large"
                      elevation="4"
                      @click="addTransaction"
                    >Kaufen</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
    </v-card>
  </template>



  <style scoped>
    p{
      font-family: sans
    }
  
    .card {
      
    border-radius: 18px; 
    box-shadow: 0px 4px 24px -1px rgba(0, 0, 0, 0.20);
    backdrop-filter: blur(20px);
    
    background: rgb(253,255,252);
    background: linear-gradient(70deg, rgba(253,255,252,1) 60%, rgba(253,253,249,1) 67%, rgba(253,206,187,1) 77%, rgba(254,177,148,1) 82%, rgba(254,148,108,1) 87%, rgba(255,107,53,1) 92%, rgba(255,50,74,1) 97%, rgba(255,22,84,1) 100%);
    
    /* Schriftart und Farbe werden definiert */
    color: #333; /* Schriftfarbe */
    font-family: 'Arial', sans-serif; /* Schriftart */
  }

  </style>


