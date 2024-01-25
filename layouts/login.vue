<!-- Login-layout sollten hier durch laufen-->
<!-- eventuell noch ein extra signup/layout bauen-->
<template>
  <v-app id="inspire">
    <v-app-bar 
    color="#FDFFFC">
      <v-app-bar-title>Login Page für Admin und Users</v-app-bar-title>
      <v-btn 
      icon="mdi-account-hard-hat"
      @click="openDialog"></v-btn>
      <!-- Dialog mit Passwort input-field-->
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

    <v-main style="background: linear-gradient(90deg, rgba(8,7,5,1) 0%, rgba(77,5,21,1) 11%, rgba(114,4,30,1) 16%, rgba(139,3,36,1) 21%, rgba(214,1,54,1) 29%, rgba(241,0,61,1) 32%, rgba(255,0,64,1) 35%, rgba(255,67,114,1) 58%, rgba(255,255,255,1) 100%);">
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
  }
  closeDialog(); 
};




</script>

<!-- das sollte man vlt noch anders machen siehe router.push-->
<script>
  export default {
  data:()=>({drawer:null }), 
    methods:{
      goToHomePage(){
        this.$router.push('/home');
      }
      }
    }

</script>
