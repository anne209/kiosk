<!-- Login-layout, admin, "backend" pages sollten hier durch laufen-->
<template>
    <v-app id="inspire">
      <v-app-bar extended
      color="blue">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-app-bar-title>Login Page für Admin und Users</v-app-bar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon="mdi-dots-vertical">
        </v-btn>
      </v-app-bar>
  
      <v-main>
       <slot />
      </v-main>
    </v-app>
  </template>
