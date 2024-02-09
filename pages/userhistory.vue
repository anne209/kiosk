<script setup>

import { ref, watch, onMounted } from 'vue';
import { useGlobalState } from '~/composables/useGlobalState';

const { Personen_ID } = useGlobalState();
console.log(`Initial Personen_ID: ${Personen_ID.value}`);

const transaktionen = ref('');
const loading = ref(false);
const selectedSorting = ref('Abrechnungszeitpunkt_ASC'); 
const error = ref('');


const sortingOptions = ref([
  'Abrechnungszeitpunkt_ASC', 
  'Abrechnungszeitpunkt_DESC', 
  'Transaktionszeitpunkt_ASC',
  'Transaktionszeitpunkt_DESC', 
  // weitere Sortierungen hinzufügen 
]); 




//hier werden die Transaktionen nach der Sortiervariable gefetched
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
          query MyQuery($Personen_ID: uniqueidentifier = "", $order_By: [swps_Transaktion_order_by!]) {
            swps_Personen_by_pk(Personen_ID: $Personen_ID) {
              Transaktions (order_by: $order_By){
                Produkt {
                  Name
                  Preis
                  Produkt_ID
                  Standort {
                    Name
                  }
                }
                Abrechnungszeitpunkt
                Transaktionszeitpunkt
                Transaktions_ID
                Anzahl
              }
            }
          }
        `,
        variables: {
          Personen_ID: Personen_ID.value,
          order_By: parseSorting(selectedSorting.value), // Sortiervariable
        },
      }),
    });

    console.log('Fetch request sent ', transaktionen.data);

          const responseData = await response.json();
          console.log('Fetched response recieved:', responseData);

  if (responseData.data && responseData.data.swps_Personen_by_pk) {
  transaktionen.value = responseData.data.swps_Personen_by_pk.Transaktions; 
  console.log('Transaktionen:', transaktionen.value);
      }
  } catch (error){
    console.error('Error fetching data:', error)
  }
  
}; 

function parseSorting(selectedSorting) {
    // Hier wird bei der Auswahl der Filter, das Format passend für die Variable in GraphQL Hasura angepasst 


    if (selectedSorting === 'Abrechnungszeitpunkt_ASC') {
      return [{ Abrechnungszeitpunkt: 'asc' }];
    } else if (selectedSorting === 'Abrechnungszeitpunkt_DESC') {
      return [{ Abrechnungszeitpunkt:  'desc'   }];
    } else if (selectedSorting === 'Transaktionszeitpunkt_ASC') {
      return [{ Transaktionszeitpunkt:  'asc'   }];
    } else if (selectedSorting === 'Transaktionszeitpunkt_DESC') {
      return [{ Transaktionszeitpunkt:  'desc'   }];
    
    } else {
      // Hier können weiter filter benutzt werden 
      return [];
    }
  }

// hier wird 'Personen_ID' überwacht, und fetchData wird ausgeführt
watch(Personen_ID, fetchData); 

// lifecycle hook funktion von vue; fetchData Funktion wird aufgerufen sobald die Komponente geladen ist 
onMounted(fetchData);
</script>

<template>
    <v-container>
      <v-row>
      <h3 class="ml-3">Deine Transaktionen</h3>
    </v-row>
    <v-row>
      <!-- autocomplete für die Sortierung -->
      <v-col cols="6" class="mr-auto">
        <v-autocomplete
        v-model="selectedSorting"
        :items="sortingOptions"
        label="Transaktionen sortieren nach"
        @update:model-value="fetchData"
        prepend-inner-icon="mdi-sort"
        variant="outlined"
      ></v-autocomplete>
      </v-col>
      </v-row>
      
      <v-row>
        <v-list-item v-for="transaktion in transaktionen" :key="transaktion.Transaktions_ID" sm="4">           
          <transaktionuser :transaktion="transaktion"></transaktionuser>
        </v-list-item>
      </v-row>
    </v-container>
</template>
