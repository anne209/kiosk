<!-- Login-layout sollten hier durch laufen-->
<!-- eventuell noch ein extra signup/layout bauen-->
<!-- den ganzen Style kann man noch ändern -->
<template>
    <v-app id="inspire">
      <v-app-bar 
      color="#FDFFFC">
        <v-btn @click="goToHomePage">
  
          <v-icon
          start
          icon="mdi-arrow-left"
        ></v-icon>
          Zur Homepage gehen
        </v-btn>
  
        <v-app-bar-title>Willkommen beim Löwenshop24</v-app-bar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon="mdi-dots-vertical">
        </v-btn>
      </v-app-bar>
  
      <v-main class="stripe-background">
       <slot />
      </v-main>
    </v-app>
  </template>
  
  
  <script setup>
  
  import {ref} from 'vue'
  
  const drawer =ref(null)
  
  </script>
  
  
  <script>
    export default {
    data:()=>({drawer:null }), 
      methods:{
        goToHomePage(){
          this.$router.push('/home')
        }
      }
  }
  </script>
  
<style scoped>
.stripe-background {
  background-color: #FFFFFF; 
  background-image:
    linear-gradient(
      156deg,
      rgba(255, 0, 0, 0.7) 20%,
      rgba(255, 165, 0, 0.7) 20%,
      rgba(255, 165, 0, 0.7) 40%,
      transparent 40%,
      transparent 60%,
      rgba(128, 128, 128, 0.7) 60%,
      rgba(128, 128, 128, 0.7) 80%,
      transparent 80%
    ),
    linear-gradient(
      336deg,
      transparent 70%,
      #000000 70%
    );
}

</style>