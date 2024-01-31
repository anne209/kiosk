<script setup>
import {ref} from 'vue'; 

const props = defineProps({
    user:Object, 
}); 






</script>


<template>
    <v-card theme="dark">
     <div class="d-flex flex-no-wrap justify-space-between">
        
         <v-card-title class="text-h5">
           {{ user.Vorname }} {{ user.Name }} 
         </v-card-title>

         <v-card-subtitle>{{ user.Mail }}</v-card-subtitle>

       <v-avatar class="ma-3" size="125" rounded="0">
         <v-img :src="'https://robohash.org/' + user.Name + '.png'"></v-img>
       </v-avatar>
     </div>
   </v-card>
</template>