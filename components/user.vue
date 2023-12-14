<script setup>
  const props = defineProps(['user','PIN']          // hier kommt wird die pin als prop übergeben 
    
  ); 
  const data = ref({
    enteredPIN:'', 
    showPINInput: true, 
    successMessage:'',
  }); 
  function submitPIN() {
    console.log('Entered submitPIN function');  
    console.log('Button clicked');
    console.log('Entered PIN:', data.enteredPIN); // Log entered PIN for debugging
    console.log('Correct PIN:', props.correctPIN);
    if  (data.enteredPIN === props.PIN) {
      data.successMessage = 'Erfolgreiche PIN Eingabe';
      
    } else {
      data.successMessage = 'Falsche PIN. Bitte nochmal versuchen';
    }
    
  }
  </script>

  <template>
    <v-card theme="dark">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="text-h5">
            {{ user.Vorname }} {{ user.Name }} 
          </v-card-title>

          <v-card-subtitle>{{ user.Mail }}</v-card-subtitle>
        
        <v-text-field
          v-if="data.showPINInput"
          v-model="data.enteredPIN"
          label= "Enter PIN"
          type="password"
          color="blue"
          ></v-text-field>

        <v-btn @click="submitPIN">PIN einsenden</v-btn>
        <div v-if="data.successMessage"> {{ data.successMessage }}</div>
        </div>

        <v-avatar class="ma-3" size="125" rounded="0">
          <v-img :src="'https://robohash.org/' + user.Name + '.png'"></v-img>
        </v-avatar>
      </div>
    </v-card>
  </template>

  <style scoped>
  p {
    font-family: sans
  }
  </style>
