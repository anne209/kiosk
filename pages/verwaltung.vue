<script setup lang="ts">
definePageMeta({           // hier definieren wir das admin layout ansonsten wird immer default benutzt
layout: 'admin'
})
</script>
<template>
 <v-container>
      <v-row>
    <v-col cols="12" md="6">
      <newproduct></newproduct>
    </v-col>
    <v-col cols="12" md="6">
      <newuser></newuser>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="4">
      <newlocation></newlocation>
    </v-col>
    <v-col cols="12" md="8">
     
    </v-col>
  </v-row>
    </v-container>
</template>
