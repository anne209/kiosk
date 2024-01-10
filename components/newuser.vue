

<!-- die query mutation anbindung ans backend fehlt -->


<template>
    <v-form>
    <v-card
    class="mx-auto"
    max-width="344"
    title="Nutzer Registrierung"
    ref="form"
  >
    <v-container>
      <v-autocomplete
        ref="anrede"
        v-model="anrede"
        :rules="[() => !!anrede || 'Anrede erforderlich']"
        :items="['Frau', 'Herr']"
        color="primary"
        label="Anrede"
        placeholder="Auswählen..."
        variant="underlined"
        required
      ></v-autocomplete>
    <v-text-field 
        ref="first"
        v-model="first"
        :rules="[() => !!first || 'Vorname ist erforderlich']"
        :error-messages="errorMessages"
        color="primary"
        label="Vorname"
        placeholder="Max"
        variant="underlined"
        required
      ></v-text-field> <!-- die refs first und last sollten vlt Vorname und Nachname sein -->

      <v-text-field
        ref="last"
        v-model="last"
        :rules="[() => !!last || 'Nachname ist erforderlich']"
        color="primary"
        label="Nachname"
        placeholder="Mustermann"
        variant="underlined"
        required
      ></v-text-field>
      
      
      <v-text-field
        ref="Mail"
        v-model="email"
        :rules="[() => !!email || 'E-Mail ist erforderlich']"
        color="primary"
        label="E-Mail"
        variant="underlined"
        required
      ></v-text-field>

      <v-autocomplete
        ref="standort"
        v-model="standort"
        :rules="[() => !!standort || 'Standort ist erforderlich']"
        :items="['Augsburg','Bayreuth','Frankfurt','Hohenheim','Kempten']"
        color="primary"
        label="Standort"
        variant="underlined"
        required
      ></v-autocomplete> <!-- man könnte auch die standort items mit hasura abfragen -->

      <v-text-field
        ref="pin"
        v-model="pin"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.exactLength, rules.onlyNumbers]"
        :type="show1 ? 'text' : 'password'"
        color="primary"
        label="PIN"
        placeholder="PIN eingeben"
        variant="underlined"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field
        ref="pin"
        v-model="pincheck"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.matchPin]"
        :type="show1 ? 'text' : 'password'"
        color="primary"
        label="Pin wiederholen"
        placeholder="PIN wiederholen"
        variant="underlined"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>    <!-- das hier ist die PIN die tatsächlich an die DB abgegeben wird-->

      <v-checkbox
        v-model="terms"
        color="secondary"
        label="Ich akzeptiere die AGB dieser Seite"
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    first: null,
    last: null,
    anrede: null,
    email: null,
    standort: null,
    pin: null,
    pincheck: null,
    terms: false,
    show1: false,
    show2: true,
  }), 
  methods:{
    matchPin(value){
        return value === this.pin || 'Pin stimmt nicht überein.';
    }
  },
    computed:{
    rules() {
      return {
        required: value => !!value || 'Erforderlich.',
        exactLength: v => v.length === 4 || 'Genau 4 Zahlen',
        onlyNumbers: v => /^\d+$/.test(v) || 'Nur Zahlen sind erlaubt.',
        matchPin: value => this.matchPin(value),
        emailMatch: () => `The email and password you entered don't match`,
      };
    },
  },
};
</script>