<!-- Die Seite "signup" läuft über dieses layout-->
<!-- den ganzen Style kann man noch ändern -->
<template>
  <v-app id="inspire">
    <v-app-bar color="#FDFFFC"> <!-- Ist die weiße Leiste oben -->
      <v-app-bar-title>Willkommen beim Löwenshop24 Kiosk</v-app-bar-title>
          <v-btn @click="goToLoginPage"> <!-- Damit kommt auf die Page "start" -->
            Schon einen Account?
            <v-icon end icon="mdi-account-check"></v-icon>
          </v-btn>
        </v-app-bar>
    <v-main class="wave-background">
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
        }, 
        goToLoginPage(){
          this.$router.push('/start')
        }
      }
  }
  </script>
  
<style scoped>

.wave-background{
background-image:  repeating-radial-gradient(circle at 0 0, transparent 0, #ff6b36 100px), repeating-linear-gradient(rgba(255, 0, 0, 0.7), rgba(0, 0, 0, 0.65));
background-color: #ff6b36; 
} 

</style> <!-- definiert den Hintergrund des Layouts-->