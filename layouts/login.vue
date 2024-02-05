<!-- Die Seite "start" läuft über dieses Layout-->
<!-- eventuell noch ein extra signup/layout bauen-->
<template>
  <v-app id="inspire">
    <v-app-bar 
    color="#FDFFFC">
    <v-btn @click="goToSignupPage">
      <v-icon  start icon="mdi-account-plus"></v-icon>
      Account erstellen?
    </v-btn>  <!-- button links oben führt einen auf die Signup page, um einen eigenen Accoutn zu erstellen -->
      <v-app-bar-title class="text-center">Login</v-app-bar-title>
      <v-btn 
      @click="openDialog">
      Bist du der Admin? <!-- der button rechts oben um auf die admin Seite zu gelangen -->
      <v-icon end icon="mdi-account-hard-hat"></v-icon>
      </v-btn>
      
      <!-- Dialog mit Passwort input-field nachdem man auf den button "bist du der admin?" geklickt hat-->
    <v-dialog v-model="dialogOpen" max-width="300">
      <v-card>
        <v-card-title>Admin Passwort eingeben</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="password"
            label="Passwort"
            type="password"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">Abbrechen</v-btn>
          <v-btn @click="submitPassword">Senden</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-app-bar>

    <v-main class="wave-background">
     <slot />
    </v-main>
  </v-app>
</template>


<script setup>
const router = useRouter();
const drawer = ref(null);
const dialogOpen = ref(false);
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const showSuccess = ref(false); 
const showError = ref(false)

const openDialog = () => {
  dialogOpen.value = true;
};

const closeDialog = () => {
  dialogOpen.value = false;
};

const submitPassword = () => {
  // Admin Password wird hier geprüft
  if (password.value === 'swpsAdmin2024!') {
    router.push({ path: '/verwaltung' });
    successMessage.value = 'Erfolgreich angemeldet!';
    showSuccess.value = true;
  } else {
    errorMessage.value = 'Falsches Passwort. Bitte versuchen Sie es erneut.';
    showError.value = true;
  } // wenn das Passwort richtig ist, kommt man auf die Seite /verwaltung
  closeDialog(); 
};




</script>

<!-- das sollte man vlt noch anders machen siehe router.push-->
<script>
  export default {
  data:()=>({drawer:null }), 
    methods:{
      goToHomePage(){
        this.$router.push('/home')
      },
      goToSignupPage(){
        this.$router.push('/signup')
      }
    }
  }

</script>


<style scoped>
.wave-background{
background-image:  repeating-radial-gradient(circle at 0 0, transparent 0, #ff6b36 100px), repeating-linear-gradient(rgba(255, 0, 0, 0.7), rgba(0, 0, 0, 0.65));
background-color: #ff6b36;
}


</style>