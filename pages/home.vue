<template>
  <v-app id="inspire">

    <v-main>
      <v-sheet
        class="mx-auto pa-2 pt-6"
        color="grey-lighten-4"
      >
        <v-sheet
          color="grey-lighten-2"
          height="24"
          rounded="pill"
          width="88"
        ></v-sheet>

        <v-slide-group show-arrows>
          <v-slide-group-item
            v-for="n in 5"
            :key="n"
          >
            <v-sheet
              class="ma-3"
              color="green"
              height="200"
              rounded
              width="250"
            > Produkte der Location</v-sheet>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>

      <v-sheet
        class="mx-auto pa-2 pt-6"
        color="blue-lighten-4"
      >
        <v-sheet
          color="grey"
          height="24"
          rounded="pill"
          width="88"
        ></v-sheet>

        <v-slide-group show-arrows>
          <v-slide-group-item
            v-for="n in 15"
            :key="n"
          >
            <v-sheet
              :width="n === 1 ? 300 : 150"
              color="grey-lighten-1"
              class="ma-3"
              height="200"
              rounded
            >Produkte des Monats</v-sheet>
          </v-slide-group-item>
        </v-slide-group>

        <v-container fluid>
          <v-row>
            <v-col
              v-for="n in 24"
              :key="n"
              cols="2"
            >
              <v-sheet
                color="grey-lighten-1"
                height="200"
                rounded
              > Produkte nach Art</v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
export default{
  methods:{
    goToUsersPage(){
      this.$router.push('/users');
    },
  },
};
  //
</script>