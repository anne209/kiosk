<template>
    <v-container fluid>
        
            <v-row>
              <v-col
                v-for="n in 24"
                :key="n"
                cols="2"
              >
                <v-sheet
                  color="green"
                  height="200"
                  rounded
                ></v-sheet>
              </v-col>
            </v-row>
          </v-container>Auflistung aller Bayreuther Produkte
</template>