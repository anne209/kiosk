<script setup lang="ts">

// import 
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useGlobalState } from '~/composables/useGlobalState';

// globale Variablen aus useGlobalState
const { Personen_ID, Name, Vorname } = useGlobalState();

// Standort Name als const
const selectedLocationName = computed(() => {
  const locationItem = location.value?.data.swps_Standort.find(item => item.Standort_ID === Standort_ID.value);
  return locationItem ? locationItem.Name : '';
});

// diverse const
const userlocation = ref('');
const Standort_ID = ref('');
const standortprodukte = ref(null);
const loading = ref(false); 
const error = ref(null); 
const weatherData = ref(null); 



// Userlocation nach Personen_ID fetchen
const  fetchUserLocation = async () => {
      if (!Personen_ID.value) {
        error.value = "Personen_ID is not available.";
        console.error(error.value);
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/v1/graphql`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({
            query: `
              query MyQuery($Personen_ID: uniqueidentifier = "") {
                swps_PersonenExt_by_pk(Personen_ID: $Personen_ID) {
                  Personen {
                    Standort {
                      Name
                      Standort_ID
                    }
                  }
                }
              }
            `, 
            variables: {
              Personen_ID: Personen_ID.value,
            },
          }),
        });

         console.log('Fetch request sent')

        const responseData = await response.json();
        console.log('Fetched resposne recieved:', responseData); 

        if (responseData.data) {
          userlocation.value = responseData.data; 
          const userStandort = responseData.data.swps_PersonenExt_by_pk.Personen.Standort;
          Standort_ID.value = userStandort.Standort_ID;
          console.log( userStandort.Standort_ID); 
          // Die Standort_ID wird hier geupdated nach der Standort_ID des Users

          console.log('Userlocation:', userlocation.value)
        }  else {
          throw new Error('No data recieved from the server'); 
        }
        } catch (e) {
          console.error(error.value);
          error.value = e.message;
        }
      }

      onMounted(() => {
        fetchUserLocation();
      }); 




      // Standort fetchen für das Autocomplete
      const { data: location } = await useFetch(`http://localhost:8080/v1/graphql`, {
        method: "POST",
        body: { query: "query { swps_Standort { Name Standort_ID }}" },
      });




