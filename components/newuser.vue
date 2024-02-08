<!-- diese komponente wird auf der page /verwaltung aufgerufen -->


<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Router definieren 
const router = useRouter();
function goToStartPage() {
router.push('/start');
}
// GUID generieren und als Variable deklarieren
function createGuid() {  
        function _p8(s) {  
          var p = (Math.random().toString(16) + "000000000").substr(2,8);  
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p;  
  }  
  return _p8() + _p8(true) + _p8(true) + _p8();  
}  

var guid = createGuid(); 

console.log(guid);


// Abfrage Regeln für die Input Fields/Values 
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

// Konstanten für das Signup Form
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
const form = ref(null);

const resetForm = () => {
if (form.value) {
  form.value.reset(); 
}
};


// fetchen der Standorte für das  Autocomplete 
const { data: location, pending } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query { swps_Standort { Name Standort_ID }}" },
})


// die addUser Konstante mit der zugehörigen Fetch/Mutation 
const addUser = async() =>{
  try {
    // Anrede üperprüfen
      if (!Anrede.value){
        throw new Error('Anrede erforderlich');
      }
    // Mail üperprüfen
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailPattern.test(Mail.value)){
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
  //es wird mittels mutation der Datenbank eine neue Person hinzugefügt
  const res = await useFetch ('http://localhost:8080/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          mutation MyMutation ($Anrede: String!,$Name: String!, $Vorname: String!, $Mail: String!, $Personen_ID: uniqueidentifier!, $Standort_ID: uniqueidentifier!, $Latest_update: datetime="", $PIN:String!){
            insert_swps_Personen(objects: {
              Aktiv: true, 
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
      // Log für Raw response vom Server
    console.log('Raw response:', res);

// Log für Success Benachrichtigung 
if (res && res.data && res.data.value) {
  console.log('Processed response:', res.data.value);
  successMessage.value= 'Neue Person erfolgreich hinzugefügt';
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
errorMessage.value = 'Fehler bei der Nutzererstellung  ';
errorAlert.value = true; 
successAlert.value = false; 
}
};   


</script>


<template>
<v-card
      class="mx-auto  pa-4 pb-5"
      elevation="9"
      max-width="448"
      rounded="lg"
      title="Account erstellen"
      color="#080705"
    > <!-- alternative einfach color="#080705"-->
    <!-- clevr style siehe unten ist ganz nice  -->
  <v-form ref="form">
      <v-container class="mx-auto pa-2">
        <!-- Error/Success Alerts-->
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

      <!-- Anrede auswählen -->
        <v-autocomplete
          ref="anrede"
          v-model="Anrede"
          :rules="[() => !!Anrede || 'Anrede erforderlich']"
          :items="['Frau', 'Herr']"
          color="primary"
          label="Anrede"
          placeholder="Auswählen..."
          prepend-inner-icon="mdi-human-male-female"
          variant="underlined"
          required
        ></v-autocomplete>

      <!-- Vorname eingeben   -->
      <v-text-field 
          ref="first"
          v-model="Vorname"
          :rules="[() => !!Vorname || 'Vorname ist erforderlich']"
          color="primary"
          label="Vorname"
          placeholder="Max"
          prepend-inner-icon="mdi-account"
          variant="underlined"
          required
        ></v-text-field>

        <!-- Name eingeben   -->
        <v-text-field
          ref="last"
          v-model="Name"
          :rules="[() => !!Name|| 'Nachname ist erforderlich']"
          color="primary"
          label="Nachname"
          placeholder="Mustermann"
          prepend-inner-icon="mdi-account"
          variant="underlined"
          required
        ></v-text-field>
        
        <!-- E-Mail eingeben  -->
        <v-text-field
          ref="email"
          v-model="Mail"
          :rules="[() => !!Mail || 'E-Mail ist erforderlich',rules.email]"
          color="primary"
          label="E-Mail"
          prepend-inner-icon="mdi-email-outline"
          variant="underlined"
          required
        ></v-text-field>

        <!-- Standort auswählen-->
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
          prepend-inner-icon="mdi-city"
          variant="underlined"
          required
        ></v-autocomplete> 

        <!-- PIN auswählen -->
        <v-text-field
          v-model="PIN"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.exactLength, rules.numbersOnly]"
          :type="show1 ? 'text' : 'password'"
          color="primary"
          label="PIN"
          placeholder="PIN eingeben"
          prepend-inner-icon="mdi-lock-outline"
          variant="underlined"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>

        <!-- wiederholte eingabe der PIN -->
        <v-text-field
          v-model="pincheck"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.matchPin]"
          :type="show2 ? 'text':'password'"
          color="primary"
          label="PIN wiederholen"
          placeholder="PIN wiederholen"
          prepend-inner-icon="mdi-lock-outline"
          variant="underlined"
          counter
          @click:append="show2 = !show2"
        ></v-text-field>    

        <!-- AGBs aktzeptieren -->
        <v-checkbox
          v-model="terms"
          color="secondary"
          label="Ich akzeptiere die AGB"
        ></v-checkbox>
      </v-container>

      <v-card-actions>
          <v-row>
          <v-col col="6">
        <v-btn
          block
          variant="flat"
          @click="resetForm"  
          >Zurücksetzen
          <v-icon icon="mdi-reload" end></v-icon> 
        </v-btn> <!-- der weiße Button-->
      </v-col>
    

<!-- @click wir das Userprofil erstellt -->
    
      <v-col cols="6">
        <v-btn
          block
          variant="flat"
          color="success"
          @click="addUser"
          >Registrieren
          <v-icon icon="mdi-account-arrow-right-outline" end></v-icon>
        </v-btn>
      </v-col> <!-- der grüne Button-->
    </v-row>
      
        
      </v-card-actions>

      <v-row justify="center"> 
      <v-col cols="6">
      <v-btn 
          block
          variant="flat" 
          color="blue" 
          @click="goToStartPage"
          >Jetzt anmelden 
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn> <!-- der blaue button -->
      </v-col>
    </v-row>
    </v-form>
  </v-card>

</template>

<!-- möglich Styles die wir für die ganze Karte benutzen bzw. ändern können -->
<style scoped>
.my-card {
background-color: rgba(255, 255, 255, 0.25); 
}
.clevr{
border-radius: 40px;
border: 3px solid #FFF;
background: linear-gradient(120deg, rgba(255, 255, 255, 0.40) 10.2%, rgba(252, 252, 252, 0.10) 87.04%);
box-shadow: 0px 4px 24px -1px rgba(0, 0, 0, 0.20);
backdrop-filter: blur(20px);
}

</style>