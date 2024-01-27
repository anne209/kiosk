 
 <!--alert einbauen für erfolgreich PIN eingabe und Fehlermeldung -->

 <script setup>
 import { ref, watch, defineProps } from 'vue';
 import { useRouter } from 'vue-router';
 import { useGlobalState } from '~/composables/useGlobalState'; 

 const { setPersonen_ID } = useGlobalState();
 const { setName } = useGlobalState(); 
 const { setVorname } = useGlobalState(); 
 const router = useRouter();
 const props = defineProps({
   user: Object, 
   correctPIN: String
 });
 const successMessage = ref('');
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
     successMessage.value = 'Dieser Nutzer hat keine PIN bzw. (null)';
     console.log('User does not have a PIN');
   } else if (PIN.value === props.correctPIN) {
     successMessage.value = 'Erfolgreiche PIN Eingabe';
     console.log('Correct PIN entered!');
     PIN.value = '';
     // Updated die Personen_ID mit der setPersonen_ID Methode aus useGlobalState.js
     setPersonen_ID(props.user.Personen_ID);
     setName(props.user.Name);
     setVorname(props.user.Vorname);
     router.push({ path: '/home' });
   } else {
     successMessage.value = 'Falsche PIN. Bitte nochmal versuchen';
     console.log('Incorrect PIN entered.');
     PIN.value = '';
   }
 }
</script>

 <template>
   <v-card theme="dark">
     <div class="d-flex flex-no-wrap justify-space-between">
       <div>
         <v-card-title class="text-h5">
           {{ user.Vorname }} {{ user.Name }} 
         </v-card-title>

         <v-card-subtitle>{{ user.Mail }}</v-card-subtitle>
       
       <v-text-field
         v-show="data.showPINInput"
         v-model="PIN"
         type="password"
         label="Enter PIN"
         color="blue"
         ></v-text-field>


       <v-btn @click="submitPIN">PIN einsenden</v-btn>
       <div v-if="successMessage"> {{ successMessage }}</div>
       </div>

       <v-avatar class="ma-3" size="125" rounded="0">
         <v-img :src="'https://robohash.org/' + user.Name + '.png'"></v-img>
       </v-avatar>
     </div>
   </v-card>
 </template>

 <style scoped>
 p {
   font-family: sans
 }
 </style>
