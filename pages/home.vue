<script setup lang="ts">

// import 
import { ref, computed } from 'vue';
import { useGlobalState } from '~/composables/useGlobalState';

// globale Variablen aus useGlobalState
const { Personen_ID, Name, Vorname } = useGlobalState();

// Standort Name als const
const selectedLocationName = computed(() => {
  const locationItem = location.value?.data.swps_Standort.find(item => item.Standort_ID === Standort_ID.value);
  return locationItem ? locationItem.Name : '';
});

const Standort_ID = ref('');
const standortprodukte = ref(null);
const loading = ref(false); 
const error = ref(null); 
const weatherData = ref(null); 


// Wetter Daten fetchen mit selectedLocationName 
const fetchWeatherData = async () => { 
  const url = `https://wttr.in/${selectedLocationName.value}?format=j1`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    weatherData.value = data; // Wetter Daten updaten 
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}




// Standort fetch für das Autocomplete
const { data: location } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query { swps_Standort { Name Standort_ID }}" },
});





// Produkte nach Standort_ID  fetchen 
const fetchData = async () => {
  console.log('fetchData called with Standort_ID:', Standort_ID.value);
  if (!Standort_ID.value) {
    console.error('Standort_ID has not been chosen or is not available');
    return;
  }

  loading.value = true;
  console.log('Starting fetch for Standort_ID:', Standort_ID.value);
  try {
    const response = await fetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query MyQuery($Standort_ID: uniqueidentifier = "") {
            swps_Standort_by_pk(Standort_ID: $Standort_ID) {
              Produkts {
                Name
                Preis
                Produkt_ID
                Standort_ID
              }
            }
          }`, 
        variables: { Standort_ID: Standort_ID.value },
      }),
    });

    console.log('Fetch request sent.');

    const responseData = await response.json();
    console.log('Fetch response received:', responseData);

    if (responseData.data) {
      standortprodukte.value = responseData.data;
      console.log('standortprodukte updated:', standortprodukte.value);
    } else {
      throw new Error('No data received from the server');
    }
  } catch (e) {
    console.error('Fetch error:', e.message);
    error.value = e.message;
  } finally {
    loading.value = false;
    console.log('Fetch completed.');
  }
};


// Alle Produkte fetchen 
const { data: produkte, pending } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query { swps_Produkt { Name Preis Produkt_ID Standort_ID }}" },
});

</script>



<template>
  <main>
   
    <v-sheet color="white">     
      <v-container style="width: 100vw;">
        <v-row> <!-- Name des Users wird angezeigt -->
          <h1 class="gradient-text mr-auto" hover >Hallo {{ Vorname }}!</h1>
          </v-row>
          <v-row>
           <v-col cols="6" class="mr-auto">
            <!-- autocomplete Auswahl für die Standorte -->
            <v-autocomplete
              v-model="Standort_ID" 
              :items="location.data.swps_Standort.map(item => ({ Standort_ID: item.Standort_ID, text: item.Name }))"
              item-text="text"
              item-value="Standort_ID"
              item-title="text"
              @update:model-value="fetchData(); fetchWeatherData();" 
              label="Wählen einen Standort aus" 
              placeholder="Dein Standort"
              prepend-inner-icon="mdi-map-marker-radius"
              variant="outlined"
              
            ></v-autocomplete> <!-- wenn die Location im autocomplete geändert, werden fetchData() und fetchWeatherData() getriggert-->
          </v-col>
          <div v-if="loading">
          Loading...
        </div>
        <div v-else-if="error">
          Error: {{ error }}
        </div>
        <!-- hier wird der ausgwählte Standort mit dazugehörigen Temperatur angezeigt -->
        <div v-else>
          <h3>Dein Standort: {{ selectedLocationName }}</h3>
          <div v-if="weatherData">
            <p>Temperatur: {{ weatherData.current_condition[0].temp_C }}°C</p>
            <p>Fühlt sich an wie: {{ weatherData.current_condition[0].FeelsLikeC}}°C</p>
        </div>
      </div>
              </v-row>
            
    <v-carousel cycle hide-delimiters>
      Wie wäre es mit: 
      <v-carousel-item 
          v-for="produkt in standortprodukte?.swps_Standort_by_pk?.Produkts" 
          :key="produkt.Produkt_ID">
        <produkt :produkt="produkt" :Personen_ID="Personen_ID"></produkt>
      </v-carousel-item>
    </v-carousel>
  
</v-container>
  
<!-- hier werden alle Produkte angezeigt -->
  <p v-if="pending">Fetching...</p>
  <div v-else>
    <v-container>
      <v-row>
        <v-col v-for="produkt in produkte.data.swps_Produkt" :key="produkt.Produkt_ID" cols="6">               
          <produkt :produkt="produkt" :Personen_ID="Personen_ID"></produkt> 
        </v-col>
      </v-row>
    </v-container>
  
  </div>
</v-sheet>
</main>
  
</template>



<!-- hier ist der style für den Hallo {{ Vorname }} text-->
<style scoped>

.gradient-text {
  font-size: 3rem;
  background: linear-gradient(to right, #FF6B35, #FF1654); 
  background-clip: text;
  color: transparent; 
}


.gradient-text {
  
  font-family: 'YourFont', sans-serif; 
  font-weight: bold; 
}


</style>