<!-- Login-layout sollten hier durch laufen-->
<!-- eventuell noch ein extra signup/layout bauen-->
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

      <v-app-bar-title>Login Page für Admin und Users</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-dots-vertical">
      </v-btn>
    </v-app-bar>

    <v-main style="background: linear-gradient(90deg, rgba(8,7,5,1) 0%, rgba(77,5,21,1) 11%, rgba(114,4,30,1) 16%, rgba(139,3,36,1) 21%, rgba(214,1,54,1) 29%, rgba(241,0,61,1) 32%, rgba(255,0,64,1) 35%, rgba(255,67,114,1) 58%, rgba(255,255,255,1) 100%);">
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
