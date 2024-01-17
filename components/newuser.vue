
<script setup>
// GUID generieren   
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
// Abfrage Regeln für die Values
const rules = {
required: value => !!value || 'Erforderlich.',
exactLength: v => v.length === 4 || 'Genau 4 Zahlen',
numbersOnly: v => /^\d+$/.test(v) || 'Nur Zahlen sind erlaubt.',
lettersOnly: value => /^[A-Za-z]+$/.test(value) || 'Nur Buchstaben sind erlaubt.',
matchPin: value => pincheck.value === PIN.value || 'Pin stimmt nicht überein',
email: value => {
 const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 return pattern.test(value) || 'Ungültige E-Mail.';
},
};
const currentDatetime = new Date().toISOString();
 console.log(currentDatetime)
const Anrede = ref('')
const Vorname = ref('')
const Name = ref('')
const Mail = ref('')
const PIN =ref('')
const pincheck=ref('')
const Standort_ID= ref ('')
const terms= ref(false)
const show1= ref(true)
const show2=ref (true)
const successAlert= ref(false);
const errorAlert = ref(false); 
const successMessage= ref(''); 
const errorMessage= ref('');




const { data: location, pending } = await useFetch(`http://localhost:8080/v1/graphql`, {
 method: "POST",
 body: { query: "query { swps_Standort { Name Standort_ID }}" },
})


const addUser = async() =>{
 try {
   // Anrede üperprüfen
     if (!Anrede.value){
       throw new Error('Anrede erforderlich');
     }
   // Mail üperprüfen
   if(!rules.email(Mail)){
       throw new Error('Ungültige E-Mail');
     }
   // Name und Vorname üperprüfen
   if(!rules.lettersOnly(Name.value) || !rules.lettersOnly(Vorname.value) || !Name.value || !Vorname.value){
     throw new Error('Ungültiger Name/Vorname');
   } 
   // Pin üperprüfen 
   if (!rules.exactLength(PIN.value) || !rules.numbersOnly(PIN.value) || !rules.matchPin(PIN.value)) {
     throw new Error('Ungültige PIN');
   }
   // Personen_ID generieren 
   const Personen_ID=createGuid();
   // Console.logs
   console.log('Sending request with values:', {
     Anrede: Anrede.value,
         Mail: Mail.value, 
         Name: Name.value,
         Personen_ID: Personen_ID,
         PIN: PIN.value, 
         Vorname:Vorname.value, 
         Latest_update:currentDatetime,
         Standort_ID: Standort_ID.value,
   
 });




const res = await useFetch ('http://localhost:8080/v1/graphql', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     // hier alles reinpacken für den User etc einfach hasura dings aufmachen  
     // der User ist noch nicht aktiv wenn er ein Profil erstellt, muss sich erst anmelden dann soll er aktiv werden
     body: JSON.stringify({
       query: `
       mutation MyMutation ($Anrede: String!,$Name: String!, $Vorname: String!, $Mail: String!, $Personen_ID: uniqueidentifier! $Standort_ID: uniqueidentifier! $Latest_update: datetime="", $PIN:String!){
         insert_swps_Personen(objects: {
           Aktiv: false, 
           Anrede: $Anrede, 
           Mail: $Mail, 
           Name: $Name, 
           Personen_ID: $Personen_ID, 
           Standort_ID: $Standort_ID, 
           Vorname: $Vorname, 
           }) {
         returning {
           Aktiv
           Anrede
           Mail
           Name
           Personen_ID
           Standort_ID
           Vorname
     }
   }
   insert_swps_PersonenExt(objects: {  
     Latest_update: $Latest_update, 
     PIN: $PIN, 
     Personen_ID: $Personen_ID
   }) {
     returning {
       Latest_update
       PIN
       Personen_ID
     }
   }
 }`,
         variables: {
         Anrede: Anrede.value,
         Mail: Mail.value, 
         Name: Name.value,
         Personen_ID: Personen_ID,
         PIN: PIN.value, 
         Vorname:Vorname.value, 
         Latest_update:currentDatetime,
         Standort_ID: Standort_ID.value,
       },
     }),
   });   
   // Log the raw response from the server
 console.log('Raw response:', res);

// Additional logging based on how useFetch works
if (res && res.data && res.data.value) {
console.log('Processed response:', res.data.value);
successMessage.value= 'Neue Person erfolgreich hinzugefügt';
successAlert.value = true; 
errorAlert.value = false; 
}

// Check and log any errors
if (res.error && res.error.value) {
console.error('Fetch error:', res.error.value);
}
} catch (error) {
console.error('Error during fetch operation:', error);
errorMessage.value = 'Fehler bei Nutzererstellung  ';
errorAlert.value = true; 
successAlert.value = false; 
}
};   




</script>


<template>
 <v-form ref="form">
     <v-card
     class="mx-auto"
     max-width="344"
     title="Nutzer Registrierung"
   >
     <v-container>
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
       <v-autocomplete
         ref="anrede"
         v-model="Anrede"
         :rules="[() => !!Anrede || 'Anrede erforderlich']"
         :items="['Frau', 'Herr']"
         color="primary"
         label="Anrede"
         placeholder="Auswählen..."
         variant="underlined"
         required
       ></v-autocomplete>
     <v-text-field 
         ref="first"
         v-model="Vorname"
         :rules="[() => !!Vorname || 'Vorname ist erforderlich']"
         color="primary"
         label="Vorname"
         placeholder="Max"
         variant="underlined"
         required
       ></v-text-field>

       <v-text-field
         ref="last"
         v-model="Name"
         :rules="[() => !!Name|| 'Nachname ist erforderlich']"
         color="primary"
         label="Nachname"
         placeholder="Mustermann"
         variant="underlined"
         required
       ></v-text-field>
       
       
       <v-text-field
         ref="email"
         v-model="Mail"
         :rules="[() => !!Mail || 'E-Mail ist erforderlich',rules.email]"
         color="primary"
         label="E-Mail"
         variant="underlined"
         required
       ></v-text-field>

       <v-autocomplete
         ref="standort"
         v-model="Standort_ID"
         :rules="[() => !!Standort_ID || 'Standort ist erforderlich']"
         :items="location.data.swps_Standort.map(item => ({ Standort_ID: item.Standort_ID, text: item.Name }))" 
         item-text="text"
         item-value="Standort_ID"
         item-title="text" 
         color="primary"
         label="Standort"
         variant="underlined"
         required
       ></v-autocomplete> 

       <v-text-field
         
         v-model="PIN"
         :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
         :rules="[rules.required, rules.exactLength, rules.numbersOnly]"
         :type="show1 ? 'text' : 'password'"
         color="primary"
         label="PIN"
         placeholder="PIN eingeben"
         variant="underlined"
         counter
         @click:append="show1 = !show1"
       ></v-text-field>
       <v-text-field
         
         v-model="pincheck"
         :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
         :rules="[rules.matchPin]"
         :type="show2 ? 'text':'password'"
         color="primary"
         label="Pin wiederholen"
         placeholder="PIN wiederholen"
         variant="underlined"
         counter
         @click:append="show2 = !show2"
       ></v-text-field>    

       <v-checkbox
         v-model="terms"
         color="secondary"
         label="Ich akzeptiere die AGB dieser Seite"
       ></v-checkbox>
     </v-container>

     <v-divider></v-divider>

     <v-card-actions>
       <v-spacer></v-spacer>

       <v-btn 
       color="success"
       @click="addUser"
       >Registrierung abschließen 
         <v-icon icon="mdi-chevron-right" end></v-icon>
       </v-btn>
     </v-card-actions>
   </v-card>
 </v-form>
 </template>
