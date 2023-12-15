<script setup lang="ts">
definePageMeta({           // hier definieren wir das login layout ansonsten wird immer default benutzt
layout: 'admin'
})
</script>
<template>
 <v-container>
      <v-row>
        <v-col
          v-for="n in 4"
          :key="n"
          cols="4"
        >
          <v-card height="200"> Hier kommt alles für den admin rein</v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

//userverwaltung, produktverwaltung, transaktionsübersicht, daten zu excel exportieren
