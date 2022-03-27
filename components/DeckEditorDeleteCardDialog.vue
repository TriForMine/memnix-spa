<template>
  <v-card>
    <v-card-title class="text-h5">
      Are you sure that you want to delete this card?
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="red darken-1"
        text
        @click="closeDialogConfirmation"
      >
        No
      </v-btn>

      <v-btn color="green darken-1" text @click="deleteCard">
        Yes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DeleteCardDialog",
  methods: {
    closeDialogConfirmation() {
      this.$emit("closeDialogConfirmation")
    },
    deleteCard() {
      this.$emit('deleteCard')
    },
  },
})
</script>

<style scoped>

</style>
