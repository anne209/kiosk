<!-- hier wurde die const fetchData benutzt da es sein kann das die query for dem abfragen der Personen_ID läuft oder so -->


<script setup>
import { ref, watch, onMounted } from 'vue';
import { useGlobalState } from '~/composables/useGlobalState';

const { Personen_ID } = useGlobalState();
console.log(`Initial Personen_ID: ${Personen_ID.value}`);

const transaktionen = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
  if (!Personen_ID.value) {
    console.error('Personen_ID is not available.');
    return;
  }

  loading.value = true;
  try {
    const response = await fetch(`http://localhost:8080/v1/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query MyQuery($Personen_ID: uniqueidentifier = "") {
            swps_Personen_by_pk(Personen_ID: $Personen_ID) {
              Transaktions {
                Produkt {
                  Name
                  Preis
                  Standort {
                    Name
                  }
                }
                Transaktionszeitpunkt
                Transaktions_ID
                Anzahl
              }
            }
          }
        `,
        variables: {
          Personen_ID: Personen_ID.value,
        },
      }),
    });
    const responseData = await response.json(); // hier die Daten aus der query werden hier abgelegt
    transaktionen.value = responseData.data; // die Daten werden jetzt an die const 'user' weitergereicht, ähnlich wie  const{ data: user, pending, error}
  } catch (e) {
    error.value = e.message; // try { wird hier gecatched 
  } finally {
    loading.value = false;
  }
};

// hier wird 'Personen_ID' überwacht, und fetchData wird ausgeführt
watch(Personen_ID, fetchData); 

// lifecycle hook funktion von vue; fetchData Funktion wird aufgerufen sobald die Komponente geladen ist 
onMounted(fetchData);
</script>

<template>
  <div v-if="loading">
    Loading...
  </div>
  <div v-else-if="error">
    Error: {{ error }}
  </div>
  <div v-else>
    <v-container>
      <v-row>
        <v-col v-for="transaktion in transaktionen?.swps_Personen_by_pk" :key="transaktion.Transaktions_ID"> <!-- der  '?' Operator sichert ab ob die Daten nicht null sind während des Fetchvorgangs -->
          <transaktionuser :transaktion="transaktion"></transaktionuser>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <!-- hier kommt user profil zeugs hin -->
</template>
