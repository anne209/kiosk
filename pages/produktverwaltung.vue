<script setup lang="ts">
  definePageMeta({layout: 'admin'}); 

  const { data: produkte, pending, error} = await useFetch(`http://localhost:8080/v1/graphql`,{
  method:"POST", 
  body: {query: "query { swps_Produkt {Name Preis Latest_update Produkt_ID Transaktions {Anzahl Personen {Name}}  Transaktions_aggregate {aggregate {count}} Standort {Name Standort_ID}}}"}
  })
  const res = await useFetch(`http://localhost:8080/v1/graphql`,{
  method:"POST", 
  body: {query: "query { swps_Standort {Name Standort_ID}}"}
  })
  </script>

  <template>
  <p v-if="pending"> Fetching</p>
      <pre v-else-if="error"> Could not load: {{ error.data }}</pre>
      <div v-else class="product-management-page">

        <newproduct></newproduct>
      <v-container>
        <v-row class="produkt-admin-row">
          <v-col v-for="produkt in produkte.data.swps_Produkt" :key="produkt.Produkt_ID">             
            <produktadmin :produkt="produkt" ></produktadmin> 
          </v-col>
          </v-row>
          
      </v-container>
          
      </div>

      
  </template>
  
  <style scoped>
  .product-management-page {
    display: flex;
  }
  
  .newproduct {
    flex: 12 1 auto; 
  }
  
  .produkt-admin-row {
    flex: 1; 
    justify-content: flex-start; 
  }
  </style>