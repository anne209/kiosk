<template>
    <v-app id="inspire">
      <v-footer
          app
          color="blue"
          height="44"
        ></v-footer>
    
      <v-app-bar
        class="px-5"
        flat
        density="compact"
        color="blue"
      >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn 
      prepend-icon="mdi-home"
        variant="elevated"
        @click="goToHomePage"
        >ZUR homepage gehen 
      </v-btn> <!-- Component bauen??-->
        <v-avatar
          color="blue"
          class="hidden-md-and-up"
          size="32"
        ></v-avatar> <!-- Das ist ein button der nur erscheint wenn die seite auf "mobile" läuft-->
  
        <v-spacer></v-spacer>
  
       <logoutbtn></logoutbtn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer">
          <div class="d-flex px-2 my-2 align center">
            <v-text-field
              class="mb-1"
              density="compact"
              flat
              hide-details
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
            ></v-text-field>
          </div>
          <div class="d-flex px-2 my-2 align-center">
            <v-btn 
            prepend-icon="mdi-emoticon-cool-outline"          
              class="flex-grow-1"
              color="blue"
              height="40"
              variant="flat"
              @click="goToUsersAdmin"
              >Userverwaltung</v-btn>  <!-- Hier sollte der Button auch ein Component werden-->
    
          </div>
    
          <div class="d-flex px-2 my-2 align-center">
            <v-btn
            prepend-icon="mdi-city"
              color="green"
              variant="flat"
              height="40"
              class="flex-grow-1"
              @click="goToProductAdmin"
            >Produktverwaltung</v-btn> <!-- Hier sollte ein Ort Component reinkommen-->
          </div>
          <div class="d-flex px-2 my-2 align-center">
            <v-btn
            prepend-icon="mdi-cart-outline"
              color="yellow-darken-4"
              variant="flat"
              height="40"
              class="flex-grow-1"
              @click="goToTransactions"
            >Transaktionen</v-btn> <!-- Hier sollte ein Ort Component reinkommen-->
           </div>
  
        </v-navigation-drawer>
  <v-main>
    <slot/>
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
        goToUsersAdmin(){
          this.$router.push('/nutzerverwaltung')
        },
        goToProductAdmin(){ 
          this.$router.push('/produktverwaltung')
        }, 
        goToHomePage(){
          this.$router.push('/home')
        }, 
        goToTransactions(){
          this.$router.push('/transaktionen')
        }
      }
    };
  </script>