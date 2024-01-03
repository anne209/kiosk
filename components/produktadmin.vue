<script setup>
const props = defineProps({
  produkt:Object,
  
  });
</script>

<template>
    <v-card
      class="mx-auto my-12"
      max-width="374"
      hover
      color="#FF6B35">
      <v-img
      cover
      height="250"
      src="https://t4.ftcdn.net/jpg/06/19/84/57/360_F_619845728_lgbeIzVzi03mSv2SWgziC6Kk2D67gZv5.jpg"
      ></v-img>
    <v-card-item>     
            <v-card-title class="text-h5">
                 {{ produkt.Name }}
            </v-card-title>
            <v-card-subtitle> <!-- hier sollte man den preis ändern koennen-->
                 Preis: {{produkt.Preis}}€    
            </v-card-subtitle>
    </v-card-item>
       <v-card-text>
            <v-row align="center" class="mx-0">     <!-- das rating konnte vlt weg-->
                <v-rating
                    :model-value="4.5"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                    ></v-rating>  
             <div class="text-white ms-4"> 4.5</div>
            </v-row>
       
        <div class="my-4 text-subtitle-1"> 
            Location: {{ produkt.Standort.Name }}
        </div>

        <div> <!-- zeigt of wie viele Transakationen einem Produkt zu geordnet werden aber nicht viele einzelne Produkte bestellt wurde-->
            Anzahl der Bestellungen: {{ produkt.Transaktions_aggregate.aggregate.count}}
        </div>

            Letztes Produktupdate: {{ produkt.Latest_update }}
        <div>
        Produkt_ID: {{ produkt.Produkt_ID }}
        </div>
        </v-card-text>
      <v-card-actions>
        <v-btn
        class="text-none"
        color="#FF1654"
        variant="flat"
        >Produkt bearbeiten
        </v-btn>

      </v-card-actions>
</v-card>
</template>