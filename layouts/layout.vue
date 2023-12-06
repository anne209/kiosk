<template>
    <v-app id="inspire">
      <v-app-bar
        class="px-3"
        flat
        density="compact"
        color="yellow"
      >
        <v-avatar
          color="red"
          class="hidden-md-and-up"
          size="32"
        ></v-avatar>
  
        <v-spacer></v-spacer>
  
        <v-tabs
          centered
          color="orange"
        >
          <v-tab
            v-for="link in links"
            :key="link"
            :text="link"
          ></v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
  
        <v-avatar
          class="hidden-sm-and-down"
          color="blue"
          size="32"
        ></v-avatar>
      </v-app-bar>
  <v-main>
    <slot/>
  </v-main>
      
      
    </v-app>
  </template>
  
  <script setup>
    const links = [
      'Bier',
      'Wein',
      'Soft-Drinks',
      'Energy',
      'Wasser',
    ]
  </script>
  
  <script>
    export default {
      data: () => ({
        links: [
          'Bier',
          'Wein',
          'Soft-Drinks',
          'Energy',
          'Wasser',
        ],
      }),
    }
  </script>

