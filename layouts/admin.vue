<!-- Wird verwendet bei den pages Nutzerverwaltung, Produktverwaltung, Transaktionen und Verwaltung-->

<template>
    <v-app id="inspire"> 
      <!-- Blaue Leiste am unteren Rand des Bildschirms-->
      <v-footer
          app
          color="blue"
          height="44"
        ></v-footer>  
    <!-- Blaue Leiste am oberen Rand des Bildschirms-->
      <v-app-bar
        flat
        density="compact"
        color="blue"
        style="display: flex; justify-content: center; align-items: center;"> 
      
      <v-spacer></v-spacer>

      <v-app-bar-nav-icon 
      @click="drawer = !drawer"
      style="position: absolute; left: 0;"> 
      </v-app-bar-nav-icon>

        <v-btn 
          color="white"
          variant="elevated"
          @click="goToHomePage"
          width="250">
          <img  :src="LöwenShopLogo" style="height: 35px; width: auto;"/>
        </v-btn>

  
        <v-spacer></v-spacer>
  
       <logoutbtn style="position: absolute; right: 0;"></logoutbtn> <!-- Bezieht sich auf den Component logoutbtn -->

      </v-app-bar>

      <!-- Die linke Navigationsleiste, die sich öffnet -->
      <v-navigation-drawer v-model="drawer">
          <div class="d-flex px-2 my-2 align center">  <!-- Ist die Suchleiste-->
          </div>
          <!-- Man kommt auf die Seite Schnellzugriff -->
          <div class="d-flex px-2 my-2 align-center">
            <v-btn    
            prepend-icon="mdi-database"   
              class="flex-grow-1"
              color="red"
              height="40"
              variant="flat"
              @click="goToVerwaltung"
              >Schnellzugriff</v-btn>  
              
          </div>
          <!-- Man kommt auf die Seite Userverwaltung -->
          <div class="d-flex px-2 my-2 align-center">
            <v-btn 
            prepend-icon="mdi-emoticon-cool-outline"          
              class="flex-grow-1"
              color="blue"
              height="40"
              variant="flat"
              @click="goToUsersAdmin"
              >Userverwaltung</v-btn> 
              
          </div>
            <!-- Man kommt auf die Seite Produktverwaltung-->
          <div class="d-flex px-2 my-2 align-center">
            <v-btn
            prepend-icon="mdi-coffee"
              color="green"
              variant="flat"
              height="40"
              class="flex-grow-1"
              @click="goToProductAdmin"
            >Produktverwaltung</v-btn>
          </div>
            <!-- Man kommt auf die Seite Transaktionen-->
          <div class="d-flex px-2 my-2 align-center">
            <v-btn
            prepend-icon="mdi-cart-outline"
              color="yellow-darken-4"
              variant="flat"
              height="40"
              class="flex-grow-1"
              @click="goToTransactions"
            >Transaktionen</v-btn>
           </div>
  
        </v-navigation-drawer> 
  <v-main>
    <slot/>
  </v-main>
      
      
    </v-app>
  </template>
  
  <script setup>
  
    import {ref} from 'vue'
    const LöwenShopLogo = '/assets/löwenshop24.png';
    const drawer =ref(null)
  
  </script>
  
  <script> //hier werden die buttons definiert, damit man auf die jeweiligen Pages kommt
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
        },
        goToVerwaltung(){
          this.$router.push('/verwaltung')
        }
      }
    };
  </script>