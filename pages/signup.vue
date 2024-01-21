<script>
  definePageMeta({layout:'funny'});
</script>
<template>
    
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="6" class="promo-section">
        <div>
          <h1>Der Löwenshop24 Kiosk 🐆 🏪</h1>
          <p>Immer wo du bist</p>
        </div>
      </v-col>
  
      <v-col cols="12" md="6">
       
        <newuser></newuser>
      </v-col>
    </v-row>

  </template>
  

  
  <style scoped>
  .promo-section {
    color: white;
    text-align: left;
    padding-left: 50px;
  }
  
  .promo-section h1 {
    font-size: 2.5em;
    margin-bottom: 0.5em;
  }
  
  .promo-section p {
    font-size: 1.2em;
  }
  
  @media (max-width: 960px) {
    .promo-section {
      text-align: center;
      padding-left: 0;
    }
  }
  </style>