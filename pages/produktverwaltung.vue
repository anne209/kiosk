<script setup>
  definePageMeta({layout: 'admin'}); 
  import { ref, onMounted} from 'vue'; 
  import * as XLSX from 'xlsx';


  const error = ref(''); 
  const pending = ref(''); 
  const selectedSorting = ref('Transaktions_aggregate.count_DESC');
  const produkte = ref(''); 
  //hier müssen noch weiter sortierungen rein
  const sortingOptions = ref([
    'Transaktions_aggregate.count_DESC', 
    'Transaktions_aggregate.count_ASC',
    
    
  ]); 

  

const fetchData = async() => {
  try{
    console.log('Fetching data...')
    const response = await fetch (`http://localhost:8080/v1/graphql`, {
      method:'POST', 
      headers:{ 'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        query: `
          query MyQuery($order_By: [swps_Produkt_order_by!]) {
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
        produkte.value = responseData.data; 
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
    } else {
      // Hier können weiter filter gehandlet werden 
      return [];
    }
  }

  onMounted(() => {
    fetchData(); // Hier wird fetchData initiert
  });


// Excelfunction 
const excelfunction = async () => {
    if (error.value) {
        console.error('Error fetching data:', error.value);
        return;
    }

    if (pending.value) {
        console.log('Data is pending...');
        return;
    }

    // dataToExport wird mit den daten aus der query definiert
    const dataToExport = produkte.value.swps_Produkt;

    if (!Array.isArray(dataToExport) || dataToExport.length === 0) {
        console.error('No data available to export');
        return;
    }

    console.log(produkte.value)
    const wb = XLSX.utils.book_new(); 

  // Daten für Export vorbereiten 
  const ws = XLSX.utils.json_to_sheet(dataToExport.map(tx => ({
    'Produkt_ID': tx.Produkt_ID,
    'Produkt Name': tx.Name,
    'Latest_update': tx.Latest_update,
    'Summe der verkauften Waren:': tx.Transaktions_aggregate?.aggregate.sum.Anzahl,
    'Anzahl der Transakationen:': tx.Transaktions_aggregate?.aggregate.count,
    'Standort_ID': tx.Standort?.Standort_ID,
    'Standort':tx.Standort?.Name,
    'Preis': tx.Preis,
  })));

  XLSX.utils.book_append_sheet(wb, ws, 'Produkte');

// Excel Workbook erstellen und tabelle einfügen 
const binaryString = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  const data = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
      data[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Trigger den Daten download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Produkte.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

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
      
      <v-btn
      @click="excelfunction"
      block
      color="success"
      append-icon="mdi-table-arrow-up"
      >Daten als Excel Datei exportieren
      </v-btn>
      </v-col>
      <v-col cols="6" class="ml-auto">
        <newproduct @product-added="fetchData"></newproduct>
      </v-col>
      </v-row>
      
      </v-container>

      <!-- Hier werden die Produkte angezeigt-->
      <v-container>
        <v-row>
          <v-col v-for="produkt in produkte.swps_Produkt" :key="produkt.Produkt_ID" cols="4">             
            <produktadmin :produkt="produkt" @product-deleted="fetchData"
              @product-updated="fetchData"></produktadmin> 
          </v-col>
          </v-row>
          
      </v-container>
          

      
  </template>
