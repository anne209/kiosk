<!-- Layout für alle anderen pages (bestellen, cart, home, produktinventar, userhistory, userprofil)-->

<template>
  <v-app id="inspire"> 
      <!-- Folgendes beschreibt die obere Leiste mit einem Bilder der Nummer z.B.: 701,976,287,468 -->
    <v-app-bar
        flat
        density="compact"
        image="https://picsum.photos/id/517/1920/1080"
        scroll-behavior="fade-image"
        style="display: flex; justify-content: center; align-items: center;"> 

        <v-spacer></v-spacer>

      <v-app-bar-nav-icon 
          color="white" 
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

      <logoutbtn style="position: absolute; right: 0;"></logoutbtn> <!-- Abmelden btn-->
    </v-app-bar>
    
    
    <v-navigation-drawer 
        v-model="drawer"
        color="#080705">
        <div class="d-flex px-2 my-2 align center">

        </div>

        <div class="d-flex px-2 my-2 align-center">
          <v-btn 
          prepend-icon="mdi-home"
            class="flex-grow-1"
            variant="elevated"
            @click="goToHomePage"
            >Löwenshop24</v-btn> <!-- damit kommt man ebenfalls auf die page /home-->

        </div>
        <div class="d-flex px-2 my-2 align-center">
          <v-btn 
          prepend-icon="mdi-cart-outline"          
            class="flex-grow-1"
            color="#1098F7"
            height="40"
            variant="flat"
            @click="goToUserHistoryPage"
            >Deine Käufe</v-btn>  <!-- damit kommt man auf die page /userhistory-->
  
        </div>
  
        <div class="d-flex px-2 my-2 align-center">
          <v-btn
          prepend-icon="mdi-emoticon-cool-outline"
            color="#FF1654"
            variant="flat"
            height="40"
            class="flex-grow-1"
            @click="goToUserProfilePage"
          >Dein Profil</v-btn> <!-- Hier sollte ein Ort Component reinkommen--> <!-- hiermit kommt man auf die page /userprofil-->
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

<script>
  
  
  export default {
    
      data:()=>({drawer:null }), 
    methods:{
      goToUserHistoryPage(){
        this.$router.push('/userhistory');
      },
      goToUserProfilePage(){ 
        this.$router.push('/userprofil')
      }, 
      goToHomePage(){
        this.$router.push('/home')
      }, 

    }
  };
</script>
<!-- die farben: schwarz: #080705, weiss: #FDFFFC, rot: #FF1654, orange: #FF6B35 -->
<style>
.diagonal-stripes-gradient {
background: repeating-linear-gradient(
  45deg,
  rgba(8,7,5,1),
  rgba(8,7,5,1) 20%,
  rgba(255,22,84,1) 20%,
  rgba(255,22,84,1) 21%,
  rgba(253,255,252,1) 21%,
  rgba(253,255,252,1) 40%,
  rgba(255,107,53,1) 40%,
  rgba(255,107,53,1) 41%,
  rgba(8,7,5,1) 41%
);

}
</style>