<script setup>

const props = defineProps({
  user:Object, 
  correctPIN: String

});   
const successMessage = ref('')
const data= ref({
  enteredPIN:'',
  successMessage:'',
  showPINInput:true
  
});

const PIN=ref (0)


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
  console.log('Entered PIN type:', typeof PIN); // Log entered PIN type for debugging
  console.log('Correct PIN type:', typeof props.correctPIN);
  console.log('Entered PIN:', PIN); // Log entered PIN for debugging
  console.log('Correct PIN:', props.correctPIN);


  
  if  (props.correctPIN === null ) {
        successMessage.value = 'Dieser Nutzer hat keine PIN bzw. (null)'   // Idee: Nutzer die keine PIN haben koennen auch einfach direkt sich anmelden ohne 
        console.log('User does not have a PIN');

      } else if (PIN.value === props.correctPIN) {
        successMessage.value = 'Erfolgreiche PIN Eingabe';
        console.log('Correct PIN entered!');  

      } else {
        successMessage.value = 'Falsche PIN. Bitte nochmal versuchen';
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
        v-model="PIN"
        type="password"
        label="Enter PIN"
        color="blue"
        ></v-text-field>


      <v-btn @click="submitPIN">PIN einsenden</v-btn>
      <div v-if="successMessage"> {{ successMessage }}</div>
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
