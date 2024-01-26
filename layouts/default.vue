<template>
  <v-app id="inspire">
    <v-footer
      app
      color="#FDFFFC"
      height="90"
      style="display: flex; justify-content: center; align-items: center;">
      <v-progress-linear :value="progressValue" color="red"></v-progress-linear>
    </v-footer>
  
    <v-app-bar
      flat
      density="compact"
      
      image="https://picsum.photos/1920/1080?random" 
    > 
      <v-app-bar-nav-icon 
      color="white"
      @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <v-btn 
          prepend-icon="mdi-home"
            variant="elevated"
            @click="goToHomePage"
            >Löwenshop24
          </v-btn> <!-- Component bauen??-->
              
    <v-spacer></v-spacer>

                  <logoutbtn></logoutbtn>
    </v-app-bar>
    <v-navigation-drawer 
                    v-model="drawer"
                    color="#080705">
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
          prepend-icon="mdi-home"
            class="flex-grow-1"
            variant="elevated"
            @click="goToHomePage"
            >Löwenshop24
          </v-btn>

        </div>
        <div class="d-flex px-2 my-2 align-center">
          <v-btn 
          prepend-icon="mdi-emoticon-cool-outline"          
            class="flex-grow-1"
            color="#1098F7"
            height="40"
            variant="flat"
            @click="goToUserHistoryPage"
            >Deine Käufe</v-btn>  <!-- Hier sollte der Button auch ein Component werden-->
  
        </div>
  
        <div class="d-flex px-2 my-2 align-center">
          <v-btn
          prepend-icon="mdi-city"
            color="#FF1654"
            variant="flat"
            height="40"
            class="flex-grow-1"
            @click="goToUserProfilePage"
          >Dein Profil</v-btn> <!-- Hier sollte ein Ort Component reinkommen-->
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