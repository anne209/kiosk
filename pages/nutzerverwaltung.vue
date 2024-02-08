
<script setup>
  definePageMeta({layout: 'admin'});
  import { ref, onMounted } from 'vue';
  import * as XLSX from 'xlsx';
  
  const error = ref(''); 
  const pending = ref(''); 
  const selectedSorting = ref('Latest_update_DESC'); //standard Sortierung 
  const users = ref('');
  const sortingOptions = ref([
    'Meiste Transaktionen',
    'Wenigste Transaktionen',
    'Latest_update_ASC',
    'Latest_update_DESC',
    'Standort_ASC',
    'Standort_DESC', 
    'Anzahl gekaufter Produkt_DESC', 
    'Anzahl gekaufter Produkte_ASC', 
    // Hier können weiter Filter hinzugefügt werden 
  ]);
  
  // hier werden die User gefetched anhand der Sortiervariable
  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const response = await fetch(`http://localhost:8080/v1/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query MyQuery($order_By: [swps_Personen_order_by!]) {
              swps_Personen(order_by: $order_By) {
                Aktiv
                Anrede
                Mail
                Name
                Personen_ID
                Standort_ID
                Transaktions(order_by: {Anzahl: desc}, limit: 1) {      
                  Anzahl
                  Produkt {
                    Name
                    Produkt_ID
                  }
                }
                Standort {
                  Name
                }
                Vorname
                Transaktions_aggregate {
                  aggregate {
                    count
                    sum{
                      Anzahl
                    }
                  }
                }
                PersonenExt {
                  Latest_update
                }
              }
            }
          `,
          variables: {
            order_By: parseSorting(selectedSorting.value), // Sortiervariable 
          },
        }),
      });
  
      console.log('Fetch request sent ', users.data);

      const responseData = await response.json();
      console.log('Fetched response recieved:', responseData);
  
      if (responseData.data) {
        users.value = responseData.data;
        console.log('Users data:', users.value);
      } else {
        throw  Error ('No data received from the server');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Hier werden die verschiedenen Filter durchgegangen 
  function parseSorting(selectedSorting) {

  // Hier wird bei der Auswahl der Filter, das Format passend für die Variable in GraphQL Hasura angepasst 

    if (selectedSorting === 'Wenigste Transaktionen') {
      return [{ Transaktions_aggregate: { count: 'asc'  } }];
    } else if (selectedSorting === 'Meiste Transaktionen') {
      return [{ Transaktions_aggregate: { count: 'desc' } }];
    } else if (selectedSorting === 'Latest_update_ASC') {
      return [{ PersonenExt: { Latest_update: 'asc' } }];
    } else if (selectedSorting === 'Latest_update_DESC') {
      return [{ PersonenExt: { Latest_update: 'desc'} }];
    } else if (selectedSorting === 'Standort_ASC') {
      return [{ Standort: { Name: 'asc'} }];
    } else if (selectedSorting === 'Standort_DESC') {
      return [{ Standort: { Name: 'desc'} }];
    } else if (selectedSorting === 'Anzahl gekaufter Produkt_DESC') {
      return [{ Transaktions_aggregate: { sum:{Anzahl: 'desc'}} }];
    } else if (selectedSorting === 'Anzahl gekaufter Produkte_ASC') {
      return [{ Transaktions_aggregate: { sum:{Anzahl: 'asc'}}  }];
      
    } else {
      // Hier können weiter filter gehandlet werden siehe sortingOptions  
      return [];
    }
  }

  onMounted(() => {
    fetchData(); // Hier wird fetchData initiert
  });


// Alles für den Excelexport

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
    const dataToExport = users.value.swps_Personen;

    if (!Array.isArray(dataToExport) || dataToExport.length === 0) {
        console.error('No data available to export');
        return;
    }

  console.log(users.value)

  // Daten für Export vorbereiten 

  const wb = XLSX.utils.book_new(); 
  
  const ws = XLSX.utils.json_to_sheet(dataToExport.map(tx => ({
    'Personen-ID': tx.Personen_ID,
    'Name': tx.Name,
    'Vorname': tx.Vorname,
    'E-Mail': tx.Mail,
    'Standort': tx.Standort?.Name,
    'Anzahl Transaktionen': tx.Transaktions_aggregate?.aggregate.count,
    'Anzahl gekaufter Produkte':tx.Transaktions_aggregate?.aggregate.sum.Anzahl, 
    'Grösste einmalige Bestellung': tx.Transaktions?.[0] && `${tx.Transaktions[0].Anzahl} - ${tx.Transaktions[0].Produkt.Name} (${tx.Transaktions[0].Produkt.Produkt_ID})` || 'N/A',
    'Latest_update': tx.PersonenExt?.Latest_update,
  })));

  XLSX.utils.book_append_sheet(wb, ws, 'User');

  // Excel Workbook erstellen und tabelle einfügen 
  const binaryString = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const data = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        data[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Datendownload triggern
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'User.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  </script>
  
<template>

  <v-container>

    <v-row>
    <h3 class="ml-3">Userverwaltung</h3>
    </v-row>
     <v-row>
      <v-col cols="6">

      <!-- Hier ist das autocomplete für die Sortierauswahl-->
        <v-autocomplete
          v-model="selectedSorting"
          :items="sortingOptions"
          label="Nutzer sortieren nach"
          @update:model-value="fetchData"
          prepend-inner-icon="mdi-sort"
          variant="outlined"
        ></v-autocomplete>
        
       <!-- excel btn-->
        <v-btn
          @click="excelfunction"
          block
          color="success"
          append-icon="mdi-table-arrow-up"
          >Daten als Excel Datei exportieren
      </v-btn>
     
      </v-col>
    </v-row>
  </v-container>
  
      <!-- Hier werden die Nutzer angezeigt -->
      <v-container>
        <v-row>
          <v-col v-for="user in users.swps_Personen" :key="user.Personen_ID" cols="6">
            <useradmin :user="user" :Personen_ID="Personen_ID"></useradmin>
          </v-col>
        </v-row>
      </v-container>
    
  </template>
  
