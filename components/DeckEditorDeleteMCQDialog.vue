<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ $t('delete_mcq_confirmation') }}
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="error" text @click="closeDialogConfirmation">
        {{ $t('no') }}
      </v-btn>

      <v-btn color="success" text @click="deleteMcq">
        {{ $t('yes') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DeleteMCQDialog',
  methods: {
    closeDialogConfirmation() {
      this.$emit('closeDialogConfirmation')
    },
    deleteMcq() {
      this.$emit('deleteMCQ')
    },
  },
})
</script>

<style scoped></style>
