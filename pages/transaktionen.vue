<script setup>

definePageMeta({layout: 'admin'}); 
import {ref, onMounted } from 'vue'; 
import * as XLSX from 'xlsx';


const error = ref('');
const pending = ref('');
const selectedSorting = ref('Abrechnungszeitpunkt_ASC'); 
const transaktionen = ref('');

//hier müssen noch weiter sortierungen rein
const sortingOptions = ref([
  'Abrechnungszeitpunkt_ASC', 
  'Abrechnungszeitpunkt_DESC', 
  'Transaktionszeitpunkt_ASC', 
  'Transaktionszeitpunkt_DESC', 
  'Name_ASC', 
  'Name_DESC', 

]); 


const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const response = await fetch(`http://localhost:8080/v1/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query MyQuery($order_By: [swps_Transaktion_order_by!]) {
              swps_Transaktion(order_by: $order_By){
                Abrechnungszeitpunkt
                Anzahl
                Transaktionszeitpunkt
                Transaktions_ID
                Personen { 
                  Name 
                  Personen_ID 
                }
                Produkt { 
                  Name 
                  Produkt_ID 
                  Preis 
                  Standort {
                    Name
                  }
                }
              }
            }
      `,
      variables:{
          order_By: parseSorting(selectedSorting.value), // Funktion für das Parsen der Filter Variablen 
      },
  }),
}); 

    console.log('Fetch request sent ', transaktionen.data);

          const responseData = await response.json();
          console.log('Fetched response recieved:', responseData);

          if (responseData.data) {
        transaktionen.value = responseData.data; 
        console.log('Produkte:', transaktionen.value); 
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


    if (selectedSorting === 'Abrechnungszeitpunkt_ASC') {
      return [{ Abrechnungszeitpunkt: 'asc'  }];
    } else if (selectedSorting === 'Abrechnungszeitpunkt_DESC') {
      return [{ Abrechnungszeitpunkt:  'desc'   }];
    } else if (selectedSorting === 'Transaktionszeitpunkt_ASC') {
      return [{ Transaktionszeitpunkt:  'asc'   }];
    } else if (selectedSorting === 'Transaktionszeitpunkt_DESC') {
      return [{ Transaktionszeitpunkt:  'desc'   }];
    } else if (selectedSorting === 'Name_ASC') {
      return [{ Personen:  {Name: 'asc'}   }];
    } else if (selectedSorting === 'Name_DESC') {
      return [{ Personen:  {Name: 'desc'}   }];
      
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
    const dataToExport = transaktionen.value.swps_Transaktion;

    if (!Array.isArray(dataToExport) || dataToExport.length === 0) {
        console.error('No data available to export');
        return;
    }

  console.log(transaktionen.value)

  const wb = XLSX.utils.book_new(); 

  // Daten für Export vorbereiten 
  const ws = XLSX.utils.json_to_sheet(dataToExport.map(tx => ({
    'Transaktions-ID': tx.Transaktions_ID,
    'Abrechnungszeitpunkt': tx.Abrechnungszeitpunkt,
    'Transaktionszeitpunkt': tx.Transaktionszeitpunkt,
    'Anzahl': tx.Anzahl,
    'Personen Name': tx.Personen?.Name,
    'Personen ID': tx.Personen?.Personen_ID,
    'Produkt Name': tx.Produkt?.Name,
    'Preis': tx.Produkt?.Preis, 
    'Standort': tx.Produkt?.Standort?.Name,
  })));

  XLSX.utils.book_append_sheet(wb, ws, 'Transaktionen');

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
    link.download = 'Transaktionen.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


</script>

<!-- die transaktion sollten vielleicht irgendwie richtig sortiert werden -->
<template>
  <v-container>
    <v-row>
      <h3 class="ml-3"> Transaktionen</h3>
    </v-row>
    <v-row>
      <v-col cols="6" class="mr-auto">
        <v-autocomplete
        v-model="selectedSorting"
        :items="sortingOptions"
        label="Transaktionen sortieren nach"
        @update:model-value="fetchData"
        prepend-inner-icon="mdi-sort"
        variant="outlined"
      ></v-autocomplete>
      <v-btn
          @click="excelfunction"
          block
          color="success"
          append-icon="mdi-table-arrow-up"
        >Daten als Excel Datei exportieren</v-btn>
      </v-col>
    </v-row>    
  </v-container>

    <v-list>
    <v-list-item v-for="transaktion in transaktionen.swps_Transaktion" :key="transaktion.Transaktions_ID" sm="4"> 
      <transaktionadmin :transaktion="transaktion" @transaction-updated="fetchData"> </transaktionadmin>

    </v-list-item>
  </v-list>  
</template>