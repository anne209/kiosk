<!-- Login-layout, admin, "backend" pages sollten hier durch laufen-->
<template>
  <v-app id="inspire">
    <v-app-bar extended
    color="blue">
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

    <v-main>
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
