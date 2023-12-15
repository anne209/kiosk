<script setup>
  const props = defineProps(['user','PIN']          // hier kommt wird die pin als prop übergeben 
    
  ); 
  const successMessage =ref('')
  const data = ref({
    enteredPIN:'', 
    successMessage:'',
    showPINInput: true, 
    
  }); 
  watch(successMessage, () =>{
      data.showPINInput = false; 
      data.SuccessMessage= true; 
      setTimeout(()=> {
        data.showPINInput = true; 
        data.showSuccessMessage = false; 
      }, 20000);
    })
  function submitPIN() {
    console.log('Entered submitPIN function');  
    console.log('Button clicked');
    console.log('Entered PIN type:', typeof data.enteredPIN); // Log entered PIN type for debugging
    console.log('Correct PIN type:', typeof props.correctPIN);
    console.log('Entered PIN:', data.enteredPIN); // Log entered PIN for debugging
    console.log('Correct PIN:', props.correctPIN);

    if  (data.enteredPIN === props.PIN) {
      data.successMessage = 'Erfolgreiche PIN Eingabe';
      console.log('Correct PIN entered!');
        
      
    } else {
      data.successMessage = 'Falsche PIN. Bitte nochmal versuchen';
      console.log('Incorrect PIN entered.');
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
          ></v-text-field> <!-- mit type password, wird die pin unsichtbar vice versa -->

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
