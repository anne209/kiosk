<template>
  <v-app id="inspire">
    
    <v-app-bar
      class="px-3"
      flat
      density="compact"
      color="yellow"
    >
    <v-btn 
    prepend-icon="mdi-home"
      variant="elevated"
      @click="goToHomePage"
      >Löwenshop24
    </v-btn> <!-- Component bauen??-->
      <v-avatar
        color="blue"
        class="hidden-md-and-up"
        size="32"
      ></v-avatar> <!-- Das ist ein button der nur erscheint wenn die seite auf "mobile" läuft-->

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
        @click="goToUsersPage"
      ></v-avatar>
    </v-app-bar>
    <v-navigation-drawer floating>
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
            @click="goToUsersPage"
            >Dein Profil</v-btn>  <!-- Hier sollte der Button auch ein Component werden-->
  
        </div>
  
        <div class="d-flex px-2 my-2 align-center">
          <v-btn
          prepend-icon="mdi-city"
            color="green"
            variant="flat"
            height="40"
            class="flex-grow-1"
            @click="goToLocationPage"
          >Bayreuth</v-btn> <!-- Hier sollte ein Ort Component reinkommen-->
        </div>
        <div class="d-flex px-2 my-2 align-center">
          <v-btn
          prepend-icon="mdi-cart-outline"
            color="yellow-darken-4"
            variant="flat"
            height="40"
            class="flex-grow-1"
            @click="goToCartPage"
          >Dein Warenkorb</v-btn> <!-- Hier sollte ein Ort Component reinkommen-->
         </div>

  
        <div class="px-2 my-2">
  
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
  const links = [
    'Alles',
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
        'Alles',
        'Bier',
        'Wein',
        'Soft-Drinks',
        'Energy',
        'Wasser',
      ],
    }),
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
    },
  }
</script>