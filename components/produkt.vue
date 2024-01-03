<script setup>

const props = defineProps({
  produkt:Object,
  

});
const loading = ref(false)

  watch(loading, val => {
    if (!val) return
    setTimeout(() => (loading.value = false),1500)});   
</script>
<script>
export default {
    data: () => ({
      show: false,
      loading: false
    }),
    watch:{
      loading (val){
        if(!val) return
        setTimeout(()=> (this.loading=false),1500)
      },
    },
  }

</script>

<template>
        <v-card
          
          class="mx-auto my-12"
          max-width="374"
          hover
          color="#FF6B35">
        
          <v-card-item>
          <v-card-title class="text-h5">
            {{ produkt.Name }}
          </v-card-title>
          <v-card-subtitle> 
            Preis: {{produkt.Preis}}€
          </v-card-subtitle>
           </v-card-item>
           <v-card-text>
            hier kommt das bild vom produkt
           </v-card-text>
          <v-card-actions>
            <v-btn
            :disabled="loading"
            :loading="loading"
            class="text-none"
            color="#FF1654"
            variant="flat"
            @click="loading= !loading"> In den Warenkorb </v-btn>

            <v-btn
            class="text-none"
            variant="flat"
            >Jetzt kaufen</v-btn>
            <v-btn
              variant="tonal"
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"

            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>     <!-- hier kommt der QR Code fuer die Augemented reality von den produkten rein-->
          AR QR-code
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
  p{
    font-family: sans
  }
</style>

