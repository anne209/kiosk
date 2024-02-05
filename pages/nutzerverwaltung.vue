
<script setup>
  definePageMeta({layout: 'admin'});
  import { ref, onMounted } from 'vue';
  import * as XLSX from 'xlsx';
  
  const selectedSorting = ref('Latest_update_DESC'); // Default sorting criteria
  const users = ref('');
  const sortingOptions = ref([
    'Transaktions_aggregate.count_ASC',
    'Transaktions_aggregate.count_DESC',
    'Latest_update_ASC',
    'Latest_update_DESC',
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
    } else {
      // Hier können weiter filter gehandlet werden 
      return [];
    }
  }

  onMounted(() => {
    fetchData(); // Hier wird fetchData initiert
  });
  </script>
  
<template>

  <v-container>

    <v-row>
    <h3 class="ml-3"> Userverwaltung </h3>
    </v-row>
     <v-row>
      <v-col cols="6" class="mr-auto">
      <!-- Hier ist das autocomplete für die filter auswahl-->
      <v-autocomplete
        v-model="selectedSorting"
        :items="sortingOptions"
        label="Nutzer sortieren nach"
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
  
