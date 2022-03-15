<template>
  <v-card>
    <v-card-title class="text-h5">
      Subscribe to this deck ?
    </v-card-title>
    <v-card-text> You will be able to play it.</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="red darken-1"
        text
        @click="closeDialogConfirmation"
      >
        No
      </v-btn>

      <v-btn color="green darken-1" text @click="subToDeck"> Yes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SubDialog",
  methods: {
    closeDialogConfirmation() {
      this.$emit("closeDialogConfirmation")
    },
    subToDeck() {
      this.$emit('subToDeck')
    },
  },
}
</script>

<style scoped>

</style>
