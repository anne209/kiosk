 
 <!--alert einbauen für erfolgreich PIN eingabe und Fehlermeldung -->

 <script setup>
 import { ref, watch, defineProps } from 'vue';
 import { useRouter } from 'vue-router';
 import { useGlobalState } from '~/composables/useGlobalState'; 
 import LionScratchIcon from "@/components/LionScratchIcon.vue";


 // LöwenScratch bearbeiten 
const iconColor = ref('black'); // die Farbe wird hier nicht verändert, ist fest eingstellt in LionScratchIcon.vue
const iconWidth = ref('70'); // Breite
const iconHeight = ref('80'); // Höhe 

 const { setPersonen_ID } = useGlobalState();
 const { setName } = useGlobalState(); 
 const { setVorname } = useGlobalState(); 
 const router = useRouter();
 const props = defineProps({
   user: Object, 
   correctPIN: String
 });
const successAlert= ref(false);
const errorAlert = ref(false); 
const noPinAlert= ref(false);
const successMessage= ref(''); 
const errorMessage= ref('');
const noPinMessage= ref('');


 const data = ref({
   enteredPIN: '',
   showPINInput: true
 });
 const PIN = ref('');

 watch(successMessage, () => {
   data.showPINInput = false;
   data.SuccessMessage = true;
   setTimeout(() => {
     data.showPINInput = true;
     data.showSuccessMessage = false;
   }, 20000);
 });

 function submitPIN() {
   console.log('Entered submitPIN function');

   if (props.correctPIN === null) {
     noPinMessage.value = 'Dieser Nutzer hat keine PIN';
     noPinAlert.value= true; 
     console.log('User does not have a PIN');
   } else if (PIN.value === props.correctPIN) {
     successMessage.value = 'Erfolgreiche PIN Eingabe';
     successAlert.value = true; 
     console.log('Correct PIN entered!');
     PIN.value = '';
     // Updated die Personen_ID mit der setPersonen_ID Methode aus useGlobalState.js
     setPersonen_ID(props.user.Personen_ID);
     setName(props.user.Name);
     setVorname(props.user.Vorname);
     router.push({ path: '/home' });
   } else {
     errorMessage.value = 'Falsche PIN. Bitte nochmal versuchen';
     errorAlert.value= true; 
     console.log('Incorrect PIN entered.');
     PIN.value = '';
   }
 }
</script>

 <template>
   <v-card class="mx-auto my-10 card" elevation="9" max-width="400"  hover>
    <!-- alerts für die Pin eingabe-->
    
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
      <v-alert
        v-if="noPinAlert"
        type="warning"
        closable
        dismissible
        @dismiss="noPinAlert=false"
      >
        {{ noPinMessage }}
      </v-alert>
      
       
        <v-card-item class="py-0"> 
            <v-card-title class="text-h4 d-flex align center" style="flex: 1;">
              {{ user.Vorname }} {{ user.Name }} 
              <div class="ml-auto">
                    <LionScratchIcon :color="iconColor" :width="iconWidth" :height="iconHeight" />
              </div>
            </v-card-title>

                <v-card-subtitle>
                  {{ user.Mail }}
                </v-card-subtitle>
          </v-card-item>

                    <v-card-text class="py-0">
                            <v-row align="center" no-gutters>
                               <v-col cols="5">
                              <v-avatar class="ma-3" size="60" rounded="20">
                    <v-img :src="'https://robohash.org/' + user.Name + '.png'"></v-img>
                  </v-avatar>
                              </v-col>

                  <v-col
                    class="text-h3 text-right"
                    cols="6">

                        Hallo adaduaw€
                </v-col>
                          </v-row>
      </v-card-text>
        
        <v-card-actions>

          <v-row justify-space-between>
            <v-col cols=6>
                <v-text-field
                v-show="data.showPINInput"
                v-model="PIN"
                type="password"
                label="PIN eingeben"
                color="blue"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-btn 
              @click="submitPIN"
              block
              class="text-none"
              variant="flat"
              size="x-large"
              elevation="4">Absenden</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
     
   </v-card>
 </template>

 <style scoped>
 p {
   font-family: sans
 }
 .card {
    
    border-radius: 18px; 
    box-shadow: 0px 4px 24px -1px rgba(0, 0, 0, 0.20);
    backdrop-filter: blur(20px);
    
    background: rgb(253,255,252);
    background: linear-gradient(70deg, rgba(253,255,252,1) 60%, rgba(253,253,249,1) 67%, rgba(253,206,187,1) 77%, rgba(254,177,148,1) 82%, rgba(254,148,108,1) 87%, rgba(255,107,53,1) 92%, rgba(255,50,74,1) 97%, rgba(255,22,84,1) 100%);
    
    /* Other styles for text, etc. inside the card */
    color: #333; /* For text color, assuming a light background */
    font-family: 'Arial', sans-serif; /* Font style for text */
  }
 </style>