// Produkte nach Standort_ID fetchen 
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
                Standort { 
                  Name 
                }
                Standort_ID
              }
            }
          }`, 
        variables: { 
          Standort_ID: Standort_ID.value 
        },
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


// Alle Produkte fetchen braucht man eigentlich nicht 
const { data: produkte, pending } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: { query: "query { swps_Produkt { Name Preis Produkt_ID  Standort { Name } Standort_ID }}" },
    
});


// Hier sind alle Wetterfunktionen und constanten 


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
}; 


const temperatureMessage = computed(() => {
  if (!weatherData.value) {
    return 'Loading weather data...'; // Message while weather data is loading
  }

  const tempC = parseInt(weatherData.value.current_condition[0].temp_C, 10);

  // Adjust the temperature threshold and messages as needed
  if (tempC <= 10) {
    return 'Es ist ziemlich kühl draußen, wie wäre es mit einem warmen Getränk?';
  } else {
    return 'Schön warm draußen, wie wäre es mit einer kleinen Erfrischung?';
  }
});




// ausgewählte Produkte mit der Temperatur später nach oben packen 
const temperatureCategories = {
  cold: ['Kaffee', 'Tee'],
  warm: ['ClubMate', 'Wasser', 'Bier', 'Helles', 'Bayreuther', 'Maiselsweisse','Schanzenbräu'],
  // Hier kann man weitere Produkte in die Kategorien hinzufügen
};

const temperatureBasedProdukte = computed(() => {
    if (!weatherData.value || !standortprodukte.value?.swps_Standort_by_pk?.Produkts?.length) {
        console.log('No weatherData or standortprodukte available');
        return { produkte: [], message: "Keine Produkte verfügbar." };
      }

      const tempC = parseInt(weatherData.value.current_condition[0].temp_C, 10);

      let category;

      // Category wird je nach Temperatur ausgewählt
      if (tempC <= 20) {
        category = 'cold';
      } else {
        category = 'warm';
      }
      const categoryProducts = temperatureCategories[category];

      // Ensure safe access with optional chaining
      const filteredProdukte = standortprodukte.value.swps_Standort_by_pk.Produkts?.filter(produkt => {
        
        const productNameLower = produkt.Name.toLowerCase();

        return categoryProducts.some(name => productNameLower.includes(name.toLowerCase()));
        // Filter Logik
      }) || [];

      console.log('Filtered products based on temperature:', filteredProdukte);

      if (filteredProdukte.length === 0) {
        return { produkte: [], message: "Aktuell keine passenden Produkte für das Wetter." };
      }
      return { produkte: filteredProdukte, message: "" };
    });


    // watched die Standort_ID,ändert sich die Standort_ID werden die fetches neu ausgeführt
    watchEffect(() => {
      fetchData(); 
      fetchWeatherData(); 
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
            <!-- wenn die Location im autocomplete geändert, werden fetchData() und fetchWeatherData() getriggert-->
            <v-autocomplete
              v-model="Standort_ID"
              :items="location.data.swps_Standort.map(item => ({ Standort_ID: item.Standort_ID, Name: item.Name, text: item.Name }))"
              item-text="text"
              item-value="Standort_ID"
              item-title="text"
              @update:model-value="fetchData(); fetchWeatherData();" 
              label="Wählen einen Standort aus" 
              placeholder="Dein Standort"
              prepend-inner-icon="mdi-map-marker-radius"
              variant="outlined"
              
            ></v-autocomplete>
             
          </v-col>
            <div v-if="loading">
              Loading...
            </div>
            <div v-else-if="error">
                Error: {{ error }}
            </div>
        <!-- hier wird der ausgwählte Standort mit der dazugehörigen Temperatur angezeigt -->
            <div v-else>
              <h3>Dein Standort: {{ selectedLocationName }}</h3>
              <div v-if="weatherData">
                <p>Temperatur: {{ weatherData.current_condition[0].temp_C }}°C</p>
                <p>Fühlt sich an wie: {{ weatherData.current_condition[0].FeelsLikeC}}°C</p>
            </div>
          </div>
              </v-row>
      
    <!-- hier werden die "Temperaturprodukte" angezeigt-->
    <v-carousel cycle hide-delimiters>
      <h3> {{temperatureMessage}}</h3>
      <p v-if="temperatureBasedProdukte.message">{{ temperatureBasedProdukte.message }}</p>
      <v-carousel-item 
          v-for="produkt in temperatureBasedProdukte.produkte" :key="produkt.Produkt_ID">
        <produkt :produkt="produkt" :Personen_ID="Personen_ID"></produkt>
      </v-carousel-item>
    </v-carousel>
</v-container>


<!-- hier werden alle Produkte am Standort angezeigt -->
    <v-container> 
      <p v-if="pending">Fetching...</p>
      <h3 v-else-if="!standortprodukte?.swps_Standort_by_pk?.Produkts || standortprodukte.swps_Standort_by_pk.Produkts.length === 0">  
        Momentan keine Produkte verfügbar in {{ selectedLocationName }}
      </h3>
          <div v-else>
          <h3>Alle Produkte in {{selectedLocationName }}: </h3>
          <v-row>
            <v-col v-for="produkt in standortprodukte?.swps_Standort_by_pk?.Produkts" :key="produkt.Produkt_ID" cols="6">               
              <produkt :produkt="produkt" :Personen_ID="Personen_ID"></produkt> 
            </v-col>
          </v-row>
        </div>
        </v-container>
      
    </v-sheet>
    </main>
  
</template>



<!-- style für das Hallo {{ Vorname }} -->
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