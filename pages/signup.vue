<script>
  definePageMeta({layout:'signuplayout'});

</script>
<template>
    
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="6" class="promo-section">
       
          <img src="/löwenshoptransparentwhite.png"  style="max-width: 100%; height: auto;">
           <div>
          
          <h2>Unschlagbare Preise.</h2>
          <h2>Rund um die Uhr.</h2>
          <h2>Löwenhaft.</h2>
        </div>
      </v-col>
  
      <v-col cols="12" md="6">
        <newuser></newuser>
      </v-col>
    </v-row>

  </template>
  

  <!-- styling für den Löwenshop -->
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