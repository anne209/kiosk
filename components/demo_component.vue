<script setup>
const text = ref("I'm a demo-component")
</script>

<template>
  <div class="center-screen">
    <v-btn prepend-icon="mdi-coffee-to-go"> 
      <template v-slot:prepend>
        <v-icon color="#B10034"></v-icon>
      </template>
      
      {{ text }}
    </v-btn>
  </div>
</template>

<style scoped>
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>