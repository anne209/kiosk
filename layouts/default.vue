<!-- Layout für alle anderen pages (bestellen, cart, home, produktinventar, userhistory, userprofil)-->

<template>
  <v-app id="inspire"> 
      <!-- Folgendes beschreibt die obere Leiste mit einem Bilder der Nummer 701,976,287,468 -->
    <v-app-bar
      flat 
      density="compact"
      
      image="https://picsum.photos/id/468/1920/1080" 
    > 
      <v-app-bar-nav-icon 
      color="white" 
      @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer> <!-- Das weiße Zeichen, um auf die Appbar zu gelangen -->
          <v-btn 
          prepend-icon="mdi-home"
            variant="elevated"
            @click="goToHomePage"
            >Löwenshop24
          </v-btn> <!-- Component bauen??--> <!-- damit kommt man auf die page /home-->
              
    <v-spacer></v-spacer>

                  <logoutbtn></logoutbtn> <!-- bezieht sich auf den component logoutbtn-->
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
            >Löwenshop24
          </v-btn> <!-- damit kommt man ebenfalls auf die page /home-->

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
<!-- hier habe hauptsächlich die farben geandert,
schwarz: #080705
weiss: #FDFFFC
rot: #FF1654
orange: #FF6B35
-->
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