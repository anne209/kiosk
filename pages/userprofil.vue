
<!-- warum ist das kein component?-->
<!-- um das profil zu aktualisieren müssen aufgrund der rules alle Felder ausgefüllt werden, sollte man vielleicht ändern -->


<script setup>

import { ref, watch, onMounted} from 'vue';
import { useGlobalState } from '~/composables/useGlobalState';

  // Personen_ID aus useGlobalState importieren
  const { Personen_ID } = useGlobalState();
  console.log(`Initial Personen_ID: ${Personen_ID.value}`); 

  const user = ref(null);
  const loading =ref (false); 
  const error = ref(null);

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

  // Konstanten für das Update Form 
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



  // hier werden die Daten der zugehörigen Personen_ID gefetched 
  const fetchData = async () => {
    if (!Personen_ID.value) {
      console.error('Personen_ID is not available.');
      return;
    }
  loading.value =true; 
    try {
      const response = await fetch('http://localhost:8080/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          query: `
            query MyQuery($Personen_ID: uniqueidentifier = "") {       
              swps_Personen_by_pk(Personen_ID: $Personen_ID) {
                Aktiv
                Anrede 
                Mail
                Name
                PersonenExt {
                  PIN
                  Latest_update
                }
                Vorname 
                Standort {
                  Name 
                  Standort_ID
                }
              }
            }`,
            variables: {
              Personen_ID: Personen_ID.value, 
            },
          }),
        });
        const responseData = await response.json();   // hier die Daten aus der query werden hier abgelegt
        user.value = responseData.data; // die Daten werden jetzt an die const 'user' weitergereicht, ähnlich wie  const{ data: user, pending, error}
      } catch (e) {
      error.value = e.message;  // try { wird hier gecatched 
    } finally {
      loading.value = false;   
    }
  };
  
  watch(Personen_ID, fetchData); // hier wird 'Personen_ID' überwacht, und fetchData wird ausgeführt

  onMounted(fetchData); // lifecycle hook funktion von vue; fetchData Funktion wird aufgerufen sobald die Komponente geladen ist 



  // die updateUser funktion mit dem zugehörigen Fetch/Mutation 
  const updateUser = async() => {
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
      const res = await useFetch('http://localhost:8080/v1/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `  
            mutation MyQuery($Anrede: String!, $Vorname: String!, $Standort_ID: uniqueidentifier!, $Name: String!, $Mail: String! , $Personen_ID: uniqueidentifier!, $Latest_update: datetime="", $PIN:String!) {
              update_swps_Personen_by_pk(pk_columns: {Personen_ID: $Personen_ID}, _set: {Anrede: $Anrede, Mail: $Mail, Name: $Name, Standort_ID: $Standort_ID, Vorname: $Vorname, Aktiv: true }) {
                Aktiv
                Anrede
                Mail
                Name
                Vorname
                Personen_ID
                Standort_ID
              }
              update_swps_PersonenExt_by_pk(pk_columns: {Personen_ID: $Personen_ID}, _set: {Latest_update: $Latest_update, PIN: $PIN}) {
              Latest_update
              PIN
              }
            }
          `,
          variables: {
              Anrede: Anrede.value,
              Mail: Mail.value, 
              Name: Name.value,
              Personen_ID: Personen_ID.value,
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
      successMessage.value= 'Person erfolgreich aktualisiert';
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
    errorMessage.value = 'Fehler bei der Nutzereraktualisierung ';
    errorAlert.value = true; 
    successAlert.value = false; 
    }
    };   


</script>



  <template>
    <v-card
      class="mx-auto pa-4 pb-5"
      elevation="9"
      max-width="448"
      rounded="lg"
      title="Nutzerprofil aktualisieren"
      color="#080705"
    >
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

          <!-- Anrede aktualisieren -->
          <v-row>
            <v-col cols="12">
              <p> Deine Anrede: {{ user?.swps_Personen_by_pk.Anrede }}</p>
              <v-autocomplete
                ref="anrede"
                v-model="Anrede"
                :rules="[() => !!Anrede || 'Anrede erforderlich']"
                :items="['Frau', 'Herr']"
                color="primary"
                label="Neue Anrede"
                placeholder="Auswählen..."
                prepend-inner-icon="mdi-human-male-female"
                variant="underlined"
                required
              ></v-autocomplete>
            </v-col>
          </v-row>
          
          <!-- Vorname aktualisieren -->
          <v-row>
            <v-col cols="12">
              <p> Dein Vorname: {{ user?.swps_Personen_by_pk.Vorname }}</p>
              <v-text-field
                ref="first"
                v-model="Vorname"
                :rules="[() => !!Vorname || 'Vorname ist erforderlich']"
                color="primary"
                label="Neuer Vorname"
                placeholder="Max"
                prepend-inner-icon="mdi-account"
                variant="underlined"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Name aktualisieren -->
          <v-row>
            <v-col cols="12">
              <p>Dein Name: {{ user?.swps_Personen_by_pk.Name }}</p>
              <v-text-field
                ref="last"
                v-model="Name"
                :rules="[() => !!Name || 'Nachname ist erforderlich']"
                color="primary"
                label="Neuer Nachname"
                placeholder="Mustermann"
                prepend-inner-icon="mdi-account"
                variant="underlined"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- E-Mail aktualisieren -->
          <v-row>
            <v-col cols="12">
              <p>Deine E-Mail: {{ user?.swps_Personen_by_pk.Mail }}</p>
              <v-text-field
                ref="email"
                v-model="Mail"
                :rules="[() => !!Mail || 'E-Mail ist erforderlich', rules.email]"
                color="primary"
                label="Neue E-Mail"
                prepend-inner-icon="mdi-email-outline"
                variant="underlined"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          
          <!-- Standort aktualisieren -->
          <v-row>
            <v-col cols="12">
              <p>Dein jetziger Standort: {{ user?.swps_Personen_by_pk.Standort.Name  }}</p>
              <v-autocomplete
                ref="standort"
                v-model="Standort_ID"
                :rules="[() => !!Standort_ID || 'Standort ist erforderlich']"
                :items="location.data.swps_Standort.map(item => ({ Standort_ID: item.Standort_ID, text: item.Name }))" 
                item-text="text"
                item-value="Standort_ID"
                item-title="text" 
                color="primary"
                label="Neuer Standort"
                prepend-inner-icon="mdi-city"
                variant="underlined"
                required
              ></v-autocomplete> 
            </v-col>
          </v-row>

        
          <!-- PIN aktualisieren -->
          <v-row>
            <v-col cols="12">
              <p>Deine jetzige PIN: {{ user?.swps_Personen_by_pk.PersonenExt.PIN }}</p>
              <v-text-field
                v-model="PIN"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.exactLength, rules.numbersOnly]"
                :type="show1 ? 'text' : 'password'"
                color="primary"
                label="Neue PIN"
                placeholder="Neue PIN eingeben"
                prepend-inner-icon="mdi-lock-outline"
                variant="underlined"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="pincheck"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.matchPin]"
                :type="show2 ? 'text':'password'"
                color="primary"
                label="Neue PIN wiederholen"
                placeholder="Neue PIN wiederholen"
                prepend-inner-icon="mdi-lock-outline"
                variant="underlined"
                counter
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-checkbox
            v-model="terms"
            color="secondary"
            label="Ich akzeptiere die AGB dieser Seite"
          ></v-checkbox>
        </v-container>

        <v-card-actions>
          <v-btn
                variant="text"
                @click="resetForm"
                class="mr-9"
                >Zurücksetzen
                <v-icon icon="mdi-reload" end></v-icon> 
              </v-btn>

          <v-spacer></v-spacer>

    <!-- @click wir das Userprofil aktualisiert -->
              <v-btn
                variant="text" 
                color="success"
                @click="updateUser"
                >Aktualisieren
                <v-icon icon="mdi-chevron-right" end></v-icon>
              </v-btn>
        </v-card-actions>
        
        <v-row justify="center">
          <v-col cols="12">
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