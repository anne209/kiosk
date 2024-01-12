<script setup>

const { data: location, error } = await useFetch(`http://localhost:8080/v1/graphql`, {
  method: "POST",
  body: JSON.stringify({
    query: `
      mutation MyMutation($Name: String!, $Standort_ID: uniqueidentifier = "") {
        insert_swps_Standort(objects: {
          Name: $Name,
          Standort_ID: $Standort_ID
        }) {
          returning {
            Name
            Standort_ID
          }
        }
      }
    `
  }),
});

const Name = ref(null);

const submit = async () => {
  // Validate form
  if (!Name.value) {
    console.error("Name is required");
    return;
  }

  // Perform the mutation
  try {
    // Use the location data for GraphQL mutation
    const response = await location;

    // Check for errors in the GraphQL response
    if (error) {
      console.error(error);
      return;
    }

    // Access the mutation result from the GraphQL response
    const mutationResult = response.data?.insert_swps_Standort?.returning;

    // Check if the necessary properties are available before accessing them
    if (mutationResult && mutationResult.length > 0 && mutationResult[0].Name) {
      // Do something with the mutation result
      console.log("Mutation Result:", mutationResult);

      // Optionally, you can reset the form or perform other actions after a successful mutation
      Name.value = null;
    } else {
      console.error("Mutation result is missing necessary properties");
    }
  } catch (err) {
    console.error(err);
    // Handle unexpected errors
  }
};
</script>

<template>
  <v-form ref="form">
    <v-card
      height="200"
      class="mx-auto"
      title="Neuen Standort einrichten"
    >
      <v-container>
        <v-text-field
          ref="Name"
          :modelValue="Name.value"
          @update:modelValue="value => Name.value = value"
          color="primary"
          label="Neuer Standort"
          placeholder="z.B. Berlin"
          variant="underlined"
          required
        ></v-text-field>
        <v-btn
          color="success"
          @click="submit"
        >Standort einrichten
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-container>
    </v-card>
  </v-form>
</template>
