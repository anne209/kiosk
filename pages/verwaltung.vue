<script setup lang="ts">
definePageMeta({           
layout: 'admin'
})
</script>
<template>

 <v-container>
  <v-row>
    <h3 class="ml-3"> Schnellzugriff </h3>
  </v-row>
      <v-row> 
        <v-col cols="12" md="6" >

      <newproduct></newproduct>
      
      <newlocation></newlocation>
      
      </v-col> <v-col cols="12" md="6">
      <newuser></newuser>
     
    </v-col>
  </v-row>

    </v-container>
</template>
