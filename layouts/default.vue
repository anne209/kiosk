<template>
  <v-app id="inspire">
    <v-footer
        app
        color="#FDFFFC"
        height="44"
      ></v-footer>
  
    <v-app-bar
      class="px-5"
      flat
      density="compact"
      color="#FDFFFC"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <v-btn 
          prepend-icon="mdi-home"
            variant="elevated"
            @click="goToHomePage"
            >Löwenshop24
          </v-btn> <!-- Component bauen??-->
                <v-avatar
                  color="#1098F7"
                  class="hidden-md-and-up"
                  size="32"
                ></v-avatar> <!-- Das ist ein button der nur erscheint wenn die seite auf "mobile" läuft-->

    <v-spacer></v-spacer>

                  <v-avatar
                    class="hidden-sm-and-down"
                    color="#1098F7"
                    size="32"
                    @click="goToUsersPage"
                  ></v-avatar>
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
          prepend-icon="mdi-emoticon-cool-outline"          
            class="flex-grow-1"
            color="#1098F7"
            height="40"
            variant="flat"
            @click="goToUsersPage"
            >Dein Profil</v-btn>  <!-- Hier sollte der Button auch ein Component werden-->
  
        </div>
  
        <div class="d-flex px-2 my-2 align-center">
          <v-btn
          prepend-icon="mdi-city"
            color="#FF1654"
            variant="flat"
            height="40"
            class="flex-grow-1"
            @click="goToLocationPage"
          >Deine Location</v-btn> <!-- Hier sollte ein Ort Component reinkommen-->
        </div>
        <div class="d-flex px-2 my-2 align-center">
          <v-btn
          prepend-icon="mdi-cart-outline"
            color="#FF6B35"
            variant="flat"
            height="40"
            class="flex-grow-1"
            @click="goToCartPage"
          >Dein Warenkorb</v-btn> <!-- Hier sollte ein Ort Component reinkommen-->
         </div>

  
        <div class="px-2 my-2">     <!-- hier ist alles unter "Dein Warenkorb,", Idee koennte der Warenkorb darstellen -->
  
          <v-sheet
            class="mb-2"
            color="surface-variant"
            height="24"
            rounded="pill"
            width="50%"
          ></v-sheet>
  
          <v-sheet
            class="mb-1"
            color="red-lighten-1"
            height="12"
            rounded="pill"
            width="40%"
          ></v-sheet>
  
          <v-sheet
            class="mb-1"
            color="red-lighten-1"
            height="12"
            rounded="pill"
            width="20%"
          ></v-sheet>
  
          <v-sheet
            class="mb-1"
            color="red-lighten-1"
            height="12"
            rounded="pill"
            width="90%"
          ></v-sheet>
  
          <v-sheet
            color="blue-lighten-1"
            height="12"
            rounded="pill"
            width="70%"
          ></v-sheet>
  
          <v-divider class="my-6"></v-divider>
  
          <v-sheet
            class="mb-2"
            color="surface-variant"
            height="24"
            rounded="pill"
            width="30%"
          ></v-sheet>
  
          <v-sheet
            class="mb-1"
            color="red-lighten-1"
            height="12"
            rounded="pill"
            width="65%"
          ></v-sheet>
  
          <v-sheet
            class="mb-1"
            color="red-lighten-1"
            height="12"
            rounded="pill"
            width="70%"
          ></v-sheet>
  
          <v-sheet
            class="mb-1"
            color="red-lighten-1"
            height="12"
            rounded="pill"
            width="40%"
          ></v-sheet>
  
          <v-sheet
            color="red-lighten-1"
            height="12"
            rounded="pill"
            width="100%"
          ></v-sheet>
  
          <v-divider class="my-6"></v-divider>
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
      goToUsersPage(){
        this.$router.push('/users');
      },
      goToLocationPage(){ 
        this.$router.push('/location')
      }, 
      goToHomePage(){
        this.$router.push('/home')
      }, 
      goToCartPage(){
        this.$router.push('/cart')
      }
    }
  };
</script>
<!-- hier habe hauptsächlich die farben geandert,
schwarz: #080705
weiss: #FDFFFC
rot: #FF1654
orange: #FF6B35
-->