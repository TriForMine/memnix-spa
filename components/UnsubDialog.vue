<template>
  <v-card>
    <v-card-title class="text-h5">
      Unsubscribe to this deck ?
    </v-card-title>
    <v-card-text> Your progression won't be deleted.</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="red darken-1"
        text
        @click="closeDialogConfirmation"
      >
        No
      </v-btn>

      <v-btn color="green darken-1" text @click="unsubToDeck">
        Yes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "UnsubDialog",
  data() {
    return {
    }
  },
  methods: {
    closeDialogConfirmation() {
      this.$emit("closeDialogConfirmation")
    },
    unsubToDeck() {
      this.$emit('unsubToDeck')
    },
  },
}
</script>

<style scoped>

</style>
