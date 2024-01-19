<template>
    <v-btn @click="logout">Abmelden
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </template>
  
  <script>
  import { globalStore } from '@/global.js';
  export default {
    methods: {
      logout() {
        // Implement your log-off logic here
        // You can call the resetPersonen_ID method from globalStore
        globalStore.resetPersonen_ID();
        // You can also perform other log-off actions (e.g., sign out the user)
        this.$router.push({ path: '/start' });
      },
    },
  };
  </script>