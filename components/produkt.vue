<script setup>

const props = defineProps({
  produkt:Object,

});   
</script>

<template>
<v-card color="yellow">
    <div class="d-flex flex-no-wrap justify-space-between">
      
        <v-card-title class="text-h5">
          {{ produkt.Name }}
        </v-card-title>
        <v-card-subtitle> {{produkt.Preis}} </v-card-subtitle>
        <v-if
          :{{produkt.Name}} = Wasser>

        
        <v-avatar class="ma-3" size="125" rounded="0">
        <v-img :src="'https://www.pinkcube.de/media/image/94/70/17/LW500-sd-blauw.jpg'"></v-img>
        </v-avatar>
    </v-if>
    </div>
</v-card>

</template>

<style scoped>
  p{
    font-family: sans
  }
</style>

