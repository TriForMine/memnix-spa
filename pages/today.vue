<template>
  <v-row>
    <v-col class="text-center">
      <v-card
        class="overflow-auto mx-auto mt-5 mb-10 rounded-xl"
        dark
        max-width="100%"
        max-height="450"
      >
        <v-img
          src="http://www.charles-de-gaulle.org/wp-content/uploads/2017/06/XVM12427dd8-1432-11e5-8614-df399aeb8dc2.jpg"
          max-height="350"
          class="mb-2"
          dark
        ></v-img>

        <v-card-text class="font-weight-bold text-h4"
          >L'appel du Général De Gaulle ?</v-card-text
        >
      </v-card>
      <v-text-field
        class="rounded-lg"
        label="Date (MM/YYYY)"
        placeholder="your answer"
        filled
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'authentificated',
}
</script>
