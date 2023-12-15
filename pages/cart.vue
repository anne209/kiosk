<template>
    <v-col>
            <v-sheet
              min-height="50vh"
              rounded="lg"
              color="orange-accent-3"
            >
              <!--  -->
            </v-sheet>
          </v-col>
    <v-btn
    
    @click="goToBestellen">
      Jetzt bestellen
      
    </v-btn>
    
</template>
<!-- brauchen wir vielleicht nicht-->

<script setup>
  
import {ref} from 'vue'

const drawer =ref(null)

</script>


<script>
    export default {
    data:()=>({drawer:null }), 
      methods:{
        goToBestellen(){
          this.$router.push('/bestellen')
        }
      }
  }
</script>