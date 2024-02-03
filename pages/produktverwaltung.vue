<script setup lang="ts">
  definePageMeta({layout: 'admin'}); 
  import { ref, onMounted} from 'vue'; 


  const selectedSorting = ref('Transaktions_aggregate.count_DESC')
  const produkte = ref(''); 
  const sortingOptions = ref([
    'Transaktions_aggregate.count_DESC', 
    'Transaktions_aggregate.count_ASC',
    // Hier können noch weitere Filter hinzugfügt werden 
    // und übersetzen 
  ]); 
  

const fetchData = async() => {
  try{
    console.log('Fetching data...')
    const response = await fetch (`http://localhost:8080/v1/graphql`, {
      method:'POST', 
      headers:{ 'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        query: `
          query MyQuery($order_By: [swps_Produkt_order_by!]){
            swps_Produkt(order_by: $order_By) {
              Name 
              Preis
              Latest_update 
              Produkt_ID
              Transaktions{
                Transaktionszeitpunkt
                Anzahl 
                Personen{
                  Name
                }
              }
              Transaktions_aggregate{
                aggregate{
                  sum {
                    Anzahl
                  }
                  count
                }
              }
              Standort {
                Name 
                Standort_ID
              }
              }
            }
        `,
          variables:{
            order_By: parseSorting(selectedSorting.value),
          },
      }),
  }); 
  console.log('Fetch request sent', produkte.data); 

  const responseData = await response.json(); 
  console.log('Fetched response recieved:', responseData); 

      if (responseData.data) {
        produkte.value =responseData.data; 
        console.log('Produkte:', produkte.value); 
      } else{
        throw Error ('No data recieved from the server'); 
      }
  } catch (error){
    console.error('Error fetching data:', error)
  }
  
}; 

// Hier werden die verschiedenen Filter durchgegangen 
function parseSorting(selectedSorting) {
    // Hier wird bei der Auswahl der Filter, das Format passend für die Variable in GraphQL Hasura angepasst 


    if (selectedSorting === 'Transaktions_aggregate.count_ASC') {
      return [{ Transaktions_aggregate: { count: 'asc'  } }];
    } else if (selectedSorting === 'Transaktions_aggregate.count_DESC') {
      return [{ Transaktions_aggregate: { count: 'desc'  } }];
      // Hier können weiter filter gehandlet werden 
      return [];
    }
  }

  onMounted(() => {
    fetchData(); // Hier wird fetchData initiert
  });









  // braucht man glaub ich nicht 
  const res = await useFetch(`http://localhost:8080/v1/graphql`,{
  method:"POST", 
  body: {query: "query { swps_Standort {Name Standort_ID}}"}
  })
  </script>

  <template>

      <v-container>
        <v-row>
          <h3 class="ml-3"> Produktverwaltung </h3>
        </v-row>
        <v-row>
        <v-col cols="6" class="mr-auto">
          <!-- hier sollte man die Produkte sortieren können -->
        <v-autocomplete
        v-model="selectedSorting"
        :items="sortingOptions"
        label="Produkte sortieren nach"
        @update:model-value="fetchData"
        prepend-inner-icon="mdi-sort"
        variant="outlined"
      ></v-autocomplete>
      </v-col>
      <v-col cols="6" class="ml-auto">
        <newproduct></newproduct>
      </v-col>
      </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col v-for="produkt in produkte.swps_Produkt" :key="produkt.Produkt_ID" cols="4">             
            <produktadmin :produkt="produkt" ></produktadmin> 
          </v-col>
          </v-row>
          
      </v-container>
          
   

      
  </template>
