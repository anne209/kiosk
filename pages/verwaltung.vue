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
  <v-row> <!-- zweimal row und col, damit newproduct und newlocation links untereinander stehen und newuser rechts alleine steht -->
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <newproduct></newproduct>
          </v-col>
          <v-col cols="12">
            <newlocation></newlocation>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <newuser></newuser>
      </v-col>
    </v-row>

    </v-container>
</template>
