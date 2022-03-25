<template>
  <v-card>
    <v-card-title class="text-h5">
      Are you sure that you want to delete this MCQ?
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

      <v-btn color="green darken-1" text @click="deleteMcq">
        Yes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DeleteMCQDialog",
  data() {
    return {
    }
  },
  methods: {
    closeDialogConfirmation() {
      this.$emit("closeDialogConfirmation")
    },
    deleteMcq() {
      this.$emit('deleteMCQ')
    },
  },
}
</script>

<style scoped>

</style>
