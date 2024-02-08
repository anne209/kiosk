<!-- einfach mehr sortierungen und lieblingsprodukt muss irgendwie gefunden werden -->
<script setup>
  definePageMeta({layout: 'admin'});
  import { ref, onMounted } from 'vue';
  import * as XLSX from 'xlsx';
  
  const error = ref(''); 
  const pending = ref(''); 
  const selectedSorting = ref('Latest_update_DESC'); // Default sorting criteria
  const users = ref('');
  const sortingOptions = ref([
    'Transaktions_aggregate.count_ASC',
    'Transaktions_aggregate.count_DESC',
    'Latest_update_ASC',
    'Latest_update_DESC',
    'Standort_ASC',
    'Standort_DESC', 
    // Hier können weiter Filter hinzugefügt werden 
    // Hier müsste man das noch übersetzen 
  ]);
  
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
                  }
                }
                PersonenExt {
                  Latest_update
                }
              }
            }
          `,
          variables: {
            order_By: parseSorting(selectedSorting.value), // Funktion für das Parsen der Filter Variablen 
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


    if (selectedSorting === 'Transaktions_aggregate.count_ASC') {
      return [{ Transaktions_aggregate: { count: 'asc'  } }];
    } else if (selectedSorting === 'Transaktions_aggregate.count_DESC') {
      return [{ Transaktions_aggregate: { count: 'desc' } }];
    } else if (selectedSorting === 'Latest_update_ASC') {
      return [{ PersonenExt: { Latest_update: 'asc' } }];
    } else if (selectedSorting === 'Latest_update_DESC') {
      return [{ PersonenExt: { Latest_update: 'desc'} }];
    } else if (selectedSorting === 'Standort_ASC') {
      return [{ Standort: { Name: 'asc'} }];
    } else if (selectedSorting === 'Standort_DESC') {
      return [{ Standort: { Name: 'desc'} }];
      
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
    const dataToExport = users.value.swps_Personen;

    if (!Array.isArray(dataToExport) || dataToExport.length === 0) {
        console.error('No data available to export');
        return;
    }

  console.log(users.value)

  const wb = XLSX.utils.book_new(); 

  // Daten für Export vorbereiten 
  
  const ws = XLSX.utils.json_to_sheet(dataToExport.map(tx => ({
    'Personen-ID': tx.Personen_ID,
    'Name': tx.Name,
    'Vorname': tx.Vorname,
    'E-Mail': tx.Mail,
    'Standort': tx.Standort?.Name,
    'Anzahl Transaktionen': tx.Transaktions_aggregate?.aggregate.count,
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

    // Trigger den Daten download
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
    <h3 class="ml-3"> Userverwaltung </h3>
    </v-row>
     <v-row>
      <v-col cols="6" >
      <!-- Hier ist das autocomplete für die filter auswahl-->
      <v-autocomplete
        v-model="selectedSorting"
        :items="sortingOptions"
        label="Nutzer sortieren nach"
        @update:model-value="fetchData"
        prepend-inner-icon="mdi-sort"
        variant="underlined"
      ></v-autocomplete>
       </v-col>
      <v-col cols="6" >
      <v-btn
      @click="excelfunction"
      size="x-large"
      block
      color="success"
      append-icon="mdi-table-arrow-up"
      >Excel Datei exportieren
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
  
