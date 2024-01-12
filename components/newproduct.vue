<script>

function createGuid() {  
         function _p8(s) {  
          var p = (Math.random().toString(16) + "000000000").substr(2,8);  
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p;  
  }  
  return _p8() + _p8(true) + _p8(true) + _p8();  
}  

var guid = createGuid(); 

console.log(guid);




const { data: produkt, error } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: JSON.stringify({
    query: `
      mutation MyMutation($Name: String = "", $Preis: Int = "", $Produkt_ID: uniqueidentifier = "" $Standort_ID: uniqueidentifier = "") {
        insert_swps_Standort(objects: {
          Name: $Name,
          Preis: $Preis,
          Produkt_ID: $Produkt_ID,
          Standort_ID: $Standort_ID
        }) {
          returning {
            Name
            Preis
            Produkt_ID
            Standort_ID
          }
        }
      }
    `
  }),
});

</script>

<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
    hover
    color="#FDFFFC">
        <v-img
          cover
          height="250"
          src="https://t4.ftcdn.net/jpg/02/95/80/15/360_F_295801504_UwNp39nnXHvLgborqjf2FpbWJB1yblvv.jpg"
        ></v-img>
    <v-card-item>     
      <v-text-field
      ref="Name"
      label="Produktname eingeben"
      ></v-text-field> <!-- hier drin muss noch v-model kommen -->

        <v-card-subtitle> <!-- hier sollte man den preis ändern koennen-->
          <v-text-field
          ref="Preis"
          label="Preis eingeben"
          > </v-text-field>    
        </v-card-subtitle>
      </v-card-item>
          <v-card-text>
            <v-row align="center" class="mx-0">          
            </v-row>
              <div class="my-4 text-subtitle-1"> 

              </div>
          </v-card-text>
      <v-card-actions>
        <v-btn
          class="text-none"
          color="#FF1654"
          variant="flat"
          @click="createGuid"
          >Produkt hinzufügen 
        </v-btn>
    </v-card-actions>
  </v-card>
</template>